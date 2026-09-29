# Food Product Explorer

A responsive food product explorer built with React, TypeScript, and Vite. The application allows users to browse, search, filter, and view detailed information about food and grocery products using the DummyJSON API.

## Features

- Browse food and grocery products
- Search products by name, description, category, or brand
- Filter products by category
- Filter products by minimum rating
- View detailed product information
- Responsive design for desktop and mobile
- Loading states
- Error handling with retry option
- Empty search/filter state
- Client-side routing with React Router
- API integration with DummyJSON

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- CSS
- DummyJSON API

## API

This project uses the DummyJSON Products API:

https://dummyjson.com/products

## Project Structure

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── SearchBar.tsx
│   ├── FilterBar.tsx
│   ├── Loading.tsx
│   ├── ErrorMessage.tsx
│   └── EmptyState.tsx
├── hooks/
│   └── useProducts.ts
├── pages/
│   ├── Home.tsx
│   └── ProductDetails.tsx
├── services/
│   └── productApi.ts
├── types/
│   └── product.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
