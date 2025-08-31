# 🎬 MovieWatcherX

**MovieWatcherX** is a responsive movie and series discovery web app powered by **The Movie Database (TMDB) API**. It allows users to search for movies, watch trailers, view overviews, check cast & crew details, and mark favorites. Designed with a clean UI, smooth animations, and dark/light themes, it's the ultimate film guide for entertainment lovers.

🌐 **Live Demo**: [https://movieswatchx.netlify.app](https://movieswatchx.netlify.app)


---

## 🚀 Features

- 🔍 Search movies and TV shows in real-time
- 🎥 Watch official YouTube trailers directly
- 👤 View cast, crew, and detailed overviews
- 🌟 Rate indicators with color coding
- ❤️ Mark favorites (saved in local storage)
- 🌗 Toggle between dark and light themes
- 📱 Responsive design for all devices
- 💨 Smooth scroll animations using AOS

---

## 🛠 Tech Stack

| Technology    | Description                    |
|---------------|--------------------------------|
| **HTML5**     | Semantic markup                |
| **CSS3**      | Custom styles + media queries  |
| **JavaScript**| Vanilla JS for logic & fetch   |
| **AOS.js**    | Scroll animations              |
| **TMDB API**  | Movie/Series data source       |
| **Netlify**   | Hosting & deployment           |

---

## 🧠 How It Works

- Calls [TMDB API](https://www.themoviedb.org/documentation/api) to fetch data.
- Uses `/discover/movie`, `/search/movie`, `/movie/{id}/videos`, `/movie/{id}/credits` endpoints.
- Dynamically creates DOM elements using JS for cards, overview, and modals.
- Stores favorites using `localStorage`.

---


---

## 🧪 Setup Locally

1. **Clone the repository**  

git clone https://github.com/Mayank-cyber-cell/MovieWatcher.git
cd MovieWatcher


2. Insert your TMDB API Key in script.js
Replace your_api_key_here with your key:


const API_KEY = 'your_api_key_here';

Open index.html in any browser – you're good to go!

##📦 Future Plans
🎭 Filter by genre (e.g., Anime, Cartoons, Dramas, etc.)

🗃 Tabs for different content types: Movies, Series, Documentaries

📊 Add trending and top-rated categories

📽 Trailer modals instead of redirecting to YouTube

🔐 User accounts & personalized watchlists

##🤝 Contributing
Pull requests are welcome! If you'd like to improve styling, features, or performance, feel free to fork and submit a PR.

##📄 License
This project is licensed under the MIT License.

##🙋‍♂️ Author
Made with ❤️ by Mayank Kumar Shah
🪪 Developer | UI Designer | Film Buff
📬 Feel free to connect and contribute!



