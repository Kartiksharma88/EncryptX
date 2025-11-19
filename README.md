EncryptX 🔐
Advanced File Encryption & Decryption Tool

EncryptX is a modern, fast, and secure web-based file encryption platform built using Vite + TypeScript + Tailwind CSS.
It allows users to encrypt and decrypt files directly in the browser using AES-256 encryption — ensuring maximum privacy with zero backend.

🚀 Features
🔒 Strong File Encryption

AES-256 encryption

100% client-side (files never leave your device)

Fast encrypt/decrypt operations

🧩 Drag & Drop File Upload

Simple file drop-zone

Multi-file support

Real-time file preview

🔑 Advanced Password Handling

Strong password generator

Live password strength check

Manual or automatic password modes

⚡ Lightning Fast

Powered by Vite

Lightweight frontend app

Instant UI updates

📥 Installation
Clone the Repository
git clone https://github.com/Kartiksharma88/EncryptX.git
cd EncryptX

Install Dependencies
npm install

Start Development Server
npm run dev


Visit in browser:

👉 http://localhost:5173

🧪 First Run Guide

Open the app

Go to Encryption tab

Drag & drop files

Enter (or generate) a strong password

Click Encrypt Files

Download encrypted result

Switch to Decrypt for decoding

📦 Production Build

Create optimized build:

npm run build


Preview it locally:

npm run preview

🐳 Docker Deployment
Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

Build & Run
docker build -t encryptx .
docker run -p 80:80 encryptx

📁 Project Structure
EncryptX/
│
├── src/                
├── index.html          
├── package.json        
├── tailwind.config.js  
├── vite.config.ts      
└── README.md           

⚙️ Technologies Used

Vite

TypeScript

Tailwind CSS

WebCrypto API / CryptoJS

Node.js

☁️ Deployment on Vercel

Go to https://vercel.com

Import the GitHub repo

Set:

Build Command → npm run build

Output Directory → dist

Click Deploy

Your project will be live in seconds.

👨‍💻 Author
Kartik Sharma

GitHub: https://github.com/Kartiksharma88

LinkedIn: https://www.linkedin.com/in/kartik-sharma-profile/

🛡️ Security Notes

All encryption runs locally

No servers involved

No file or password ever leaves your device

🤝 Contributing

Pull requests and feature suggestions are welcome!