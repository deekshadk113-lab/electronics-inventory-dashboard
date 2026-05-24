# Electronics Inventory and Warranty Analytics Dashboard  
### Mini Project

A modern full-stack mini project developed using MongoDB, Node.js, Express.js, React, and Lovable.ai. The project is designed to manage semi-structured electronics inventory data and provide real-time analytics visualization through an interactive dashboard.

---

# Project Overview

This mini project demonstrates the use of MongoDB flexible schemas for storing heterogeneous electronic product specifications such as:
- RAM
- Processor
- GPU
- Storage
- Battery
- Display Type
- Warranty Information

The dashboard provides real-time business insights including:
- Inventory monitoring
- Sales analytics
- Category distribution
- Revenue tracking
- Low stock alerts
- Warranty expiry alerts

---

# Features

- Flexible NoSQL schema design
- Real-time inventory analytics
- Interactive charts and graphs
- Product category distribution
- Low stock monitoring
- Warranty tracking
- Search and filter functionality
- Responsive dashboard UI
- Full-stack integration

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Recharts
- Lovable.ai

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- MongoDB Compass

---

# Project Structure

```bash
VOLTRIX-DASHBOARD
│
├── src
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── pages
│   └── App.tsx
│
├── public
│
├── electronics-dashboard
│   ├── server.js
│   ├── package.json
│
├── Report
│   └── Electronics_Inventory_Report.pdf
│
├── Screenshots
│
├── package.json
└── README.md
```

---

# Database Collections

## products

Stores electronics inventory data.

### Example Fields
- name
- category
- brand
- stock
- price
- specifications
- warranty

---

## sales

Stores sales transaction data.

### Example Fields
- product_name
- quantity
- revenue
- sale_date
- region

---

# API Endpoints

## Get Products

```http
GET /products
```

---

## Get Sales Data

```http
GET /sales
```

---

## Add Product

```http
POST /products
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/electronics-inventory-dashboard.git
```

---

# Backend Setup

## Navigate to Backend Folder

```bash
cd electronics-dashboard
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Backend Server

```bash
node server.js
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

# Frontend Setup

## Open Frontend Folder

```bash
cd ..
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# MongoDB Configuration

## Database Name

```bash
ElectronicsInventoryDB
```

## Collections
- products
- sales

MongoDB Compass is used for database visualization and management.

---

# Sample MongoDB Queries

## Low Stock Products

```javascript
db.products.find({
  stock: { $lt: 20 }
})
```

---

## Total Revenue

```javascript
db.sales.aggregate([
{
  $group: {
    _id: null,
    totalRevenue: {
      $sum: "$revenue"
    }
  }
}
])
```

---

## Category Distribution

```javascript
db.products.aggregate([
{
  $group: {
    _id: "$category",
    count: { $sum: 1 }
  }
}
])
```

---

# Dashboard Modules

- Overview Dashboard
- Inventory Monitoring
- Analytics Visualization
- Warranty Tracking
- Sales Monitoring

---

# Advantages

- Flexible schema support
- Efficient semi-structured data handling
- Scalable architecture
- Real-time analytics
- Interactive UI
- Easy frontend customization
- Modern dashboard design

---

# Future Enhancements

- AI-based demand forecasting
- Barcode integration
- Supplier management
- Authentication system
- Cloud deployment
- Real-time notifications
- Mobile app integration

---

# Conclusion

This mini project demonstrates the advantages of MongoDB flexible schemas for handling heterogeneous electronics inventory data. The project integrates MongoDB, Node.js, Express.js, React, and Lovable.ai to create a scalable and modern inventory analytics dashboard with real-time visualization capabilities.

---

# References

- MongoDB Documentation  
https://www.mongodb.com/docs/

- Node.js Documentation  
https://nodejs.org/

- React Documentation  
https://react.dev/

- Lovable.ai  
https://lovable.dev/

- Express.js Documentation  
https://expressjs.com/
