import { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: 'When someone asks what you do, what actually happens?',
    options: [
      {
        text: "I give them a title but it doesn't fully capture it",
        value: 'A',
      },
      {
        text: "I explain it differently every time depending on who's asking",
        value: 'B',
      },
      {
        text: 'I have a solid answer but struggle to back it up with proof',
        value: 'C',
      },
      {
        text: 'I know exactly what I do and have the receipts to prove it',
        value: 'D',
      },
    ],
  },
  {
    id: 2,
    question: 'Where does most of your work actually live right now?',
    options: [
      {
        text: 'In my head, in notes, or scattered across different places',
        value: 'A',
      },
      {
        text: "I have things documented but it's all over the place",
        value: 'B',
      },
      {
        text: "I have a portfolio or presence but it doesn't feel complete",
        value: 'C',
      },
      {
        text: "I have a clear, organized body of work I'm actively adding to",
        value: 'D',
      },
    ],
  },
  {
    id: 3,
    question:
      'How would you describe your relationship with your own brand right now?',
    options: [
      {
        text: "What brand? I haven't really started thinking about that yet",
        value: 'A',
      },
      {
        text: "I know the vibe but I can't articulate it consistently",
        value: 'B',
      },
      {
        text: "I have a brand but I'm not sure it's attracting the right people",
        value: 'C',
      },
      { text: 'My brand is clear, consistent, and working for me', value: 'D' },
    ],
  },
  {
    id: 4,
    question:
      "When an opportunity comes your way, what's the first thing that happens?",
    options: [
      { text: 'I get excited but have nothing ready to send them', value: 'A' },
      {
        text: 'I scramble to pull something together from scratch each time',
        value: 'B',
      },
      {
        text: "I have materials but they don't quite tell the right story",
        value: 'C',
      },
      {
        text: "I have exactly what I need — I just decide if it's the right fit",
        value: 'D',
      },
    ],
  },
  {
    id: 5,
    question:
      "What's your biggest frustration with where you are professionally right now?",
    options: [
      {
        text: "I don't know where to start — there's too much to figure out at once",
        value: 'A',
      },
      {
        text: "I have clarity on what I want but my positioning doesn't reflect it yet",
        value: 'B',
      },
      {
        text: "I know what I'm about but the right people aren't seeing it",
        value: 'C',
      },
      {
        text: 'I have the work and the story — now I need to scale it into bigger opportunities',
        value: 'D',
      },
    ],
  },
  {
    id: 6,
    question: 'How often are the right opportunities finding YOU?',
    options: [
      {
        text: "Rarely — I'm still figuring out how to put myself out there",
        value: 'A',
      },
      {
        text: "Sometimes, but they're not always aligned with where I want to go",
        value: 'B',
      },
      { text: 'More often, but I want more — and better', value: 'C' },
      {
        text: 'Consistently — my reputation is starting to do the work',
        value: 'D',
      },
    ],
  },
];

const RESULTS = {
  A: {
    stage: 'The Foundations Stage',
    icon: '◻',
    tagline: "You're not behind. You're at the beginning.",
    color: '#E8643A',
    bgGradient: 'linear-gradient(135deg, #2A1208 0%, #1A0C04 100%)',
    accentLight: '#F5956E',
    description:
      "You have something real being built — you just haven't put it on paper yet. The work exists inside you. The portfolio doesn't exist outside of you yet, and that gap is the whole thing. This stage isn't a problem to fix. It's a starting point to honor.",
    truth:
      "Most multi-hyphenates spend years in this stage because nobody tells them that documenting the vision IS part of building it. You're not procrastinating. You were waiting for permission to take yourself seriously. You don't need that anymore.",
    nextMove:
      "Your one move: get your brand pillars out of your head and onto paper. Who you are, who you serve, what you do, and why it matters. That's your foundation — and everything else gets built on top of it.",
    cta: 'Start your foundation with 100 Tabs →',
  },
  B: {
    stage: 'The Clarity Stage',
    icon: '◈',
    tagline: 'You have pieces. You need a through-line.',
    color: '#D4A017',
    bgGradient: 'linear-gradient(135deg, #221800 0%, #160F00 100%)',
    accentLight: '#F0C84A',
    description:
      "You know what you're building. You've done real work. But when you try to explain it — or package it — something gets lost in translation. The problem isn't your experience. It's that your positioning hasn't caught up to your vision yet.",
    truth:
      "This is the stage where the most talented people get stuck the longest. You're capable enough to keep getting opportunities, but your brand isn't working hard enough for you. You're doing the heavy lifting that your positioning should be doing.",
    nextMove:
      "Your one move: build the through-line. What's the story that connects all of it? What's the positioning statement that makes someone immediately understand your value? Once that's clear, everything else snaps into place.",
    cta: 'Find your through-line with 100 Tabs →',
  },
  C: {
    stage: 'The Visibility Stage',
    icon: '◉',
    tagline: 'You know your story. Now get it in front of the right rooms.',
    color: '#3A9E7E',
    bgGradient: 'linear-gradient(135deg, #041A12 0%, #021109 100%)',
    accentLight: '#5ECBA8',
    description:
      "You've done the foundation work. Your positioning is solid. Your portfolio exists. But the right people — the ones who could change the trajectory — aren't seeing it yet. You're visible to the wrong audience or not visible enough to the right one.",
    truth:
      "This isn't a talent problem or a brand problem. It's a distribution problem. You've built something worth finding. Now the work is strategic visibility — being in the right places, saying the right things, to the right people, consistently enough that it compounds.",
    nextMove:
      'Your one move: identify exactly where your people are and show up there with intention. One platform, one message, one consistent presence. Volume without strategy is noise. You need targeted signal.',
    cta: 'Build your visibility strategy with 100 Tabs →',
  },
  D: {
    stage: 'The Leverage Stage',
    icon: '◆',
    tagline: 'You have the receipts. Now scale them.',
    color: '#7B5EA7',
    bgGradient: 'linear-gradient(135deg, #130A1F 0%, #0C0614 100%)',
    accentLight: '#A98FD4',
    description:
      "You've built something real. The work is there, the story is there, and opportunities are finding you. Now it's about turning what you've built into leverage — bigger rooms, better rates, and a career portfolio that works for you whether you're in the room or not.",
    truth:
      "This stage trips people up because it looks like success from the outside — and it is. But there's a ceiling you keep bumping against. Getting past it requires packaging your experience differently, positioning yourself for the next level, not just the current one.",
    nextMove:
      "Your one move: audit what you've built and identify the gap between where you are and where you want to be. Then build the bridge — whether that's a new offer, a repositioned narrative, or a strategic move into a new room.",
    cta: 'Level up your leverage with 100 Tabs →',
  },
};

function getResult(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => {
    if (a) counts[a]++;
  });
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0];
}

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ width: '100%', marginBottom: 32 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: '#888',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
          }}
        >
          Question {current} of {total}
        </span>
        <span
          style={{
            fontSize: 11,
            color: '#E8643A',
            letterSpacing: '0.1em',
            fontFamily: 'Georgia, serif',
          }}
        >
          {Math.round(pct)}%
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: '#222',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #E8643A, #D4A017)',
            borderRadius: 2,
            transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
}

export default function Quiz() {
  const [screen, setScreen] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [resultKey, setResultKey] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setSelected(answers[current]);
  }, [current]);

  function handleSelect(value) {
    setSelected(value);
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (!selected) return;
    setAnimating(true);
    setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        setCurrent(current + 1);
        setAnimating(false);
      } else {
        const key = getResult(answers);
        setResultKey(key);
        setScreen('result');
        setAnimating(false);
      }
    }, 220);
  }

  function handleBack() {
    if (current > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(current - 1);
        setAnimating(false);
      }, 180);
    }
  }

  const q = QUESTIONS[current];
  const result = resultKey ? RESULTS[resultKey] : null;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0E0A06',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              'radial-gradient(circle, #E8643A 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: '#E8643A18',
              border: '1px solid #E8643A44',
              borderRadius: 40,
              padding: '6px 18px',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: '#E8643A',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            A Free Quiz by @_deebrady
          </div>
          <h1
            style={{
              fontSize: 'clamp(32px, 8vw, 52px)',
              fontWeight: 700,
              color: '#F5EEE4',
              margin: '0 0 10px',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
            }}
          >
            Where Are You
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #E8643A, #D4A017)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              In The Build?
            </span>
          </h1>
          <p
            style={{
              fontSize: 15,
              color: '#998877',
              lineHeight: 1.75,
              margin: '20px auto 36px',
              maxWidth: 400,
            }}
          >
            A 6-question quiz for multi-hyphenate creatives who are building
            their career portfolio — and want to know exactly where to focus
            next.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              marginBottom: 40,
              flexWrap: 'wrap',
            }}
          >
            {['6 questions', '2 minutes', 'Free'].map((tag) => (
              <div
                key={tag}
                style={{ display: 'flex', gap: 7, alignItems: 'center' }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#D4A017',
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: '#776655',
                    letterSpacing: '0.06em',
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setScreen('quiz')}
            style={{
              background: 'linear-gradient(135deg, #E8643A, #D4A017)',
              color: '#0E0A06',
              border: 'none',
              borderRadius: 4,
              padding: '16px 44px',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 32px #E8643A33',
            }}
          >
            Find My Stage →
          </button>
          <p
            style={{
              marginTop: 20,
              fontSize: 11,
              color: '#443322',
              letterSpacing: '0.06em',
            }}
          >
            Part of the 100 Tabs ecosystem
          </p>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (screen === 'quiz') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0E0A06',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            width: '100%',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          <ProgressBar current={current + 1} total={QUESTIONS.length} />
          <h2
            style={{
              fontSize: 'clamp(19px, 4vw, 26px)',
              fontWeight: 600,
              color: '#F5EEE4',
              margin: '0 0 28px',
              lineHeight: 1.35,
              letterSpacing: '-0.02em',
            }}
          >
            {q.question}
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 32,
            }}
          >
            {q.options.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    background: isSelected ? '#E8643A18' : '#141008',
                    border: `1.5px solid ${isSelected ? '#E8643A' : '#2A2018'}`,
                    borderRadius: 6,
                    padding: '15px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    transition: 'all 0.15s',
                    color: isSelected ? '#F5EEE4' : '#887766',
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? '#E8643A' : '#443322'}`,
                      background: isSelected ? '#E8643A' : 'transparent',
                      flexShrink: 0,
                      marginTop: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: '#0E0A06',
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {current > 0 ? (
              <button
                onClick={handleBack}
                style={{
                  background: 'transparent',
                  border: '1px solid #2A2018',
                  color: '#665544',
                  borderRadius: 4,
                  padding: '12px 22px',
                  fontSize: 13,
                  fontFamily: 'Georgia, serif',
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                }}
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!selected}
              style={{
                background: selected
                  ? 'linear-gradient(135deg, #E8643A, #D4A017)'
                  : '#1E1810',
                color: selected ? '#0E0A06' : '#443322',
                border: 'none',
                borderRadius: 4,
                padding: '13px 32px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
                cursor: selected ? 'pointer' : 'not-allowed',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                boxShadow: selected ? '0 4px 20px #E8643A33' : 'none',
              }}
            >
              {current === QUESTIONS.length - 1 ? 'See My Result →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (screen === 'result' && result) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: result.bgGradient,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '48px 24px 60px',
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              'radial-gradient(circle, #FFF 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 560, width: '100%', position: 'relative' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div
              style={{
                display: 'inline-block',
                background: result.color + '22',
                border: `1px solid ${result.color}55`,
                borderRadius: 40,
                padding: '6px 18px',
                fontSize: 10,
                letterSpacing: '0.22em',
                color: result.color,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Your Stage
            </div>
            <div
              style={{ fontSize: 42, marginBottom: 12, color: result.color }}
            >
              {result.icon}
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 6vw, 42px)',
                fontWeight: 700,
                color: '#F5EEE4',
                margin: '0 0 10px',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              {result.stage}
            </h1>
            <p
              style={{
                fontSize: 15,
                color: result.accentLight,
                fontStyle: 'italic',
                margin: 0,
                letterSpacing: '0.02em',
              }}
            >
              {result.tagline}
            </p>
          </div>

          {/* Cards */}
          {[
            { label: 'What This Means', content: result.description },
            { label: "Here's The Truth", content: result.truth },
            { label: 'Your One Move', content: result.nextMove },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF08',
                border: `1px solid ${result.color}22`,
                borderRadius: 6,
                padding: '20px 22px',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  color: result.color,
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                {card.label}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: '#CCB99A',
                  lineHeight: 1.8,
                }}
              >
                {card.content}
              </p>
            </div>
          ))}

          {/* CTA Block */}
          <div
            style={{
              background: result.color + '15',
              border: `1px solid ${result.color}44`,
              borderRadius: 6,
              padding: '24px',
              marginTop: 24,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 13,
                color: '#887766',
                letterSpacing: '0.04em',
              }}
            >
              You're not building alone.
            </p>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: 15,
                color: '#F5EEE4',
                lineHeight: 1.65,
              }}
            >
              100 Tabs is a build-in-public series for multi-hyphenates who are
              done waiting. Follow the build — and go deeper on your stage.
            </p>
            <a
              href="https://substack.com/@100tabss"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: `linear-gradient(135deg, ${result.color}, #D4A017)`,
                color: '#0E0A06',
                borderRadius: 4,
                padding: '13px 28px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: `0 6px 24px ${result.color}44`,
                marginBottom: 12,
                width: '100%',
                textDecoration: 'none',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              {result.cta}
            </a>
            <a
              href="https://book.squareup.com/appointments/9y45ga005krrep/location/LM814RWJ1CN1A/services"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: 'transparent',
                border: `1px solid ${result.color}44`,
                color: result.accentLight,
                borderRadius: 4,
                padding: '11px 28px',
                fontSize: 12,
                fontFamily: 'Georgia, serif',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                width: '100%',
                textDecoration: 'none',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              Book The Debrief — Work with Dee directly →
            </a>
          </div>

          {/* Share nudge */}
          <p
            style={{
              textAlign: 'center',
              marginTop: 24,
              fontSize: 12,
              color: '#554433',
              fontStyle: 'italic',
            }}
          >
            Share your stage → tag @_deebrady
          </p>
        </div>
      </div>
    );
  }

  return null;
}
