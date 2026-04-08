# Wall Calendar

A sleek, interactive wall calendar that brings your desktop to life with dynamic theming and seasonal touches. Built to showcase modern React development with a focus on performance and user experience.

## Why This Project?

I wanted to create something that goes beyond a basic calendar app. Instead of static layouts, this calendar adapts its entire color scheme based on beautiful monthly imagery. The seasonal particle effects add that extra layer of polish, making it feel alive and responsive to the time of year. It's a demonstration of how thoughtful UI/UX can elevate even simple applications.

## Tech Stack & Choices

**React + Vite**: Chose React for its component-based architecture, perfect for building reusable calendar elements. Vite provides lightning-fast development with hot module replacement – no more waiting for builds.

**CSS Modules**: Scoped styling prevents conflicts and keeps components self-contained. The dynamic theming system uses CSS custom properties that update in real-time based on image analysis.

**Canvas API**: For extracting dominant colors from background images, creating a truly adaptive theme system. This was a fun challenge to implement and results in nice themes when colors shift as you navigate months.

**LocalStorage**: Simple, reliable persistence for notes without needing a backend. Keeps the app self-contained and fast.

## Features

### Smart Theming
- Analyzes each month's hero image to generate complementary color palettes
- **Upload custom images** to instantly see theme adaptation
- Instant theme switching as you browse months
- Automatic dark mode adaptation

### Note Taking
- Click and drag to select date ranges
- Notes persist across sessions
- Clean, readable interface that works in any theme

### Responsive Design
- Works beautifully on desktop and mobile
- Touch-friendly interactions
- Consistent layout across devices

## Quick Start

```bash
# Clone and enter the project
git clone <your-repo-url>
cd wall-calendar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` and start exploring. The calendar begins in January – try navigating through the months to see the themes change!

**Pro Tip**: Click the "📷 Add Image" button in the top-right to upload your own photos and watch the calendar theme adapt in real-time!

## Build for Production

```bash
npm run build
npm run preview
```

## What Makes This Special?

This isn't just another calendar app. The dynamic theming creates a unique experience where the interface feels like an extension of the seasonal imagery. The particle effects add personality without overwhelming the user. Every interaction is smooth, every transition polished – the kind of attention to detail that makes apps memorable.

Built with modern web standards, optimized for performance, and designed to impress. Perfect for showcasing frontend skills in a portfolio or interview setting.
