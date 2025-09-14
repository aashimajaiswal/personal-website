# Personal Website - Aashima Jaiswal

A modern, responsive personal portfolio website showcasing AI/ML engineering experience, projects, and skills. Built with vanilla HTML, CSS, and JavaScript using a modular architecture for easy maintenance and future automation.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Modular Architecture**: Organized codebase for easy maintenance and scalability
- **Interactive Elements**: Scroll spy navigation, contextual scroll button, fun interactions
- **Performance Optimized**: Efficient loading with proper font display and CSS organization

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Cinzel (headings), LibreBaskerville (body text)
- **Architecture**: Modular CSS and JavaScript
- **Deployment**: Static site ready for any hosting platform

## 📁 Project Structure

```
personal-website/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── base.css          # Fonts, variables, reset styles
│   │   ├── layout.css        # Container, sidebar, main layout
│   │   ├── components.css    # Buttons, navigation, profile components
│   │   ├── animations.css    # All keyframe animations
│   │   ├── responsive.css    # Media queries for all screen sizes
│   │   └── sections/         # Individual section styles
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── skills.css
│   │       ├── experience.css
│   │       ├── projects.css
│   │       ├── blog.css
│   │       └── contact.css
│   ├── js/
│   │   ├── main.js           # Entry point, initializes all modules
│   │   └── modules/
│   │       ├── navigation.js # Smooth scrolling, scroll spy
│   │       └── interactions.js # Interactive elements
│   ├── images/               # Profile photos, icons, graphics
│   ├── fonts/               # Custom font files
│   └── docs/                # Resume and documents
├── partials/                # HTML partials for future use
│   ├── sidebar.html
│   └── sections/
└── README.md
```

## 🎯 Key Sections

1. **Hero Section**: Introduction with name, title, and CTA buttons
2. **About Section**: Personal background and experience summary
3. **Skills Section**: Technical skills organized in interactive cards
4. **Experience Section**: Professional work history with detailed descriptions
5. **Projects Section**: Portfolio projects with descriptions and links
6. **Blog Section**: Blog posts and articles
7. **Contact Section**: Contact information and resume download


## 🎨 Design System

### Colors
- **Primary Green**: `#738561` (headings, accents)
- **Primary Cream**: `#f6eedf` (background, cards)
- **Text Dark**: `#333` (body text)
- **Text Light**: `#999` (secondary text)

### Typography
- **Headings**: Cinzel (serif, bold)
- **Body**: LibreBaskerville (serif, regular)
- **Navigation**: Cinzel (serif, bold, uppercase)

### Layout
- **Fixed Sidebar**: 380px width (320px on tablet)
- **Responsive Breakpoints**: 768px (mobile), 1024px (tablet)
- **Grid System**: CSS Grid for skills and blog sections

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. **Open locally**
   - Simply open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

3. **Customize**
   - Update content in `index.html`
   - Modify styles in respective CSS files
   - Add your own images to `assets/images/`
   - Replace resume in `assets/docs/`

## 📱 Responsive Design

- **Desktop** (1025px+): Full sidebar with 6-column skills grid
- **Tablet** (769px-1024px): Compact sidebar with 2-column skills grid
- **Mobile** (≤768px): Horizontal navigation with single-column layout

## 🔧 Customization Guide

### Adding New Sections
1. Create CSS file in `assets/css/sections/`
2. Add HTML content to `index.html`
3. Reference CSS file in `index.html` head
4. Update navigation in sidebar

### Modifying Colors
Update CSS variables in `assets/css/base.css`:
```css
:root {
    --primary-green: #738561;
    --primary-cream: #f6eedf;
    /* ... other variables */
}
```

## 📈 Future Enhancements

- [ ] Add dark mode toggle
- [ ] Implement contact form functionality
- [ ] Add Google Analytics integration
- [ ] Create blog content management system
- [ ] Add project filtering and search

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
