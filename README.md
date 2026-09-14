<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:450A0A,50:991B1B,100:EF4444&height=220&section=header" width="100%"/>

<br>

# ZENTRO

### Shop Smarter. Discover Better.

<p>
  <strong>An AI-powered full-stack e-commerce platform built with the MERN stack.</strong>
</p>

<p>
  <a href="https://zentro-shopping.vercel.app">
    <img src="https://img.shields.io/badge/LIVE_DEMO-991B1B?style=for-the-badge&logo=vercel&logoColor=white"/>
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white"/>
</p>

</div>

> **Deployment Note:** ZENTRO is currently hosted using free-tier services. As a result, the application may take a few seconds to respond on the first request after a period of inactivity due to the hosting service waking the application. Subsequent requests should respond normally.

---

## 🛍️ About

**ZENTRO** is a full-stack e-commerce platform built with the **MERN stack**, combining core online shopping functionality with cloud-based image management and AI-assisted product discovery.

The platform allows users to browse products, search the catalog, view product details, manage their cart and wishlist, authenticate securely, and place orders through a complete shopping workflow.

An **admin dashboard** provides product and order management, while **Multer + Cloudinary** handle product image uploads and cloud storage.

ZENTRO also introduces **ZEN**, an AI shopping assistant powered by the **Google Gemini API**, allowing users to interact with the store through natural-language queries and receive product-focused assistance.

---

## ✨ Features

<table>
<tr>
<td width="33%" valign="top">

### 🛒 Shopping

* Product discovery
* Search products
* Product details
* Shopping cart
* Wishlist
* Order placement

</td>

<td width="33%" valign="top">

### 🔐 Authentication

* User registration
* Secure login
* JWT authentication
* Protected resources
* User-specific data
* Authenticated requests

</td>

<td width="33%" valign="top">

### 🤖 ZEN Assistant

* AI-powered assistance
* Natural-language queries
* Budget-based discovery
* Product comparison
* Product recommendations
* Requirement-based search

</td>
</tr>

<tr>
<td width="33%" valign="top">

### 📦 Orders

* Create orders
* Store order details
* User-specific orders
* Order retrieval
* Order management
* Cart-to-order workflow

</td>

<td width="33%" valign="top">

### 👨‍💼 Admin Dashboard

* Product CRUD
* Product image upload
* Product management
* Order management
* Administrative controls
* Cloud image integration

</td>

<td width="33%" valign="top">

### ☁️ Cloud Storage

* Multipart uploads
* Multer processing
* Cloudinary integration
* Cloud image storage
* Image URLs
* Database association

</td>
</tr>

<tr>
<td width="33%" valign="top">

### ⚛️ React Frontend

* Reusable components
* React Router
* State management
* Dynamic interfaces
* Controlled forms
* Responsive layouts

</td>

<td width="33%" valign="top">

### 🔌 REST API

* Express routes
* Controller-based logic
* CRUD operations
* JSON responses
* Middleware
* Axios communication

</td>

<td width="33%" valign="top">

### 🗄️ Data Management

* MongoDB database
* Mongoose models
* User-specific records
* Product records
* Cart & wishlist data
* Order records

</td>
</tr>
</table>

---

## 🔄 Data Flow

```text
User Action
     ↓
React Component
     ↓
Axios Request
     ↓
Express Route
     ↓
Controller / Middleware
     ↓
Mongoose / Multer
     ↓
MongoDB / Cloudinary / Gemini
     ↓
JSON Response
     ↓
React State Update
     ↓
Updated Interface
```

---

## 🎯 Project Focus

The primary focus of ZENTRO is the implementation of a **complete full-stack e-commerce architecture** and the integration of multiple backend and cloud services into one working application.

### Core Focus Areas

| Area                   | Implementation                                 |
| ---------------------- | ---------------------------------------------- |
| 🛍️ E-Commerce         | Products, cart, wishlist & orders              |
| 🔐 Authentication      | JWT-based authentication & protected resources |
| 🔌 REST API            | Express routes, controllers & middleware       |
| 🗄️ Database           | MongoDB & Mongoose                             |
| 📁 File Handling       | Multer-based multipart uploads                 |
| ☁️ Cloud Storage       | Cloudinary image management                    |
| 🤖 AI Integration      | Google Gemini API through ZEN                  |
| 👨‍💼 Admin Management | Product & order administration                 |
| ⚛️ Frontend            | React components, routing & interactive UI     |

---

## 🧠 Concepts Used

| Concept                | Implementation                                                            |
| ---------------------- | ------------------------------------------------------------------------- |
| **React**              | Functional components, props, state, hooks, forms & conditional rendering |
| **REST API**           | HTTP methods, route parameters, request bodies, JSON & status codes       |
| **Node.js + Express**  | Server setup, routers, middleware, controllers & async operations         |
| **MongoDB + Mongoose** | Schemas, models, CRUD operations, validation & queries                    |
| **Authentication**     | JWT, password hashing, protected routes & token verification              |
| **E-Commerce Logic**   | Products, cart, wishlist, orders & user-specific operations               |
| **File Handling**      | Multer, multipart/form-data & upload processing                           |
| **Cloud Integration**  | Cloudinary storage & image URL management                                 |
| **AI Integration**     | Gemini API requests, product context & natural-language responses         |
| **Frontend ↔ Backend** | Axios, asynchronous requests, API communication & state updates           |

---

## 🔌 REST API

ZENTRO follows a modular REST API structure:

```text
/api
├── auth
├── products
├── cart
├── wishlist
├── orders
├── ai
└── health
```

The API separates major application responsibilities into dedicated route modules, making the backend easier to maintain, extend, and integrate with the React frontend.

---

## 🤖 ZEN — AI Shopping Assistant

**ZEN** is ZENTRO's AI-powered shopping assistant, integrated with the **Google Gemini API**.

Instead of relying only on traditional filters and navigation, users can describe what they are looking for using natural language.

### ZEN Flow

```text
User Query
    ↓
ZEN Interface
    ↓
Axios Request
    ↓
Express AI Route
    ↓
Google Gemini API
    ↓
AI Response
    ↓
ZEN Interface
```

### Example Use Cases

* Find a suitable product within a budget
* Compare two products
* Ask which option is better for a specific need
* Get product recommendations
* Describe product requirements naturally
* Ask for more information about a product

> ZEN complements the traditional shopping experience by providing a conversational way to explore and understand products.

---

## 🖼️ Product Image Upload Flow

ZENTRO uses **Multer** for handling multipart file uploads and **Cloudinary** for cloud-based image storage.

```text
Admin Upload Form
        ↓
multipart/form-data
        ↓
Axios
        ↓
Express Route
        ↓
Multer Middleware
        ↓
Cloudinary Upload
        ↓
Image URL
        ↓
MongoDB Product Record
        ↓
Product Display
```

Product records contain information such as:

```text
Product Name
Description
Price
Category
Image URL
```

The actual image is stored in **Cloudinary**, while its URL is associated with the corresponding product record in MongoDB.

---

## 🛍️ E-Commerce Data Flow

```text
Product Discovery
        ↓
Product Details
        ↓
Cart / Wishlist
        ↓
Authenticated User
        ↓
Cart Management
        ↓
Order Placement
        ↓
Order Created
        ↓
Order Management
```

This connects the major shopping operations into a single user workflow.

---

## ⚙️ Setup Guide

<details>
<summary><strong>Click to expand setup instructions</strong></summary>

### System Requirements

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Cloudinary account
* Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Pakiza-Aleem/ZENTRO.git
cd ZENTRO
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

#### Backend

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_frontend_url

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=your_backend_url
```

### 5. Start the Backend

```bash
cd backend
npm run dev
```

### 6. Start the Frontend

```bash
cd frontend
npm run dev
```

The application will then be available through the local development URLs provided by Vite and the backend server.

</details>

---

## 📌 Project Scope & Limitations

ZENTRO currently focuses on the core functionality required for a modern full-stack e-commerce platform.

### Included

* Product catalog and discovery
* Search functionality
* Cart and wishlist
* User authentication
* Order management
* Admin product management
* Admin order management
* Cloud-based product images
* AI-assisted product discovery

### Current Limitations

* No online payment gateway
* No product reviews or ratings
* No advanced order tracking
* No dedicated admin analytics
* No personalized recommendation engine
* No email notification system
* Advanced performance optimization is outside the current project scope

---

## 🧰 Technology Stack

<div align="center">

### ⚛️ FRONTEND

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=20232A"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>

<br><br>

### 🖥️ BACKEND

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/REST_API-991B1B?style=flat-square"/>

<br><br>

### 🗄️ DATABASE & AUTH

<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>

<br><br>

### ☁️ CLOUD & AI

<img src="https://img.shields.io/badge/Multer-FF6B35?style=flat-square"/>
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white"/>
<img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white"/>

<br><br>

### 🛠️ DEVELOPMENT

<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white"/>

<br><br>

### 🌐 HOSTING

<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Abasthan-991B1B?style=flat-square"/>
<img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white"/>

</div>

<br>

<table align="center">
<tr>
<td align="center"><strong>Frontend</strong><br>React-based responsive UI</td>
<td align="center"><strong>Backend</strong><br>RESTful Express API</td>
<td align="center"><strong>Database</strong><br>MongoDB + Mongoose</td>
</tr>
<tr>
<td align="center"><strong>Authentication</strong><br>JWT-based security</td>
<td align="center"><strong>Cloud</strong><br>Cloudinary media storage</td>
<td align="center"><strong>AI</strong><br>Gemini-powered ZEN</td>
</tr>
<tr>
<td align="center"><strong>Development</strong><br>Git · GitHub · Postman</td>
<td align="center"><strong>Frontend Hosting</strong><br>Vercel</td>
<td align="center"><strong>Backend Hosting</strong><br>Abasthan</td>
</tr>
</table>

---

## 📚 Learning Outcomes

Through ZENTRO, the project demonstrates practical experience with:

* Building a complete MERN stack application
* Designing and consuming REST APIs
* Connecting React with an Express backend
* Modeling application data with MongoDB and Mongoose
* Implementing JWT-based authentication
* Building protected user functionality
* Developing cart, wishlist and order workflows
* Creating admin-side management functionality
* Handling file uploads with Multer
* Integrating Cloudinary for cloud image storage
* Connecting third-party AI services through APIs
* Managing asynchronous frontend-backend communication
* Structuring a multi-feature full-stack application
* Working with environment-based configuration
* Deploying full-stack application components

---

## 👩‍💻 Author

<div align="center">

### Pakiza Aleem

**BS Computer Science Student · UI/UX Designer · MERN Stack Developer**

<br>

<a href="https://github.com/Pakiza-Aleem">
  <img src="https://img.shields.io/badge/GitHub-Pakiza--Aleem-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.behance.net/pyradesigns">
  <img src="https://img.shields.io/badge/Behance-Pyra_Designs-1769FF?style=for-the-badge&logo=behance&logoColor=white"/>
</a>

</div>

---

## 🚀 Explore More

<div align="center">

### Like the project?

**Explore the code, check out the design work, and follow along for more full-stack projects.**

<br>

<a href="https://zentro-shopping.vercel.app">
  <img src="https://img.shields.io/badge/LIVE_DEMO-991B1B?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>

<a href="https://github.com/Pakiza-Aleem">
  <img src="https://img.shields.io/badge/VIEW_ON_GITHUB-991B1B?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.behance.net/pyradesigns">
  <img src="https://img.shields.io/badge/EXPLORE_DESIGN_WORK-EF4444?style=for-the-badge&logo=behance&logoColor=white"/>
</a>

<br><br>

**Build. Design. Learn. Repeat.**

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:EF4444,50:991B1B,100:450A0A&height=120&section=footer" width="100%"/>

</div>
