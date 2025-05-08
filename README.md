# Welcome to Stocker!

A web app for "tracking" the stock market.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

Create a .env file in the root directory and store your secrets there

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t stocker .

# Run the container
docker run -p 3000:3000 stocker
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

### TODO
- [ ] Add date range selector to dashboard
- [ ] Hydrate application with list of tickers, limit to 1000
- [ ] Add candlestick chart for more insight into a ticker
- [ ] Add permalink share button charts
- [ ] Add account creation
