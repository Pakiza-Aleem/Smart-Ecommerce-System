// server/controllers/aiController.js
// ZENTRO - Gemini AI Features

const { GoogleGenAI } = require("@google/genai");
const Product = require("../models/Product");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ======================================================
// GEMINI HELPER
// ======================================================

async function askAI(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  console.log("🤖 Sending request to Gemini...");

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  console.log("✅ Gemini responded successfully");

  return text;
}

// ======================================================
// 1. SMART SHOPPING
// POST /api/ai/shopping
// ======================================================

async function smartShopping(req, res) {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a shopping query.",
      });
    }

    console.log("🔎 Smart Shopping:", query);

    const prompt = `
You are an electronics shopping assistant.

Customer request:
"${query}"

Extract:

{
  "category": "",
  "maxPrice": null,
  "keywords": []
}

Rules:
- category can be laptop, phone, smartwatch, headphones, monitor,
  keyboard, mouse, tablet, speaker, etc.
- maxPrice must be a number or null.
- keywords should contain important search terms.
- Return ONLY valid JSON.
`;

    const aiResult = await askAI(prompt);

    let filters;

    try {
      const cleaned = aiResult
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      filters = JSON.parse(cleaned);
    } catch {
      console.log("⚠️ AI JSON parsing failed");

      filters = {
        category: "",
        maxPrice: null,
        keywords: query.split(" "),
      };
    }

    // --------------------------------------------------
    // MongoDB search
    // --------------------------------------------------

    const mongoFilter = {};

    if (filters.category) {
      mongoFilter.category = {
        $regex: filters.category,
        $options: "i",
      };
    }

    if (
      filters.maxPrice !== null &&
      filters.maxPrice !== undefined &&
      !isNaN(Number(filters.maxPrice))
    ) {
      mongoFilter.price = {
        $lte: Number(filters.maxPrice),
      };
    }

    if (
      Array.isArray(filters.keywords) &&
      filters.keywords.length > 0
    ) {
      mongoFilter.$or = [];

      filters.keywords.forEach((keyword) => {
        if (!keyword) return;

        const regex = {
          $regex: String(keyword).trim(),
          $options: "i",
        };

        mongoFilter.$or.push(
          { name: regex },
          { tags: regex },
          { description: regex }
        );
      });
    }

    console.log(
      "🔍 MongoDB Filter:",
      JSON.stringify(mongoFilter, null, 2)
    );

    const products = await Product.find(mongoFilter).limit(12);

    console.log(
      `📦 Found ${products.length} products`
    );

    // --------------------------------------------------
    // AI explanation
    // --------------------------------------------------

    let explanation;

    try {
      explanation = await askAI(`
Customer request:
"${query}"

Products found:
${JSON.stringify(products)}

Explain briefly why these products match the customer's request.

Do not invent specifications.
Keep the answer under 80 words.
`);
    } catch (error) {
      console.error(
        "⚠️ AI explanation failed:",
        error.message
      );

      explanation =
        "These products were found based on your search criteria.";
    }

    return res.json({
      success: true,
      query,
      filters,
      products,
      explanation,
      aiAvailable: true,
    });
  } catch (error) {
    console.error("❌ SMART SHOPPING ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Smart shopping AI failed.",
      error: error.message,
      aiAvailable: false,
    });
  }
}

// ======================================================
// 2. AI PRODUCT COMPARISON
// POST /api/ai/compare
// ======================================================

async function compareProducts(req, res) {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least 2 product IDs.",
      });
    }

    console.log("⚖️ Comparing products:", productIds);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length < 2) {
      return res.status(404).json({
        success: false,
        message: "Could not find enough products.",
      });
    }

    console.log(
      `📦 Found ${products.length} products`
    );

    const prompt = `
You are an expert electronics shopping assistant.

Compare these products:

${JSON.stringify(products, null, 2)}

Return ONLY valid JSON:

{
  "bestOverall": "product name",
  "bestBudget": "product name",
  "bestPerformance": "product name",
  "reason": "short explanation"
}

Rules:
- Use ONLY the information in the product data.
- Do not invent specifications.
- bestBudget = best value for money.
- bestPerformance = strongest performance.
- bestOverall = best balanced choice.
- Keep reason under 100 words.
`;

    const aiResult = await askAI(prompt);

    console.log("🤖 Gemini comparison:");
    console.log(aiResult);

    let comparison;

    try {
      const cleaned = aiResult
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      comparison = JSON.parse(cleaned);
    } catch {
      throw new Error(
        "Gemini returned an invalid comparison format."
      );
    }

    return res.json({
      success: true,
      comparison,
      products,
      aiAvailable: true,
    });
  } catch (error) {
    console.error("❌ AI COMPARISON ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI comparison failed.",
      error: error.message,
      aiAvailable: false,
    });
  }
}

// ======================================================
// 3. PRODUCT QUESTION
// POST /api/ai/product-question
// ======================================================

async function productQuestion(req, res) {
  try {
    const { productId, question } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    console.log("❓ Product question:", question);

    const prompt = `
You are a helpful electronics store assistant.

Product information:
${JSON.stringify(product, null, 2)}

Customer question:
"${question}"

Rules:
- Answer ONLY using the product information.
- Do not invent specifications.
- If information is missing, say it is not specified.
- Keep the answer short and helpful.
`;

    const answer = await askAI(prompt);

    return res.json({
      success: true,
      answer,
      product,
      aiAvailable: true,
    });
  } catch (error) {
    console.error("❌ PRODUCT QUESTION AI ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI product question failed.",
      error: error.message,
      aiAvailable: false,
    });
  }
}

// ======================================================
// 4. RECOMMENDATIONS
// POST /api/ai/recommendations   body: { context } (optional: recent cart/browsing hints)
// ======================================================

async function getRecommendations(req, res) {
  try {
    const { context = '' } = req.body;

    // Pull a reasonable pool of in-stock products for Gemini to choose from
    const pool = await Product.find({ stock: { $gt: 0 } }).limit(40);

    const prompt = `
You are ZENTRO's shopping assistant, ZEN.

Available products:
${JSON.stringify(pool.map((p) => ({ id: p._id, name: p.name, category: p.category, price: p.price, tags: p.tags })))}

Customer context (may be empty):
"${context}"

Pick 4 to 6 product ids that make good general recommendations, favoring variety across categories
unless the context clearly points to one category.

Return ONLY valid JSON:
{ "productIds": ["...", "..."], "reason": "short explanation, under 40 words" }
`;

    const aiResult = await askAI(prompt);

    let parsed;
    try {
      const cleaned = aiResult.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { productIds: pool.slice(0, 6).map((p) => p._id), reason: 'Popular picks across our catalog.' };
    }

    const idSet = new Set((parsed.productIds || []).map(String));
    const products = pool.filter((p) => idSet.has(String(p._id)));

    return res.json({
      success: true,
      products: products.length ? products : pool.slice(0, 6),
      reason: parsed.reason || 'Popular picks across our catalog.',
      aiAvailable: true,
    });
  } catch (error) {
    console.error('❌ RECOMMENDATIONS ERROR:');
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'AI recommendations failed.',
      error: error.message,
      aiAvailable: false,
    });
  }
}

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  smartShopping,
  compareProducts,
  productQuestion,
  getRecommendations,
};