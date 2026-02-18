# Ambalavanan | Developer Portfolio

A modern, responsive, and interactive developer portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases my skills, projects, and professional background with a clean and polished user experience.

## 🚀 Features

- **Modern UI/UX**: Clean design with a focus on readability and user engagement.
- **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop devices.
- **Smooth Animations**: Integrated `FadeIn` animations and micro-interactions for a dynamic feel.
- **Interactive Elements**: Hover effects, smooth scrolling, and image zoom functionalities.
- **Optimization**: Fast loading times and optimized assets.

## 📂 Page Features Breakdown

### 1. Header (`Header.tsx`)
- **Responsive Navigation**: 
  - **Desktop**: Horizontal navigation bar with links to sections.
  - **Mobile**: Hamburger menu triggers a slide-out drawer with backdrop blur.
- **Scroll Effect**: The header background becomes transparent at the top and blurs with a glassmorphism effect upon scrolling.
- **Active States**: Hover effects on links and a prominent "Let's Talk" CTA button.

### 2. Hero Section (`Hero.tsx`)
- **Dynamic Introduction**: Animated text introducing me and my role.
- **Call to Action**: Two primary buttons ("View Projects" and "Download Resume") with distinct styles.
- **Social Links**: Quick access to GitHub, LinkedIn, and Instagram profiles.
- **Visuals**: Profile image with a 3D-like hover effect and background decorative blurs.

### 3. About Section (`About.tsx`)
- **Animated visuals**: Floating 3D-style icons and badges (e.g., "Open to opportunities").
- **Bio Content**: Concise description of my background and core competencies.
- **Navigation**: Direct link to the Contact section.

### 4. Skills Section (`Skills.tsx`)
- **Categorized Display**: Skills are grouped into:
  - Programming Languages
  - Web Technologies
  - Tools & Platforms
  - Core Concepts
- **Visual Indicators**: Each skill features an icon (FontAwesome/DevIcon) and a progress bar indicating proficiency level.
- **Interactive Cards**: Hovering over a category card elevates it for visual feedback.

### 5. Projects Section (`Projects.tsx`)
- **Filtering System**: Filter projects by technology tags (e.g., "React", "Blockchain", "All").
- **Project Cards**:
  - **Hover Effects**: scale-up animation and reveal of a "Zoom View" option.
  - **Info**: Displays Title, Description, and Tech Stack badges.
  - **Action Links**: Direct links to "Code" (GitHub) and "Live" demo.
- **Image Modal**: Clicking a project image opens a full-screen modal to view the project screenshot in high detail.

### 6. Contact Section (`Contact.tsx`)
- **Dual Layout**:
  - **Info Panel**: Stylish background image with contact details (Phone, Email) and social links.
  - **Contact Form**: Functional form for getting in touch.
- **Form Validation**: Client-side validation for required fields and email format.
- **Formspree Integration**: Configured to send emails directly via Formspree API.
- **Feedback**: Loading states and success/error messages after submission.

### 7. Footer (`Footer.tsx`)
- **Simple & Clean**: Copyright information and quick links to sections.
- **Social Repeat**: Another set of social media links for convenience at the bottom of the page.

## 🛠 Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (v18+)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: 
  - [FontAwesome](https://fontawesome.com/)
  - [Devicon](https://devicon.dev/)
- **Fonts**: Inter & Lexend (via Google Fonts)

## 🏃‍♂️ Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📝 Configuration

- **Personal Details**: Update `constants.ts` to change the portfolio content (Links, Projects, Skills, etc.).
- **Form Endpoint**: Update `FORMSPREE_URL` in `constants.ts` with your own Formspree ID.

---

&copy; Ambalavanan 2026
