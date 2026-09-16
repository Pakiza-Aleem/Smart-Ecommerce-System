<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:450A0A,50:991B1B,100:EF4444&height=220&section=header" width="100%"/>

<br>

# ZENTRO

### Shop Smarter. Discover Better.

<p>
  <strong>An AI-powered full-stack e-commerce platform built with the MERN stack.</strong>
</p>

<br>

<a href="https://zentro-shopping.vercel.app">
  <img src="https://img.shields.io/badge/LIVE_DEMO-DC2626?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>

</div>

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
<td width="33%" align="center">

### 🛒 Shopping

Product discovery
Search & product details
Cart & wishlist
Order placement

</td>
<td width="33%" align="center">

### 🔐 Authentication

User registration
Secure login
JWT authentication
Protected resources

</td>
<td width="33%" align="center">

### 🤖 ZEN Assistant

AI shopping assistance
Natural-language queries
Budget-based discovery
Product recommendations

</td>
</tr>

<tr>
<td align="center">

### 📦 Orders

Create orders
Store order data
Retrieve user orders
Order management

</td>
<td align="center">

### 👨‍💼 Admin Dashboard

Product CRUD
Product management
Order management
Image uploads

</td>
<td align="center">

### ☁️ Cloud Storage

Multipart uploads
Multer processing
Cloudinary storage
Image URL integration

</td>
</tr>

<tr>
<td align="center">

### ⚛️ React Frontend

Reusable components
React Router
Application state
Responsive layouts

</td>
<td align="center">

### 🔌 REST API

Express routes
Controllers
CRUD operations
Middleware & JSON responses

</td>
<td align="center">

### 🗄️ Data Management

MongoDB
Mongoose
User-specific records
Products, cart, wishlist & orders

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

The primary focus of **ZENTRO** is the implementation of a complete full-stack e-commerce architecture and the integration of multiple backend and cloud services into one working application.

The project brings together:

* MERN-based application development
* RESTful API architecture
* JWT authentication
* MongoDB data management
* Cloud image storage
* Multipart file uploads
* AI API integration
* Admin-side management
* Frontend–backend communication

---

## 🧩 Core Focus Areas

<table align="center">
<tr>
<th>Area</th>
<th>Implementation</th>
</tr>

<tr>
<td><strong>E-Commerce</strong></td>
<td>Products, cart, wishlist & orders</td>
</tr>

<tr>
<td><strong>Authentication</strong></td>
<td>JWT-based authentication & protected resources</td>
</tr>

<tr>
<td><strong>REST API</strong></td>
<td>Express routes, controllers & middleware</td>
</tr>

<tr>
<td><strong>Database</strong></td>
<td>MongoDB & Mongoose</td>
</tr>

<tr>
<td><strong>File Handling</strong></td>
<td>Multer multipart uploads</td>
</tr>

<tr>
<td><strong>Cloud Storage</strong></td>
<td>Cloudinary image management</td>
</tr>

<tr>
<td><strong>AI Integration</strong></td>
<td>Google Gemini API through ZEN</td>
</tr>

<tr>
<td><strong>Admin Management</strong></td>
<td>Product & order administration</td>
</tr>

<tr>
<td><strong>Frontend</strong></td>
<td>React components, routing & interactive UI</td>
</tr>
</table>

---

## 🧠 Concepts Used

| Concept                | Implementation                                                            |
| ---------------------- | ------------------------------------------------------------------------- |
| **React**              | Functional components, props, state, hooks, forms & conditional rendering |
| **REST API**           | HTTP methods, route parameters, request bodies, JSON & status codes       |
| **Node.js + Express**  | Server, routers, middleware, controllers & asynchronous operations        |
| **MongoDB + Mongoose** | Schemas, models, CRUD operations, validation & queries                    |
| **Authentication**     | JWT, password hashing, protected routes & token verification              |
| **E-Commerce Logic**   | Products, cart, wishlist, orders & user-specific operations               |
| **File Handling**      | Multer, multipart/form-data & upload processing                           |
| **Cloud Integration**  | Cloudinary storage & image URL management                                 |
| **AI Integration**     | Gemini API requests, product context & natural-language responses         |
| **Frontend ↔ Backend** | Axios, asynchronous requests, API communication & state updates           |

---

## 🔌 REST API

ZENTRO follows a modular REST API structure where different resources are separated into dedicated route modules.

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

This separation keeps backend responsibilities organized and makes communication between the React frontend and Express backend easier to maintain.

---

## 🤖 ZEN — AI Shopping Assistant

**ZEN** is ZENTRO's AI-powered shopping assistant, integrated using the **Google Gemini API**.

It allows users to interact with the shopping platform through natural-language queries instead of relying only on traditional product browsing.

### 🔄 ZEN Flow

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

### 💬 Example Use Cases

* Find a product within a specific budget
* Compare two products
* Ask which product is better for a requirement
* Get product recommendations
* Describe a requirement naturally
* Ask for product-related information

ZEN complements the traditional shopping experience by providing a conversational way to explore and understand products.

---

## 🖼️ Product Image Upload Flow

ZENTRO uses **Multer** for processing multipart file uploads and **Cloudinary** for cloud-based image storage.

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

### Product Record

```text
Product Name
Description
Price
Category
Image URL
```

The actual image is stored in **Cloudinary**, while its URL is associated with the product record in **MongoDB**.

---

## 🛒 E-Commerce Data Flow

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

This represents the core shopping workflow implemented across the frontend, REST API, authentication layer and database.

---

## ⚙️ Setup Guide

<details>
<summary><strong>Click to expand setup instructions</strong></summary>

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

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
```

#### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=
```

### 5. Run Backend

```bash
cd backend
npm run dev
```

### 6. Run Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

</details>

---

## 📌 Project Scope & Limitations

### Included

* Product catalog and discovery
* Product search
* Product details
* Shopping cart
* Wishlist
* User authentication
* Order placement and management
* Admin product management
* Admin order management
* Cloud product image storage
* AI-assisted product discovery

### Current Limitations

* No online payment gateway
* No product reviews or ratings
* No advanced order tracking
* No dedicated admin analytics system
* No personalized recommendation engine
* No email notification system
* Advanced performance optimization is outside the current project scope

---

## ☁️ Deployment Note

> **Deployment Note:** ZENTRO is currently hosted using free-tier services. As a result, the application may take a few seconds to respond on the first request after a period of inactivity due to the hosting service waking the application. Subsequent requests should respond normally.

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

Through ZENTRO, the project covers practical experience with:

* Full-stack MERN application development
* REST API design and integration
* JWT-based authentication
* MongoDB schema and data management
* React component architecture
* Frontend–backend communication
* File upload processing with Multer
* Cloudinary media storage
* Third-party API integration
* AI-powered application features
* Admin-side CRUD operations
* Full-stack application deployment

---

## 👩‍💻 Author

<div align="center">

### Pakiza Aleem

**BS Computer Science Student · UI/UX Designer · MERN Stack Developer**

<br>

<a href="https://github.com/Pakiza-Aleem">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.behance.net/pyradesigns">
  <img src="https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white"/>
</a>

</div>

---

## 🚀 Explore More

<div align="center">

**Like the project? Explore the code, check out the design work, and follow along for more full-stack projects.**

<br>

<a href="https://zentro-shopping.vercel.app">
  <img src="https://img.shields.io/badge/LIVE_DEMO-DC2626?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>

<a href="https://github.com/Pakiza-Aleem">
  <img src="https://img.shields.io/badge/VIEW_ON_GITHUB-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.behance.net/pyradesigns">
  <img src="https://img.shields.io/badge/EXPLORE_DESIGN_WORK-1769FF?style=for-the-badge&logo=behance&logoColor=white"/>
</a>

<br><br>

**Build. Design. Learn. Repeat.**

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:EF4444,50:991B1B,100:450A0A&height=120&section=footer" width="100%"/>

</div>
