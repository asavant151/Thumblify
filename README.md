# Thumblify - AI Thumbnail Generator

Thumblify is a modern, full-stack web application that empowers content creators to generate stunning, high-converting thumbnails using the power of AI. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Replicate's Flux model, Thumblify offers a seamless experience from generation to download.

## 🚀 Features

*   **AI-Powered Generation**: Create professional thumbnails from text prompts using advanced AI models.
*   **Customizable Styles**: Choose from various styles like Bold & Graphic, Tech/Futuristic, Minimalist, Photorealistic, and Illustrated.
*   **Smart Credit System**: Users start with free credits and can upgrade their plan to generate more.
*   **Flexible Pricing**: Multiple tiers (Free, Go, Plus, Pro, Team, Enterprise) to suit different needs.
*   **Secure Payments**: Integrated Razorpay payment gateway for smooth and secure subscription upgrades.
*   **User Dashboard**: "My Generations" dashboard to view and manage previously created thumbnails.
*   **Authentication**: Secure user authentication with email/password login and registration.
*   **Responsive Design**: Fully responsive interface built with React and Tailwind CSS.
*   **Modern UI/UX**: Sleek, dark-themed interface with smooth animations using Framer Motion.

## 🛠️ Technology Stack

### Client-Side
*   **React**: UI Library
*   **Vite**: Build Tool
*   **TypeScript**: Type Safety
*   **Tailwind CSS**: Styling
*   **Framer Motion**: Animations
*   **React Router DOM**: Navigation
*   **Axios**: API Requests
*   **Lucide React**: Icons
*   **React Hot Toast**: Notifications

### Server-Side
*   **Node.js**: Runtime Environment
*   **Express**: Web Framework
*   **MongoDB**: Database
*   **Mongoose**: ODM
*   **TypeScript**: Type Safety
*   **Razorpay**: Payment Processing
*   **Replicate**: AI Model Integration
*   **Cloudinary**: Image Storage
*   **Bcrypt**: Password Hashing
*   **Express Session**: Session Management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)
*   [Git](https://git-scm.com/)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository_url>
cd Thumblify
```

### 2. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GEMINI_API_KEY=your_gemini_api_key_if_used
CLOUDINARY_URL=your_cloudinary_url
REPLICATE_API_KEY=your_replicate_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the server:

```bash
npm run server
```
The server will start on `http://localhost:3000` (or your configured port).

### 3. Client Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=your_client_side_razorpay_key_id
```

Start the development server:

```bash
npm run dev
```
The client will start on `http://localhost:5173`.

## 💳 Payment Integration (Razorpay)

This project uses Razorpay for handling payments.
1.  Create a [Razorpay account](https://razorpay.com/).
2.  Generate API Keys (Key ID and Key Secret) from the dashboard.
3.  Add them to the respective `.env` files (Server needs both, Client only needs Key ID).
4.  Standard plans (Free, Go, Plus, Pro) and Business plans (Team, Enterprise) are configured in the `PaymentController`.

## 📁 Project Structure

```
Thumblify/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/         # Static assets and types
│   │   ├── components/     # Reusable components
│   │   ├── configs/        # API configuration
│   │   ├── context/        # React Context (Auth)
│   │   ├── data/           # Static data files
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── ...
├── server/                 # Node.js Backend
│   ├── configs/            # Configuration files
│   ├── controllers/        # Route logic
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.ts           # Entry point
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
