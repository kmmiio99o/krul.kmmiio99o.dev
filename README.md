# [krul.kmmiio99o.dev](https://krul.kmmiio99o.dev)

A personal profile website for my girlfriend with customization of every corner of the website, Material UI design, and other.

## Features

- **Profile Page** — Display name, nickname, birthday, pronouns, and avatar
- **Dynamic Sections** — Built-in sections (likes, besties, anime, food, artists, athletes) plus custom sections you can add, rename, and remove
- **Admin Panel** — Full content and styling management with Polish UI
- **Cloud Sync** — Save and load data via Supabase
- **Customization** — Colors, layout, animations, navbar style, mobile dock mode
- **Responsive** — Works on desktop and mobile with adaptive navigation

## Tech Stack

- **React** + **TypeScript**
- **Vite** — Fast build tooling
- **Material UI** — Component library
- **Framer Motion** — Animations
- **Supabase** — Cloud storage

## Getting Started

### Prerequisites

- Node.js 22+
- bun or npm

### Installation

```bash
git clone https://github.com/kmmiio99o/krul.kmmiio99o.dev.git
cd krul.kmmiio99o.dev
bun install
cp .env.example .env
```

### Environment Variables

Edit `.env` with your credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_password
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Preview

```bash
bun run preview
```

## Project Structure

```
src/
├── components/
│   └── navbar/          # Navbar, MobileDock, MobileDropdown
├── context/
│   └── DataContext.tsx  # Global state management
├── data/
│   └── defaults.json    # Default site configuration
├── pages/
│   ├── Admin/
│   │   ├── components/  # ColorPicker, CustomSwitch, SaveBar, LoginForm
│   │   ├── tabs/        # ProfileTab, SectionsTab, AboutTab, AppearanceTab, NavbarTab, AnimationsTab
│   │   └── index.tsx    # Re-exports
│   ├── Admin.tsx        # Main admin page
│   ├── Home.tsx         # Home/profile page
│   └── About.tsx        # About page
├── utils/
│   ├── cloudSync.ts     # Supabase integration
│   └── storage.ts       # LocalStorage with encryption
├── App.tsx
├── main.tsx
└── theme.ts             # MUI theme configuration
```

## License

MIT
