# 🍬 SoundCandy

**The candy store for your ears.**

SoundCandy is a premium sound effects marketplace built with React, TypeScript, Vite, and Tailwind CSS. Designed for creative professionals to browse, purchase, and download high-quality sound effects.

![SoundCandy](https://img.shields.io/badge/SoundCandy-v1.0.0-ff1493?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PC9zdmc+)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06b6d4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?style=for-the-badge&logo=vite)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Admin Configuration](#-admin-configuration)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🛍️ Marketplace
- **Sound Effects Library** — Browse and purchase premium sound effects
- **11 Sound Categories** — Ambiences, Animals, Cinematic, Comedy & Toons, Cars, Destruction, Foley, Human, Nature, Technology, Transportation
- **Search & Filter** — Find sounds by name, category, or keyword
- **Shopping Cart** — Add items, adjust quantities, and checkout securely

### 🔐 Authentication & Security
- **Email Authentication** — Secure sign-up and sign-in with email/password
- **Role-Based Access** — Admin vs. regular user permissions
- **Session Management** — Auto-logout after 30 minutes of inactivity
- **CSRF Protection** — Token-based form security
- **Input Sanitization** — XSS protection on all user inputs
- **Cookie Consent** — GDPR-compliant cookie preferences (Essential, Analytics, Marketing)
- **SSL Encryption Indicators** — Security badges throughout checkout

### 👤 User Roles

| Feature | Admin | Regular User |
|---------|-------|-------------|
| Browse Sound Effects | ✅ | ✅ |
| Purchase Sound Effects | ✅ | ✅ |
| Upload Audio Files | ✅ | ❌ |
| Upload Image Files | ✅ | ❌ |
| Create Blog Posts | ✅ | ❌ |
| System Configuration | ✅ | ❌ |
| View Admin Dashboard | ✅ | ❌ |
| Manage Users | ✅ | ❌ |

### 📝 Blog
- **9 Categories** — Credit, Equipment, Free, New Release, News, Review, Testimonials, Tutorials
- **Search Functionality** — Filter posts by title or category
- **Image Upload** — Attach images to blog posts (admin only, up to 50 GB)
- **Rich Content** — Full blog post creation with title, category, content, and images

### 📦 Upload System (Admin Only)
- **Audio Upload** — Drag-and-drop zone for audio files (WAV, MP3, FLAC, AAC, OGG, AIFF, WMA, M4A, OPUS)
- **Image Upload** — Separate drag-and-drop zone for images (JPEG, PNG, GIF, BMP, SVG, WebP, TIFF, ICO, HEIC, HEIF)
- **50 GB Upload Limit** — Support for large professional audio files
- **File Validation** — Format and size checking before upload

### ⚙️ Admin System Configuration
- **Dashboard** — Overview of products, users, orders, and revenue
- **User Management** — View, search, and manage registered users
- **Product Management** — Edit, search, and delete sound effects
- **Blog Management** — Edit, search, and delete blog posts
- **Testimonial Management** — Review and moderate user testimonials
- **Order Management** — Track orders, change status (Completed/Pending/Refunded)
- **Site Settings** — Configure site name, tagline, currency, upload limits, and more
- **Danger Zone** — Clear data or reset settings with confirmation

### 🎨 UI/UX
- **Dark Theme** — Professional dark interface with neon pink/purple accents
- **Smooth Animations** — Page transitions, hover effects, and micro-interactions via Framer Motion
- **Login Animation** — Custom animated sequence showing a face biting candy with sound waves
- **Responsive Design** — Fully responsive for mobile, tablet, and desktop
- **Glass-morphism Effects** — Modern frosted glass design elements

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev/) | 19.2 | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type Safety |
| [Vite](https://vite.dev/) | 7.2 | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-First CSS |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animations |
| [React Router](https://reactrouter.com/) | 7.x | Client-Side Routing |
| [Lucide React](https://lucide.dev/) | 0.564 | Icon Library |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/soundcandy.git
   cd soundcandy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
soundcandy/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Main layout (header, footer, nav)
│   │   ├── AuthModal.tsx    # Sign-in/Sign-up modal
│   │   └── LoginAnimation.tsx # Animated login sequence
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Landing page
│   │   ├── Products.tsx     # Sound effects marketplace
│   │   ├── Blog.tsx         # Blog with categories
│   │   ├── Credits.tsx      # Track record & testimonials
│   │   ├── Support.tsx      # FAQ, tutorials, contact
│   │   ├── Cart.tsx         # Shopping cart & checkout
│   │   ├── Upload.tsx       # Admin upload page
│   │   ├── About.tsx        # About SoundCandy
│   │   └── AdminSettings.tsx # System configuration
│   ├── store/               # State management
│   │   ├── AuthContext.tsx   # Authentication state
│   │   ├── CartContext.tsx   # Shopping cart state
│   │   └── DataContext.tsx   # Products, blog, orders data
│   ├── utils/
│   │   └── cn.ts            # Tailwind class merge utility
│   ├── App.tsx              # Root component with routes
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── .gitignore               # Git ignore rules
├── .env.example             # Environment variable template
├── LICENSE                  # MIT License
└── README.md                # This file
```

---

## 🗺️ Pages & Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/` | Home | Public | Landing page with hero, features, and getting started |
| `/products` | Products | Public | Sound effects library with categories and search |
| `/blog` | Blog | Public | Blog posts with categories and search |
| `/credits` | Credits | Public | Track record, clients, and testimonials |
| `/support` | Support | Public | FAQ, tutorials, contact form, and terms |
| `/cart` | Cart | Authenticated | Shopping cart and secure checkout |
| `/about` | About | Public | About SoundCandy and mission |
| `/upload` | Upload | Admin Only | Upload audio and image files |
| `/admin` | Admin Settings | Admin Only | System configuration dashboard |

---

## 🔑 Admin Configuration

### Default Admin Account

The default administrator account is configured in `src/store/AuthContext.tsx`:

- **Email:** `matthewcalabresecareers@gmail.com`
- **Password:** `Wehttam06$$`

> ⚠️ **Security Note:** For production deployments, change the default admin credentials and implement a proper backend authentication system with hashed passwords.

### Admin Capabilities

1. **Upload** audio files (any format, up to 50 GB)
2. **Upload** image files (any format, up to 50 GB)
3. **Create/Edit/Delete** blog posts with image attachments
4. **Manage** all users (view, search, delete)
5. **Manage** all products (edit, delete)
6. **Manage** all orders (view, change status)
7. **Manage** testimonials (view, delete)
8. **Configure** site settings (name, currency, upload limits)
9. **Access** the admin dashboard with analytics

---

## 🔒 Security Features

| Feature | Description |
|---------|-------------|
| **Email Authentication** | Secure sign-up/sign-in with validation |
| **Role-Based Access Control** | Admin vs. user permissions enforced on all routes |
| **Session Management** | Unique session IDs with auto-logout after inactivity |
| **CSRF Tokens** | Cryptographic tokens for form submissions |
| **Input Sanitization** | XSS protection stripping HTML/script tags |
| **Cookie Consent** | GDPR-compliant banner with granular preferences |
| **SSL Indicators** | Security badges on checkout pages |
| **PCI Compliance Badges** | Trust indicators for payment processing |
| **Auto-Logout** | 30-minute inactivity timeout |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

### Netlify

1. Push your code to GitHub
2. Connect to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t soundcandy .
docker run -p 8080:80 soundcandy
```

### Custom Domain

To use `SoundCandy.com`:
1. Purchase the domain from a registrar (GoDaddy, Namecheap, etc.)
2. Configure DNS to point to your hosting provider
3. Set up the custom domain in your hosting dashboard
4. Enable HTTPS/SSL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling (no inline styles)
- Add Framer Motion animations for new interactive elements
- Ensure responsive design for all screen sizes
- Test admin and regular user flows

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Matthew Calabrese**
- Website: [SoundCandy.com](https://soundcandy.com)
- Email: matthewcalabresecareers@gmail.com

---

<p align="center">
  🍬 <strong>SoundCandy</strong> — Some things are better unwrapped.
</p>
