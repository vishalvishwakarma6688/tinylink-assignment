# TinyLink — Modern URL Shortener (Bitly Clone)

TinyLink is a full-stack URL shortener application inspired by Bit.ly.  
Users can shorten long URLs, track clicks, view analytics, generate QR codes, and manage their links through a clean dashboard.

✔ Fully responsive  
✔ Modern UI (Next.js + Tailwind)  
✔ Analytics dashboard  
✔ QR code generation  
✔ Backend with Express + MongoDB  
✔ Deployed on Render + Vercel  

---

## Live Demo

### Frontend (Next.js on Vercel)
🔗https://tinylink-assignment.vercel.app/

### Backend API (Express on Render)
🔗 https://tinylink-assignment.onrender.com/

---

## Core Features

### 🔗 URL Shortening
- Create short links with auto-generated or custom codes  
- Validate original URLs  
- Ensure unique codes across all users  

### Redirection
- Visiting `/{code}` redirects using HTTP 302  
- Click count increments  
- Last-clicked timestamp updates  

### Dashboard
- View all short links  
- Search / filter  
- Copy short URL  
- Delete link  
- View stats for each link  

### Analytics Page
- Daily click breakdown  
- Charts (Bar / Line)  
- Total clicks visualization  
- Responsive and modern UI  

### Stats Page `/code/:code`
- Code  
- Short URL  
- Target URL  
- Click count  
- Last clicked  
- Created date  
- QR code generation + download  
- Delete from stats page  

### Good UI/UX
- Smooth transitions  
- Modern deletion modal  
- Full-screen loader  
- Mobile responsive layouts  
- Dashboard animations  

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS 4
- Axios
- React Hot Toast
- React Icons
- qrcode.react

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  
- CORS  
- Dotenv  

### **Hosting**
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📁 Folder Structure
<img width="289" height="753" alt="image" src="https://github.com/user-attachments/assets/5d3df399-c573-47d7-a652-e862278c0b04" />

