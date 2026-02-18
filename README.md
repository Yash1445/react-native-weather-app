# 🌤️ React Native Weather App

A modern **cross-platform Weather Forecast App** built with **React Native (Expo) + TypeScript + Redux Toolkit**.
Supports **iOS, Android, and Web**, featuring autosuggest search, caching, forecasts, and production-style architecture.

---

## 🚀 Features

* City search with autosuggest (debounced)
* Real-time weather display
* 3–7 day forecast
* Hourly forecast detail screen
* Dynamic weather gradients
* Redux Toolkit state management
* AsyncStorage caching (offline-friendly)
* Web export support (Vercel-ready)
* Works on iOS & Android (Expo Go)
* Unit tests (Redux slice + selectors)
* Modular enterprise-style folder structure

---

## Tech Stack

* **Expo SDK 54**
* **React Native + TypeScript**
* **Redux Toolkit**
* **Expo Router**
* **Axios**
* **AsyncStorage**
* **WeatherAPI.com**

---

## Project Structure

```
React Native Developer Assignment Weather App/
├─ app/                      # Expo Router entry (routing layer)
│  ├─ _layout.tsx
│  ├─ +not-found.tsx
│  └─ index.tsx
│
├─ src/                      # Main application logic
│  ├─ app/
│  │  ├─ AppRoot.tsx
│  │  ├─ navigation.tsx
│  │  └─ store.ts
│  │
│  ├─ components/
│  │  ├─ ui/                # Shared UI components
│  │  └─ weather/           # Weather-specific UI
│  │
│  ├─ features/weather/     # Redux slice + thunks + tests
│  ├─ screens/              # App screens
│  ├─ services/             # API layer
│  ├─ hooks/                # Custom hooks
│  ├─ utils/                # Helpers + caching
│  ├─ constants/            # Theme/constants
│  └─ types/                # TypeScript models
│
├─ assets/
├─ docs/screenshots/        # Placeholder for README images
├─ App.tsx
├─ app.json
├─ babel.config.js
├─ package.json
└─ tsconfig.json
```

---

## Setup Instructions

### 1️. Install dependencies

```bash
npm install
```

---

### 2️. Run on Mobile (Recommended)

```bash
npx expo start
```

Then scan QR using **Expo Go**:

* iPhone
* Android

---

### Run on Web

```bash
npx expo start --web
```

---

### Export Production Web Build

```bash
npx expo export --platform web
```

Output folder:

```
dist/
```

Deploy `dist` to:

* Vercel
* Netlify
* GitHub Pages

---

## API Configuration

Uses **WeatherAPI.com**

Edit API key inside:

```
src/services/weatherApi.ts
```

Example:

```ts
const API_KEY = "YOUR_API_KEY";
```

---

## Testing

Run tests:

```bash
npm test
```

Includes:

* Redux selectors tests
* Weather slice tests

---

## Platform Support

| Platform          | Status      |
| ----------------- | ----------- |
| iOS (Expo Go)     | ✅ Working   |
| Android (Expo Go) | ✅ Working   |
| Web               | ✅ Supported |
| Vercel Deployment | ✅ Ready     |

---

## Deployment

### Vercel (Web)

Build command:

```
npx expo export --platform web
```

Output directory:

```
dist
```

Add SPA routing config:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

---

## Highlights

* Expo Router architecture
* Typed Redux hooks
* Debounced autosuggest search
* Persistent caching middleware
* Mobile + Web unified codebase
* Clean modular structure

---

## Author

**Yash Gandas**

GitHub:
https://github.com/Yash1445

---

