# NexusFlow Engineering - Corporate Website

Professional corporate website for a custom software development company.

## Technology Stack
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Configuration & Customization

### 1. Company Information
All company details (name, email, phone, social links, etc.) are centralized in:
`src/data/company.ts`

Modify this single file to update branding across the entire application.

### 2. Colors & Branding
Theme colors are configured in `tailwind.config.js`. Update the `theme.extend.colors` object to match your brand palette.

### 3. Adding the Brochure
Place your company PDF brochure at:
`public/brochures/company-brochure.pdf`
The download buttons across the site will automatically link to this file.

### 4. Connecting the Inquiry Form to a Backend
Open `src/components/sections/ProjectInquiry.tsx`. Locate the `handleSubmit` function. Replace the simulated `setTimeout` with your actual API fetch request (e.g., to a serverless function, Formspree, or your custom backend).

## Folder Structure
- `/src/components/layout`: Navbar, Footer
- `/src/components/sections`: Individual page sections (Hero, About, Services, etc.)
- `/src/components/ui`: Reusable UI elements (Button, SectionHeading)
- `/src/data`: Centralized configuration
- `/src/utils`: Helper functions
- `/public/brochures`: Static assets like PDFs