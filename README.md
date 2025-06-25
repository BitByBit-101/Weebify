# 🎌 Weebify | BitByBit-101

> A full-featured anime discovery and rating platform built with ❤️ by **Bhumika**  
> 🌐 [Connect with me on LinkedIn](https://www.linkedin.com/in/bhumika-meena-a58843359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app )

---

## ✨ What is Weebify?

**Weebify** isn’t just another anime site — it’s your personal **anime hub**. Designed for otakus and casual viewers alike, Weebify lets you:

- 🌟 **Discover new anime** with ratings and info
- 📺 **Build a custom watchlist** (like a “Plan to Watch” shrine)
- 📝 **Take anime quizzes** to test your fandom
- ⭐ **Rate & review anime**
- 🌀 Enjoy beautiful UI with **GSAP animations** and **Locomotive scroll magic**

Think of it as **MyAnimeList meets modern web tech**, all rolled into one fast, fun, and responsive experience.

---

## 🧰 Tech Stack

| Frontend                    | Backend                  |
|----------------------------|--------------------------|
| 🧩 Tailwind CSS            | ⚙️ Node.js              |
| 💫 GSAP (animations)       | 🚀 Express.js           |
| 🎢 Locomotive Scroll       | 🛢 MongoDB + Mongoose   |
| 🖼 EJS or Static Files      | 🔐 Passport.js (OAuth)   |

---

## 📦 Features

- 🔍 **Search & discover anime**
- ✅ Add anime to your **watchlist**
- 🧠 Take anime-themed **quizzes**
- 🗳 **Rate & review** shows
- 🌐 **Google login** using OAuth
- 📱 Fully responsive + **smooth scroll & animations**

---

## 🛠 How to Run Locally

### 1. 🧾 Clone the Repository

```bash
git clone https://github.com/yourusername/BitByBit-101.git
cd BitByBit-101
2. 📦 Install Dependencies

npm install

3. 🛡️ Set Up Environment Variables
Create a .env file in the root by copying the example:

cp .env.example .env

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

MONGO_URI=your-mongodb-uri
SESSION_SECRET=some-random-secret


4. 🔐 Set Up Google OAuth
Visit Google Cloud Console:

Create a new OAuth 2.0 Client ID

Authorized JavaScript origin:
http://localhost:3000

Authorized redirect URI:
http://localhost:3000/auth/google/callback

Paste the keys into your .env file.

5. 🚀 Start the App

npm run dev
Visit: http://localhost:3000

🧪 Bonus: Quiz & Ratings
Take anime quizzes to test your knowledge

Rate anime based on your own score

Add shows to your watchlist with a click

Smooth transitions with GSAP and buttery scroll from Locomotive.js

