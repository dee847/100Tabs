import { useState, useEffect } from 'react';

// ── TYPES ────────────────────────────────────────────────────────────────
type OptionValue = 'A' | 'B' | 'C' | 'D';

type Question = {
  id: number;
  question: string;
  options: { text: string; value: OptionValue }[];
};

type ResultKey = OptionValue;

type Result = {
  stage: string;
  icon: string;
  tagline: string;
  color: string;
  bgGradient: string;
  accentLight: string;
  description: string;
  truth: string;
  nextMove: string;
  cta: string;
};

// ── DATA ─────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'When someone asks what you do, what actually happens?',
    options: [
      { text: "I give them a title but it doesn't fully capture it", value: 'A' },
      { text: "I explain it differently every time depending on who's asking", value: 'B' },
      { text: 'I have a solid answer but struggle to back it up with proof', value: 'C' },
      { text: 'I know exactly what I do and have the receipts to prove it', value: 'D' },
    ],
  },
  {
    id: 2,
    question: 'Where does most of your work actually live right now?',
    options: [
      { text: 'In my head, in notes, or scattered across different places', value: 'A' },
      { text: "I have things documented but it's all over the place", value: 'B' },
      { text: "I have a portfolio or presence but it doesn't feel complete", value: 'C' },
      { text: "I have a clear, organized body of work I'm actively adding to", value: 'D' },
    ],
  },
];

const RESULTS: Record<ResultKey, Result> = {
  A: {
    stage: 'The Foundations Stage',
    icon: '◻',
    tagline: "You're not behind. You're at the beginning.",
    color: '#E8643A',
    bgGradient: 'linear-gradient(135deg, #2A1208 0%, #1A0C04 100%)',
    accentLight: '#F5956E',
    description: 'You are building your foundation.',
    truth: 'This is where it starts.',
    nextMove: 'Document your vision.',
    cta: 'Start →',
  },
  B: {
    stage: 'The Clarity Stage',
    icon: '◈',
    tagline: 'You have pieces. You need a through-line.',
    color: '#D4A017',
    bgGradient: 'linear-gradient(135deg, #221800 0%, #160F00 100%)',
    accentLight: '#F0C84A',
    description: 'You need alignment.',
    truth: 'You are close.',
    nextMove: 'Refine your story.',
    cta: 'Refine →',
  },
  C: {
    stage: 'The Visibility Stage',
    icon: '◉',
    tagline: 'Be seen.',
    color: '#3A9E7E',
    bgGradient: 'linear-gradient(135deg, #041A12 0%, #021109 100%)',
    accentLight: '#5ECBA8',
    description: 'You need exposure.',
    truth: 'Your work matters.',
    nextMove: 'Show up consistently.',
    cta: 'Show Up →',
  },
  D: {
    stage: 'The Leverage Stage',
    icon: '◆',
    tagline: 'Scale it.',
    color: '#7B5EA7',
    bgGradient: 'linear-gradient(135deg, #130A1F 0%, #0C0614 100%)',
    accentLight: '#A98FD4',
    description: 'You are ready to scale.',
    truth: 'You have proof.',
    nextMove: 'Expand strategically.',
    cta: 'Scale →',
  },
};

// ── LOGIC ────────────────────────────────────────────────────────────────
function getResult(answers: (OptionValue | null)[]): ResultKey {
  const counts: Record<OptionValue, number> = { A: 0, B: 0, C: 0, D: 0 };

  answers.forEach((a) => {
    if (a) counts[a]++;
  });

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ResultKey;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────
export default function Quiz() {
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<(OptionValue | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [selected, setSelected] = useState<OptionValue | null>(null);
  const [resultKey, setResultKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);

  useEffect(() => {
    setSelected(answers[current]);
  }, [current, answers]);

  const currentQuestion = QUESTIONS[current];
  const result = resultKey ? RESULTS[resultKey] : null;

  function handleSelect(value: OptionValue) {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;

    if (current < QUESTIONS.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      const key = getResult(answers);
      setResultKey(key);
    }
  }

  // ── RESULT SCREEN ──────────────────────────────────────────────────────
  if (result) {
    return (
      <div style={{ padding: 40, color: '#fff' }}>
        <h1>{result.stage}</h1>
        <p>{result.tagline}</p>
        <p>{result.description}</p>
      </div>
    );
  }

  // ── QUIZ SCREEN ────────────────────────────────────────────────────────
  return (
    <div style={{ padding: 40, color: '#fff' }}>
      <h2>{currentQuestion.question}</h2>

      {currentQuestion.options.map((opt) => (
        <button key={opt.value} onClick={() => handleSelect(opt.value)}>
          {opt.text}
        </button>
      ))}

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
