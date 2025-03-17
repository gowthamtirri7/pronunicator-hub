
export interface QuizQuestion {
  id: number;
  word: string;
  hasL: boolean;
  hasR: boolean;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    word: "Light",
    hasL: true,
    hasR: false,
    explanation: "Light has the L sound at the beginning. It's pronounced with the tip of your tongue touching the ridge behind your upper teeth."
  },
  {
    id: 2,
    word: "Right",
    hasL: false,
    hasR: true,
    explanation: "Right has the R sound at the beginning. It's pronounced with the tongue pulled slightly back without touching the roof of the mouth."
  },
  {
    id: 3,
    word: "Collect",
    hasL: true,
    hasR: false,
    explanation: "Collect has the L sound. Notice how your tongue touches the ridge behind your upper teeth when pronouncing the 'l'."
  },
  {
    id: 4,
    word: "Correct",
    hasL: false,
    hasR: true,
    explanation: "Correct has the R sound. Your tongue should be slightly curled back without touching the roof of your mouth."
  },
  {
    id: 5,
    word: "Glass",
    hasL: true,
    hasR: false,
    explanation: "Glass has the L sound in a consonant cluster 'gl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 6,
    word: "Grass",
    hasL: false,
    hasR: true,
    explanation: "Grass has the R sound in a consonant cluster 'gr'. The tongue is pulled back without touching the roof of the mouth."
  },
  {
    id: 7,
    word: "Flaw",
    hasL: true,
    hasR: false,
    explanation: "Flaw has the L sound in a consonant cluster 'fl'. The tongue position is forward, touching the ridge."
  },
  {
    id: 8,
    word: "Draw",
    hasL: false,
    hasR: true,
    explanation: "Draw has the R sound in a consonant cluster 'dr'. The tongue position is pulled back."
  },
  {
    id: 9,
    word: "Blue",
    hasL: true,
    hasR: false,
    explanation: "Blue has the L sound in a consonant cluster 'bl'. The tongue touches the ridge for a clear 'l' sound."
  },
  {
    id: 10,
    word: "Brew",
    hasL: false,
    hasR: true,
    explanation: "Brew has the R sound in a consonant cluster 'br'. The tongue is slightly curled back for the 'r' sound."
  },
  {
    id: 11,
    word: "Clone",
    hasL: true,
    hasR: false,
    explanation: "Clone has the L sound in a consonant cluster 'cl'. The 'l' requires the tongue to touch the ridge."
  },
  {
    id: 12,
    word: "Crane",
    hasL: false,
    hasR: true,
    explanation: "Crane has the R sound in a consonant cluster 'cr'. The 'r' requires the tongue to be pulled back slightly."
  },
  {
    id: 13,
    word: "Play",
    hasL: true,
    hasR: false,
    explanation: "Play has the L sound in a consonant cluster 'pl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 14,
    word: "Pray",
    hasL: false,
    hasR: true,
    explanation: "Pray has the R sound in a consonant cluster 'pr'. The tongue position is pulled back for the 'r' sound."
  },
  {
    id: 15,
    word: "Glow",
    hasL: true,
    hasR: false,
    explanation: "Glow has the L sound in a consonant cluster 'gl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 16,
    word: "Grow",
    hasL: false,
    hasR: true,
    explanation: "Grow has the R sound in a consonant cluster 'gr'. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 17,
    word: "Fly",
    hasL: true,
    hasR: false,
    explanation: "Fly has the L sound in a consonant cluster 'fl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 18,
    word: "Fry",
    hasL: false,
    hasR: true,
    explanation: "Fry has the R sound in a consonant cluster 'fr'. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 19,
    word: "Clue",
    hasL: true,
    hasR: false,
    explanation: "Clue has the L sound in a consonant cluster 'cl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 20,
    word: "Crew",
    hasL: false,
    hasR: true,
    explanation: "Crew has the R sound in a consonant cluster 'cr'. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 21,
    word: "Flash",
    hasL: true,
    hasR: false,
    explanation: "Flash has the L sound in a consonant cluster 'fl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 22,
    word: "Fresh",
    hasL: false,
    hasR: true,
    explanation: "Fresh has the R sound in a consonant cluster 'fr'. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 23,
    word: "Blame",
    hasL: true,
    hasR: false,
    explanation: "Blame has the L sound in a consonant cluster 'bl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 24,
    word: "Frame",
    hasL: false,
    hasR: true,
    explanation: "Frame has the R sound in a consonant cluster 'fr'. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 25,
    word: "Splash",
    hasL: true,
    hasR: false,
    explanation: "Splash has the L sound in a consonant cluster 'pl'. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 26,
    word: "Spring",
    hasL: false,
    hasR: true,
    explanation: "Spring has the R sound in a consonant cluster 'pr'. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 27,
    word: "Pool",
    hasL: true,
    hasR: false,
    explanation: "Pool ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 28,
    word: "Poor",
    hasL: false,
    hasR: true,
    explanation: "Poor ends with the R sound. The tongue is pulled back without touching the roof of the mouth."
  },
  {
    id: 29,
    word: "Loyal",
    hasL: true,
    hasR: false,
    explanation: "Loyal has the L sound twice. The tongue touches the ridge for both 'l' sounds."
  },
  {
    id: 30,
    word: "Rural",
    hasL: true,
    hasR: true,
    explanation: "Rural has both L and R sounds. The 'r' sounds require the tongue to be pulled back, while the 'l' sound requires the tongue to touch the ridge."
  },
  {
    id: 31,
    word: "Mile",
    hasL: true,
    hasR: false,
    explanation: "Mile ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 32,
    word: "Mire",
    hasL: false,
    hasR: true,
    explanation: "Mire ends with the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 33,
    word: "Fool",
    hasL: true,
    hasR: false,
    explanation: "Fool ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 34,
    word: "Four",
    hasL: false,
    hasR: true,
    explanation: "Four ends with the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 35,
    word: "Toll",
    hasL: true,
    hasR: false,
    explanation: "Toll ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 36,
    word: "Tore",
    hasL: false,
    hasR: true,
    explanation: "Tore has the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 37,
    word: "Ball",
    hasL: true,
    hasR: false,
    explanation: "Ball ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 38,
    word: "Bar",
    hasL: false,
    hasR: true,
    explanation: "Bar ends with the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 39,
    word: "Mail",
    hasL: true,
    hasR: false,
    explanation: "Mail ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 40,
    word: "Mare",
    hasL: false,
    hasR: true,
    explanation: "Mare ends with the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 41,
    word: "Soul",
    hasL: true,
    hasR: false,
    explanation: "Soul ends with the L sound. The tongue touches the ridge for the 'l' sound."
  },
  {
    id: 42,
    word: "Sore",
    hasL: false,
    hasR: true,
    explanation: "Sore ends with the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 43,
    word: "Bowler",
    hasL: true,
    hasR: true,
    explanation: "Bowler has both L and R sounds. The 'l' sound requires the tongue to touch the ridge, while the 'r' sound requires the tongue to be pulled back."
  },
  {
    id: 44,
    word: "Crawler",
    hasL: false,
    hasR: true,
    explanation: "Crawler has the R sound twice. The tongue is pulled back for both 'r' sounds."
  },
  {
    id: 45,
    word: "Pillar",
    hasL: true,
    hasR: true,
    explanation: "Pillar has both L and R sounds. The 'l' sound requires the tongue to touch the ridge, while the 'r' sound requires the tongue to be pulled back."
  },
  {
    id: 46,
    word: "Mirror",
    hasL: false,
    hasR: true,
    explanation: "Mirror has the R sound. The tongue is pulled back for the 'r' sound."
  },
  {
    id: 47,
    word: "Clearly",
    hasL: true,
    hasR: true,
    explanation: "Clearly has both L and R sounds. The 'l' sound requires the tongue to touch the ridge, while the 'r' sound requires the tongue to be pulled back."
  },
  {
    id: 48,
    word: "Really",
    hasL: true,
    hasR: true,
    explanation: "Really has both L and R sounds. The 'r' sound requires the tongue to be pulled back, while the 'l' sound requires the tongue to touch the ridge."
  },
  {
    id: 49,
    word: "Likely",
    hasL: true,
    hasR: false,
    explanation: "Likely has the L sound twice. The tongue touches the ridge for both 'l' sounds."
  },
  {
    id: 50,
    word: "Library",
    hasL: true,
    hasR: true,
    explanation: "Library has both L and R sounds. The 'l' sound requires the tongue to touch the ridge, while the 'r' sounds require the tongue to be pulled back."
  }
];

export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...quizData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default quizData;
