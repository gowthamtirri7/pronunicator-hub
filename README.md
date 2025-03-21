
# English Pronunciation Quiz Application

A web application designed to help users practice English pronunciation by distinguishing between 'L' and 'R' sounds through an interactive swipe-based quiz.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Editing Content](#editing-content)
  - [Customizing Quiz Questions](#customizing-quiz-questions)
  - [Changing Images](#changing-images)
  - [Modifying Text Content](#modifying-text-content)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

You need to have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)

### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

3. To build for production:
   ```bash
   npm run build
   ```

4. To preview the production build:
   ```bash
   npm run preview
   ```

## Editing Content

### Customizing Quiz Questions

The quiz questions are stored in `src/data/quizData.ts`. Each question has the following structure:

```typescript
{
  id: number,        // Unique identifier for the question
  word: string,      // The word to be tested
  hasL: boolean,     // Whether the word contains the 'L' sound
  hasR: boolean,     // Whether the word contains the 'R' sound
  explanation: string // Explanation of the pronunciation
}
```

To edit or add questions:

1. Open `src/data/quizData.ts`
2. Modify the existing questions or add new ones following the same structure
3. Ensure each question has a unique ID
4. Save the file and the changes will be applied automatically when the app is running in development mode

Example of adding a new question:

```typescript
{
  id: 51, // Make sure this is a unique ID
  word: "Lovely",
  hasL: true,
  hasR: false,
  explanation: "Lovely has the L sound. The tongue touches the ridge behind your upper teeth for the 'l' sound."
}
```

### Changing Images

#### Quiz Card Images

Quiz card images are randomly selected from a predefined list in `src/components/ui/QuizCard.tsx`. To change these:

1. Open `src/components/ui/QuizCard.tsx`
2. Find the `placeholderImages` array at the top of the file
3. Replace the image IDs with your own Unsplash IDs or use a different image service
4. Save the file

```typescript
const placeholderImages = [
  'your-new-unsplash-id-1',
  'your-new-unsplash-id-2',
  // Add more as needed
];
```

#### Hero Section Video

To change the background video in the hero section:

1. Add your new video file to the `public` directory
2. Open `src/components/sections/HeroSection.tsx`
3. Update the `videoSrc` prop in the `VideoBackground` component

### Modifying Text Content

#### Home Page Content

To edit the text on the home page:

1. Navigate to `src/pages/Index.tsx` and the component files in `src/components/sections/`
2. Edit the text content within these files
3. Save changes

Important section files:
- `src/components/sections/HeroSection.tsx` - Hero banner content
- `src/components/sections/AboutSection.tsx` - About section content
- `src/components/sections/BookSection.tsx` - Book recommendation section
- `src/components/sections/EmailSignup.tsx` - Email signup form

#### Quiz Page

To modify quiz instructions and text:

1. Open `src/components/sections/PronunciationQuiz.tsx`
2. Edit the text in the JSX elements
3. For customizing feedback messages, modify the feedback logic in both `PronunciationQuiz.tsx` and `QuizCard.tsx`

## Project Structure

```
src/
├── components/         # UI components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── sections/       # Page sections (HeroSection, PronunciationQuiz)
│   └── ui/             # UI elements (buttons, cards, etc.)
├── data/               # Data files including quiz questions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Quiz.tsx        # Quiz page
│   └── NotFound.tsx    # 404 page
└── App.tsx             # Main application component with routing
```

## Deployment

This application can be deployed on any static hosting service that supports React applications.
