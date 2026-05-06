import { useState } from "react";
import { questionBank } from "./questions";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions() {
  return questionBank.flatMap((domain) =>
    shuffle(domain.questions)
      .slice(0, 5)
      .map((q) => ({ ...q, domain: domain.domain, color: domain.color, icon: domain.icon }))
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AZ104Exam() {
  const [mode, setMode] = useState("immediate");
  const [phase, setPhase] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const startExam = () => {
    setQuestions(pickQuestions());
    setAnswers({});
    setRevealed({});
    setCurrent(0);
    setPhase("exam");
  };

  const selectAnswer = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers((p) => ({ ...p, [qIdx]: optIdx }));
    if (mode === "immediate") setRevealed((p) => ({ ...p, [qIdx]: true }));
  };

  const finishExam = () => setPhase("results");
  const resetExam = () => setPhase("start");

  const domainStats = () => {
    if (!questions.length) return [];
    const stats = {};
    questions.forEach((q, i) => {
      if (!stats[q.domain])
        stats[q.domain] = { domain: q.domain, color: q.color, icon: q.icon, total: 0, correct: 0 };
      stats[q.domain].total++;
      if (answers[i] === q.answer) stats[q.domain].correct++;
    });
    return Object.values(stats).sort((a, b) => a.correct / a.total - b.correct / b.total);
  };

  const totalCorrect = questions.filter((q, i) => answers[i] === q.answer).length;
  const score = questions.length ? Math.round((totalCorrect / questions.length) * 100) : 0;
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      color: "#e8eaf0",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #2a3050; border-radius: 4px; }
        .opt-btn { transition: all 0.15s ease; cursor: pointer; }
        .opt-btn:hover { transform: translateX(3px); }
        .nav-btn { transition: all 0.15s; cursor: pointer; }
        .nav-btn:hover { opacity: 0.8; transform: translateY(-1px); }
        .toggle-pill { transition: all 0.2s; cursor: pointer; }
        .toggle-pill:hover { opacity: 0.85; }
        .domain-bar { transition: width 0.6s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #0d1428 0%, #111827 50%, #0a1628 100%)",
        borderBottom: "1px solid #1e2d4a",
        padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>☁️</span>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>
              AZ-104 Practice Exam
            </div>
            <div style={{ color: "#6b7a99", fontSize: 11 }}>
              Microsoft Azure Administrator · 25 Questions · 5 Domains
            </div>
          </div>
          <span style={{ background: "#00B4D8", color: "#000", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3, letterSpacing: 1 }}>
            BETA
          </span>
        </div>
        {phase === "exam" && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ color: "#6b7a99", fontSize: 11 }}>
              Q{current + 1} <span style={{ color: "#4a5580" }}>/ {questions.length}</span>
            </div>
            <div style={{ width: 140, height: 4, background: "#1a2040", borderRadius: 2 }}>
              <div style={{
                width: `${((current + 1) / questions.length) * 100}%`,
                height: "100%", background: "linear-gradient(90deg, #00B4D8, #06D6A0)",
                borderRadius: 2, transition: "width 0.3s",
              }} />
            </div>
            <div style={{ color: "#00B4D8", fontSize: 11, fontWeight: 600 }}>
              {Math.round(((current + 1) / questions.length) * 100)}%
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>

        {/* ══════════════ START SCREEN ══════════════ */}
        {phase === "start" && (
          <div className="fade-in">
            <div style={{ background: "#111827", border: "1px solid #1e2d4a", borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                Answer Mode
              </div>
              <div style={{ color: "#6b7a99", fontSize: 12, marginBottom: 20 }}>
                Choose how and when you see if your answer was correct.
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { key: "immediate", label: "⚡ Immediate Feedback", desc: "Shows right/wrong + explanation after each answer" },
                  { key: "end", label: "📋 Score at End", desc: "Reveals all answers and explanations after submitting" },
                ].map((m) => (
                  <div
                    key={m.key}
                    className="toggle-pill"
                    onClick={() => setMode(m.key)}
                    style={{
                      flex: 1, minWidth: 200,
                      background: mode === m.key ? "#0d1f3a" : "#0a1020",
                      border: `2px solid ${mode === m.key ? "#00B4D8" : "#1e2d4a"}`,
                      borderRadius: 8, padding: "14px 18px",
                    }}
                  >
                    <div style={{ color: mode === m.key ? "#00B4D8" : "#8899bb", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                      {m.label}
                    </div>
                    <div style={{ color: "#4a5580", fontSize: 11 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#111827", border: "1px solid #1e2d4a", borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                Exam Overview
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questionBank.map((d) => (
                  <div key={d.domainId} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 16 }}>{d.icon}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "#c8d0e0", fontSize: 12 }}>{d.domain}</span>
                    </div>
                    <span style={{ color: d.color, fontSize: 11, fontWeight: 600 }}>5 questions</span>
                    <span style={{ color: "#4a5580", fontSize: 10 }}>({d.questions.length} in pool)</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 20, padding: "12px 16px",
                background: "#0a1020", border: "1px solid #1a3050", borderRadius: 6,
                color: "#6b7a99", fontSize: 12, lineHeight: 1.7,
              }}>
                💡 Questions are randomly selected from each domain pool — every attempt is unique.
                Explanations are shown for all answers regardless of mode.
              </div>
            </div>

            <button
              className="nav-btn"
              onClick={startExam}
              style={{
                width: "100%", padding: "16px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #00B4D8, #06D6A0)",
                color: "#000", fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
              }}
            >
              Start Exam →
            </button>
          </div>
        )}

        {/* ══════════════ EXAM SCREEN ══════════════ */}
        {phase === "exam" && questions.length > 0 && (() => {
          const q = questions[current];
          const selected = answers[current];
          const isRevealed = revealed[current];
          const isCorrect = selected === q.answer;

          return (
            <div className="fade-in">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{q.icon}</span>
                  <span style={{
                    background: `${q.color}20`, border: `1px solid ${q.color}50`,
                    color: q.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                  }}>{q.domain}</span>
                </div>
                <span style={{ color: "#4a5580", fontSize: 11 }}>Question {current + 1} of {questions.length}</span>
              </div>

              <div style={{ background: "#111827", border: "1px solid #1e2d4a", borderRadius: 10, padding: "24px 28px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, color: "#fff", lineHeight: 1.6 }}>
                  {q.q}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {q.options.map((opt, i) => {
                  let borderColor = "#1e2d4a";
                  let bg = "#0f1520";
                  let textColor = "#c8d0e0";
                  let indicator = null;

                  if (selected === i) {
                    if (!isRevealed) {
                      borderColor = "#00B4D8"; bg = "#0a1a2a"; textColor = "#fff";
                    } else if (isCorrect) {
                      borderColor = "#06D6A0"; bg = "#051a10"; textColor = "#06D6A0"; indicator = "✓";
                    } else {
                      borderColor = "#FF6B6B"; bg = "#1a0808"; textColor = "#FF6B6B"; indicator = "✗";
                    }
                  } else if (isRevealed && i === q.answer) {
                    borderColor = "#06D6A0"; bg = "#051a10"; textColor = "#06D6A0"; indicator = "✓";
                  }

                  return (
                    <div
                      key={i}
                      className="opt-btn"
                      onClick={() => selectAnswer(current, i)}
                      style={{
                        background: bg, border: `2px solid ${borderColor}`,
                        borderRadius: 8, padding: "14px 18px",
                        display: "flex", alignItems: "center", gap: 12,
                        opacity: selected !== undefined && selected !== i && !(isRevealed && i === q.answer) ? 0.5 : 1,
                      }}
                    >
                      <span style={{
                        width: 24, height: 24, borderRadius: 6,
                        border: `2px solid ${borderColor}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: borderColor, flexShrink: 0,
                        background: indicator ? `${borderColor}20` : "transparent",
                      }}>
                        {indicator || String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ color: textColor, fontSize: 13, lineHeight: 1.5 }}>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {isRevealed && mode === "immediate" && (
                <div className="fade-in" style={{
                  background: isCorrect ? "#051a10" : "#150808",
                  border: `1px solid ${isCorrect ? "#06D6A0" : "#FF6B6B"}40`,
                  borderRadius: 8, padding: "16px 18px", marginBottom: 20,
                }}>
                  <div style={{ color: isCorrect ? "#06D6A0" : "#FF6B6B", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                    {isCorrect ? "✓ Correct" : "✗ Incorrect"} — Explanation
                  </div>
                  <div style={{ color: "#a0b0c8", fontSize: 13, lineHeight: 1.7 }}>{q.explanation}</div>
                </div>
              )}

              <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                <button
                  className="nav-btn"
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                  style={{
                    background: "transparent", border: "1px solid #1e2d4a",
                    color: current === 0 ? "#2a3a5a" : "#6b7a99",
                    padding: "10px 20px", borderRadius: 6, fontFamily: "inherit",
                    fontSize: 12, cursor: current === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Prev
                </button>

                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                  {questions.map((_, i) => {
                    const isDone = answers[i] !== undefined;
                    const isRight = answers[i] === questions[i]?.answer;
                    let dotColor = "#1e2d4a";
                    if (isDone && mode === "immediate") dotColor = isRight ? "#06D6A0" : "#FF6B6B";
                    else if (isDone) dotColor = "#00B4D8";
                    return (
                      <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        style={{
                          width: i === current ? 24 : 8, height: 8,
                          borderRadius: 4, background: i === current ? "#00B4D8" : dotColor,
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      />
                    );
                  })}
                </div>

                {current < questions.length - 1 ? (
                  <button
                    className="nav-btn"
                    onClick={() => setCurrent((c) => c + 1)}
                    style={{
                      background: "transparent", border: "1px solid #1e2d4a",
                      color: "#6b7a99", padding: "10px 20px", borderRadius: 6,
                      fontFamily: "inherit", fontSize: 12,
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    className="nav-btn"
                    onClick={finishExam}
                    disabled={!allAnswered}
                    style={{
                      background: allAnswered ? "linear-gradient(135deg, #00B4D8, #06D6A0)" : "#1a2040",
                      border: "none", color: allAnswered ? "#000" : "#2a3a5a",
                      padding: "10px 20px", borderRadius: 6, fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12, fontWeight: 700, cursor: allAnswered ? "pointer" : "not-allowed",
                    }}
                  >
                    Finish →
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ══════════════ RESULTS SCREEN ══════════════ */}
        {phase === "results" && (
          <div className="fade-in">
            <div style={{
              background: "#111827", border: `1px solid ${score >= 70 ? "#06D6A030" : "#FF6B6B30"}`,
              borderRadius: 12, padding: 32, marginBottom: 24, textAlign: "center",
            }}>
              <div style={{ color: "#6b7a99", fontSize: 12, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Final Score</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 72, fontWeight: 700,
                color: score >= 70 ? "#06D6A0" : score >= 50 ? "#FFB703" : "#FF6B6B", lineHeight: 1,
              }}>
                {score}%
              </div>
              <div style={{ color: "#6b7a99", fontSize: 14, marginTop: 8 }}>
                {totalCorrect} correct out of {questions.length} questions
              </div>
              <div style={{ marginTop: 12, color: score >= 70 ? "#06D6A0" : "#FF6B6B", fontSize: 13, fontWeight: 600 }}>
                {score >= 70 ? "✓ Above passing threshold" : "✗ Below passing threshold (700/1000)"}
              </div>
            </div>

            <div style={{ background: "#111827", border: "1px solid #1e2d4a", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                📊 Domain Performance
              </div>
              {domainStats().map((d) => {
                const pct = Math.round((d.correct / d.total) * 100);
                return (
                  <div key={d.domain} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 13 }}>{d.icon}</span>
                        <span style={{ color: "#c8d0e0", fontSize: 12 }}>{d.domain}</span>
                        {pct < 60 && (
                          <span style={{ background: "#FF6B6B20", border: "1px solid #FF6B6B40", color: "#FF6B6B", fontSize: 10, padding: "1px 6px", borderRadius: 3 }}>
                            needs work
                          </span>
                        )}
                      </div>
                      <span style={{ color: pct >= 80 ? "#06D6A0" : pct >= 60 ? "#FFB703" : "#FF6B6B", fontSize: 12, fontWeight: 600 }}>
                        {d.correct}/{d.total} ({pct}%)
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#0a1020", borderRadius: 3, overflow: "hidden" }}>
                      <div className="domain-bar" style={{
                        width: `${pct}%`, height: "100%",
                        background: pct >= 80 ? "#06D6A0" : pct >= 60 ? "#FFB703" : "#FF6B6B",
                        borderRadius: 3,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {mode === "end" && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                  📋 Answer Review
                </div>
                {questions.map((q, i) => {
                  const sel = answers[i];
                  const correct = sel === q.answer;
                  return (
                    <div key={i} style={{
                      background: correct ? "#051a10" : "#150808",
                      border: `1px solid ${correct ? "#06D6A040" : "#FF6B6B40"}`,
                      borderRadius: 10, padding: "20px 22px", marginBottom: 12,
                    }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                        <span style={{ color: correct ? "#06D6A0" : "#FF6B6B", fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                          {correct ? "✓" : "✗"}
                        </span>
                        <div>
                          <div style={{ color: "#6b7a99", fontSize: 10, marginBottom: 4 }}>{q.icon} {q.domain} · Q{i + 1}</div>
                          <div style={{ color: "#e8eaf0", fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{q.q}</div>
                        </div>
                      </div>
                      <div style={{ paddingLeft: 26 }}>
                        {!correct && (
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ color: "#FF6B6B", fontSize: 11 }}>Your answer: </span>
                            <span style={{ color: "#FF6B6B80", fontSize: 12 }}>{q.options[sel]}</span>
                          </div>
                        )}
                        <div style={{ marginBottom: 10 }}>
                          <span style={{ color: "#06D6A0", fontSize: 11 }}>Correct answer: </span>
                          <span style={{ color: "#06D6A0", fontSize: 12 }}>{q.options[q.answer]}</span>
                        </div>
                        <div style={{ background: "#0a1020", border: "1px solid #1a3050", borderRadius: 6, padding: "10px 14px" }}>
                          <div style={{ color: "#4a5580", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Explanation</div>
                          <div style={{ color: "#a0b0c8", fontSize: 12, lineHeight: 1.7 }}>{q.explanation}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              className="nav-btn"
              onClick={resetExam}
              style={{
                width: "100%", padding: "14px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #00B4D8, #06D6A0)",
                color: "#000", fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 15, fontWeight: 700,
              }}
            >
              🔄 New Exam (Shuffle Questions)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
