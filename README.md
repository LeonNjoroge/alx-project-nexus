# 🎬 Prescribed Movies – Movie & TV Show Browser  

## Overview  

**Prescribed Movies** is a modern web application for browsing, searching, and saving movies and TV shows using data from the [TMDB API](https://www.themoviedb.org/documentation/api).  
It features infinite scrolling, user authentication, and the ability to manage a favourites list.  

The app is part of the **ALX Project Nexus – ProDev Frontend Engineering** journey, showcasing practical application of **Next.js**, **TypeScript**, and UI best practices in a real-world project.  

---

## ✨ Features  

- 🔍 **Search** for movies and TV shows.  
- 🖼 **View details** including posters, ratings, genres, and recommendations.  
- 📜 **Infinite scrolling** for browsing large lists.  
- ❤️ **Favourite management** – add or remove movies and shows from your saved list.  
- 🔐 **User authentication** (Login, Logout).  
- 📱 **Responsive design** – works seamlessly on desktop and mobile.  

---

## 🛠 Tech Stack  

### Frontend  
- **Next.js** – Server-side rendering, routing, and API calls.  
- **TypeScript** – Strict typing for maintainability.  
- **TailwindCSS** – Utility-first styling.  

### APIs  
- **TMDB API** – Fetch movies, TV shows, and details.  

### State & Data Management  
- **React Hooks** – State and lifecycle management.  
- **Intersection Observer API** – Infinite scroll implementation.  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js 18+  
- TMDB API Read Access Token  

### Installation  

```bash
# Clone the repository
git clone https://github.com/LeonNjoroge/alx-project-nexus.git

# Navigate into the project folder
cd alx-project-nexus

# Install dependencies
npm install

# Create a .env.local file and add:
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_READ_TOKEN=your_tmdb_token

# Run the development server
npm run dev
```

---

## 📂 Project Structure  

```
src/
 ├─ components/      # Reusable UI components
 ├─ pages/           # Next.js pages (Home, Search, Saved, Profile, etc.)
 ├─ pages/api/       # TMDB API fetch functions
 ├─ interfaces/      # TypeScript interfaces
 ├─ styles/          # Global styles & Tailwind config
```

---

## ⚠️ Challenges & Solutions  

| Challenge | Solution |
|-----------|----------|
| Infinite scroll stopped after toggling between Movies and TV | Reset pagination state and observer when toggling content type |
| Styling consistency across pages | Adopted Tailwind design tokens & reusable card components |
| TMDB API rate limits | Added request throttling and caching for popular endpoints |

---

## ✅ Best Practices Applied  

- Built reusable **MovieCard** and **SearchBar** components.  
- Managed API pagination state for infinite scroll.  
- Used environment variables for API keys.  
- Applied responsive design patterns for all devices.  
- Implemented conditional rendering for login state.  

---

## 📌 Repository Info  

- **Repo Name**: `alx-project-nexus`  
- **License**: MIT  
- **Maintainer**: [Leon Njoroge](https://github.com/LeonNjoroge)  

---

© 2025 ALX – All rights reserved.  
