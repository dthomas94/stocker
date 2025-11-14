# Stocker — Stock Market Tracking Dashboard
*A fast, modern React + TypeScript dashboard for exploring real-time and historical stock data.*

> Stocker is a data-driven UI built with **Vite**, **React**, and the **Polygon.io API**, designed for fast local development and cloud-ready deployment via Docker. It includes ticker search, quote hydration, basic charts, and a clear foundation for expansion into richer analytics and UI interactions.

---

## 🚀 Features

- **Fast Vite-powered React app** with instant hot reload  
- **Real-time stock data** via Polygon.io REST endpoints  
- **Ticker search & detail pages** using React Router  
- **TypeScript throughout** for safe, maintainable code  
- **Containerized with Docker** for portable deployment  
- Clean, extensible structure for adding:
  - Candlestick charts  
  - Date-range selectors  
  - Watchlists  
  - Favorites  
  - Portfolio/position tracking  
  - More complex analytics  

---

## 🏛️ Architecture Overview

Stocker uses a clean, modular structure to keep UI, API, and state layers separated and easy to evolve.

```text
/src
  /components        → UI components (tickers, charts, layout)
  /pages             → Route-driven views (Dashboard, Ticker Details)
  /lib
    polygonClient.ts → Centralized API client + typed responses
    types.ts         → Strongly-typed Polygon interfaces
  /hooks             → Reusable hooks for fetching + async state
  /styles            → Global styles, theme tokens
```

### Key architectural decisions

**1. Strong API boundary**  
All Polygon requests flow through a dedicated `polygonClient.ts` module. This makes it easy to swap providers, mock requests for testing, or introduce caching.

**2. Routing as product surface**  
React Router handles navigation with deep-linkable URLs like:

```text
/ticker/AAPL?range=6M
```

This enables easy sharing, bookmarking, and future analytics filters.

**3. Async state management pattern**  
Components use a predictable async state shape:

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

This keeps loading, error, and success rendering clean and consistent.

**4. Containerized deployment**  
A production-ready Dockerfile builds and serves the final Vite bundle.

---

## 🛠️ Setup & Development

### Requirements
- Node.js 18+
- Polygon.io API key (`VITE_POLY_API_KEY`)
- npm or pnpm

### 1. Install dependencies

```sh
npm install
# or
pnpm install
```

### 2. Create environment file

Create a `.env` file at the project root:

```text
VITE_POLY_API_KEY=your_api_key_here
```

### 3. Start development server

```sh
npm run dev
```

### 4. Build for production

```sh
npm run build
```

### 5. Preview production build

```sh
npm run preview
```

---

## 🐳 Docker Deployment

Build and run the production image locally:

```sh
docker build -t stocker .
docker run -p 8080:80 stocker
```

Visit:

```text
http://localhost:8080
```

---

## 🗺️ Roadmap

### Planned enhancements
- [ ] Date-range selector (1D / 1M / 6M / 1Y)  
- [ ] Candlestick chart with real OHLC data  
- [ ] Searchable ticker directory (up to 1000 symbols)  
- [ ] Quick stats: day change %, 52-week high/low, volume  
- [ ] Persistent watchlist / favorites  
- [ ] Live demo deployment (Railway, Fly.io, or Render)  
- [ ] Expanded README screenshots + demo video  

### Longer-term ideas
- [ ] WebSockets for live streaming  
- [ ] User accounts 
- [ ] Portfolio tracking and alerts  

---

## 📄 License

MIT License — free to use, modify, and distribute.
