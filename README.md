# 🧠 Self-Reflection Journal

A full-stack self-reflection and mental wellness tracker that helps users log their daily moods, thoughts, and experiences. With journaling, mood analytics, and motivational content, this app promotes self-awareness and emotional well-being.

---

## ✨ Features

- 📝 Secure user registration & login (JWT authentication)
- 🔐 Forgot password with email recovery
- 🌤️ Daily journal entries with title, content & mood
- 📈 Mood analytics (charts, streaks, mood insights)
- 💬 Mood-based affirmations
- 🎨 Beautiful, responsive UI 
- ⚙️ Built with MERN stack (MongoDB, Express, React, Node.js)

---

## 🚀 Live Demo

👉 [Live App](https://self-reflection-journal.netlify.app/login)

---

## 📸 Screenshots


| <img width="488" height="454" alt="image" src="https://github.com/user-attachments/assets/d88209fd-f71a-4495-a669-78a763472716" />
 | <img width="873" height="531" alt="image" src="https://github.com/user-attachments/assets/bf28c429-b246-4500-a727-5bc57be07a77" />
 <img width="1144" height="584" alt="image" src="https://github.com/user-attachments/assets/8381f590-4201-4c7d-9e00-d1a4bb19cecc" />
<img width="894" height="607" alt="image" src="https://github.com/user-attachments/assets/546c13ef-ec63-4c34-90a8-c1901eea4268" />


## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Recharts (for mood visualizations)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Nodemailer (for password reset via email)

---

## 📁 Folder Structure

```
├── client-vite/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   └── utils/
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
```

---

## 🔐 Environment Variables

**Frontend (`.env`):**
```env
VITE_BACKEND_URL=https://jobtracker-backend-xw10.onrender.com
```

**Backend (`.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://self-reflection-journal.netlify.app
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 🧪 Run Locally

### 1. Clone the project
```bash
git clone https://github.com/your-username/self-reflection-journal.git
```

### 2. Install dependencies
```bash
# Install frontend packages
cd client-vite
npm install

# Install backend packages
cd ../server
npm install
```

### 3. Start the app
```bash
# Start frontend
cd client-vite
npm run dev

# Start backend
cd ../server
node server.js
```

> 🔄 Make sure MongoDB is running locally or hosted remotely.

---

## 🙋‍♀️ Author

Made with ❤️ by **Anjali**  


---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
