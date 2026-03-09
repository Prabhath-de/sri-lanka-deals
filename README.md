# 🏷️ DealFinder LK

**Sri Lanka's #1 Deal Discovery Platform** — Find daily promotions, exclusive discounts, and the best deals from top brands across Sri Lanka.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

- 🔥 **Hero Deal Carousel** — Auto-scrolling banner showcasing featured deals
- 🎯 **Today's Best Deals** — Curated top discounts updated daily
- 🗂️ **Category Browsing** — Filter deals by Food, Restaurants, Hotels, Fashion, Electronics, Travel & Supermarkets
- 🔍 **Smart Search** — Search deals by name, brand, or category
- 📤 **Social Sharing** — Share deals via WhatsApp, Facebook, or copy link
- 🌙 **Dark / Light / System Mode** — Full theme support
- 🔐 **Admin Dashboard** — Manage deals, approve submissions, feature deals
- 👤 **User Authentication** — Sign up, sign in, role-based access control
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- 📝 **Deal Submission** — Users can submit deals for admin review

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui, Framer Motion |
| **Backend** | Lovable Cloud |
| **Database** | PostgreSQL with Row Level Security |
| **Auth** | Email/password with role-based access |
| **State** | TanStack React Query |
| **Routing** | React Router v6 |

## 📁 Project Structure

```
src/
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui base components
│   ├── Navbar.tsx         # Navigation with auth & theme toggle
│   ├── HeroSection.tsx    # Hero banner with search
│   ├── HeroCarousel.tsx   # Featured deals carousel
│   ├── TodayBestDeals.tsx # Today's top deals section
│   ├── CategoryGrid.tsx   # Category browsing grid
│   ├── DealCard.tsx       # Deal card with sharing
│   ├── Footer.tsx         # Footer with social & app links
│   └── ...
├── pages/                 # Route pages
│   ├── Index.tsx          # Homepage
│   ├── DealsPage.tsx      # All deals with filters
│   ├── CategoriesPage.tsx # Category listing
│   ├── AuthPage.tsx       # Login & signup
│   ├── AdminPage.tsx      # Admin dashboard
│   └── SubmitDealPage.tsx # Deal submission form
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & API layer
└── integrations/          # Backend integration (auto-generated)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dealfinder-lk

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 Admin Access

The admin dashboard is accessible at `/admin` (login via `/auth`). Admins can:

- ✅ Approve or reject submitted deals
- ⭐ Feature deals on the homepage carousel
- ✏️ Edit deal details
- 🗑️ Delete deals

## 🎨 Design System

- **Fonts**: Space Grotesk (headings) + DM Sans (body)
- **Primary**: Teal `hsl(174, 62%, 32%)`
- **Secondary**: Gold `hsl(38, 92%, 55%)`
- **Style**: Glassmorphism cards, gradient heroes, full dark mode

## 📄 Disclaimer

All product names, trademarks, and registered trademarks are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.

## 📜 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ in Sri Lanka using [Lovable](https://lovable.dev)
