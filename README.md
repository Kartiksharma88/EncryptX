# EncryptX - Advanced File Encryption & Decryption Cybersecurity Application

<div align="center">
  <img src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="EncryptX Banner" width="100%" style="max-width:1200px; border-radius: 10px; object-fit: cover;">
  
  <p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <img src="https://img.shields.io/badge/Security-AES--256--GCM-red" alt="AES-256-GCM">
  </p>

  <p style="font-weight:bold; margin-top:8px;">
    A modern, privacy-first file encryption and decryption application built with web technologies — client-side encryption for maximum security.
  </p>
</div>

<h1 align="center">File Encryption & Decryption Tool</h1>

<p align="center">
  <a href="https://your-demo-link.example" target="_blank"><strong>Visit Demo (replace with your deployed URL)</strong></a>
</p>
<hr />

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🔒 Security Architecture](#-security-architecture)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🎯 Usage Guide](#-usage-guide)
- [🏗️ Architecture & Design](#️-architecture--design)
- [🔧 Technical Specifications](#-technical-specifications)
- [🛡️ Security Implementation](#️-security-implementation)
- [🔑 Cryptographic Details](#-cryptographic-details)
- [📊 Performance & Optimization](#-performance--optimization)
- [🧪 Testing & QA](#-testing--qa)
- [🔍 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**EncryptX** is a secure, client-side web application that enables strong file encryption and decryption directly in the browser using AES (GCM) primitives. It is built to be lightweight, fast and privacy-preserving — all cryptographic operations take place locally so files are never uploaded to a server.

### 🎯 Mission Statement

To provide a simple, developer-friendly, and secure way for users to protect sensitive files using standard cryptographic best practices while keeping the UX minimal and performant.

---

## ✨ Key Features

- 🔒 AES-256-GCM encryption support (via WebCrypto API)  
- 🔀 Encrypt and decrypt files directly in the browser (client-side)  
- 📂 Drag & drop or click-to-upload file UI  
- 🔑 Built-in secure password generator and entropy indicator  
- 🔐 Password strength meter + suggestions  
- 📥 Download encrypted/decrypted outputs instantly  
- ⚡ Fast operations using streaming / chunking for large files  
- ♻️ No server-side processing — total privacy & zero data leakage

---

## 🔒 Security Architecture

- **Client-side only**: All crypto operations use the browser WebCrypto API.  
- **Authenticated encryption**: AES-GCM is used to provide confidentiality + integrity.  
- **Derivation**: Passwords are processed with PBKDF2 or HKDF (configurable) to derive strong symmetric keys.  
- **Nonces / IVs**: Unique nonces are generated per-file and stored alongside ciphertext in the encrypted blob format.  
- **No telemetry**: The app does not send file contents, salts, or keys to any server.

> ⚠️ Security note: The security of encrypted data depends on password strength. Use the provided generator or a passphrase with high entropy.

---

## 🚀 Quick Start

Clone, install, and run the development server:

```bash
git clone https://github.com/Kartiksharma88/EncryptX.git
cd EncryptX
npm install
npm run dev
Open your browser at: http://localhost:5173

📦 Installation
Prerequisites

Node.js 18+ (recommended 20+)

npm (bundled with Node.js)

Install & Run

bash
Copy code
# clone repo
git clone https://github.com/Kartiksharma88/EncryptX.git
cd EncryptX

# install dependencies
npm install

# start dev server
npm run dev
Build for production

bash
Copy code
npm run build
npm run preview
🎯 Usage Guide
Encrypting a File
Open EncryptX in your browser.

Go to the Encryption tab.

Drag & drop or browse and select files.

Enter a strong password or click Generate.

Click Encrypt Files.

Download the encrypted archive (contains ciphertext + nonce + metadata).

Decrypting a File
Go to the Decryption tab.

Upload the encrypted file produced earlier.

Enter the password used to encrypt.

Click Decrypt and download the original file(s).

🏗️ Architecture & Design
Frontend: Vite + TypeScript + Tailwind CSS

Crypto layer: WebCrypto API (preferred), with fallback helper utilities for environments without full support.

UI: Modular components (file-drop, password-tools, progress bars) made for reusability.

Bundle: Production-ready dist folder via Vite.

🔧 Technical Specifications
Input: Single or multiple files

Output: Encrypted binary with metadata wrapper (version, nonce, salt)

Key derivation: PBKDF2 / HKDF with configurable iterations (default secure value recommended)

Authenticated encryption: AES-GCM (128/256-bit keys)

Large-file handling: Chunk processing to avoid blocking UI and reduce memory spikes

🛡️ Security Implementation
Use crypto.getRandomValues() for salts & nonces.

Store only ciphertext & metadata in the downloadable bundle.

Validate tags on decryption — a failed tag indicates tampering or incorrect password.

Avoid using deprecated or unsafe crypto primitives.

🔑 Cryptographic Details
KDF: PBKDF2 with SHA-256, recommended iterations & salt length included in metadata.

Cipher: AES-GCM 256-bit key (recommended).

Nonce: 96-bit random nonce per encryption operation.

Metadata layout: [magic][version][kdf-salt][kdf-params][nonce][ciphertext][tag] — the app can parse this for decryption.

📊 Performance & Optimization
Files are processed in streaming chunks to reduce peak memory consumption.

UI indicates progress percentage for encryption/decryption operations.

WebWorkers can be used to offload heavy crypto operations from the main thread (optional enhancement).

🧪 Testing & QA
Unit tests: Crypto helpers & KDF functions.

Integration tests: Round-trip encrypt → decrypt for files of various sizes.

Fuzz tests: Random input sizes and corrupted ciphertext to ensure safe failure modes.

🔍 Troubleshooting
Encryption fails: Ensure your browser supports WebCrypto (modern Chrome/Edge/Firefox).

Decryption fails with tag error: Wrong password or ciphertext corrupted.

Large files cause memory issues: Use chunked processing / increase browser memory or run on desktop build.

🤝 Contributing
Contributions are welcome!
Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/your-feature

Commit changes: git commit -m "Add amazing feature"

Push: git push origin feature/your-feature

Open a Pull Request

Please include tests for crypto-related changes and explain security implications.

