# Character Counter

**Character Counter** is a modern, client-side text analysis tool that provides real-time insights into written content.  
It analyzes characters, words, sentences, reading time, and letter frequency within a responsive, theme-aware interface.

This project was built as a **focused React practice project**, emphasizing clean component architecture, derived state, and thoughtful UI behavior.

---

## ✨ Features

- **Real-time text analysis**
  - Character count
  - Word count
  - Sentence count
- **Character limit control**
  - Enable or disable character limits
  - Visual warning when limits are exceeded
- **Flexible character counting**
  - Include or exclude spaces
- **Reading time estimation**
  - Based on average reading speed
- **Letter density visualization**
  - Frequency distribution (A–Z) with progress indicators
- **Theme support**
  - Light and dark modes
- **Responsive layout**
  - Optimized for mobile, tablet, and desktop screens
- **Accessible interactions**
  - Keyboard-friendly controls
  - Clear hover and focus states

---

## 🛠 Tech Stack

- **React**
- **Next.js (App Router)**
- **Tailwind CSS**
- **@radix-ui/react-progress** (accessible UI primitives)

---

## 🧠 Implementation Focus

The project was designed with the following principles:

- **Single source of truth** for text input
- **Derived state** via custom hooks for text statistics
- **Separation of concerns** between logic and presentation
- **Reusable, composable components**
- **Minimal dependencies** with accessible defaults

Core text analysis logic is encapsulated in a custom hook, allowing UI components to remain stateless and predictable.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
