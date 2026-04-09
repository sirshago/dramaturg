import { useState } from "react";

const F = { serif: "Georgia, serif" };

const C = {
  bg:      "#f7f5f0",
  ink:     "#111110",
  inkDim:  "#555550",
  inkFaint:"#aaa9a3",
  border:  "rgba(0,0,0,0.12)",
  act1:    "#2d6e3a",
  act2a:   "#185fa5",
  act2b:   "#7a3a20",
  act3:    "#6a5010",
};

const QuillIcon = ({ size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
    <path d="M12 49 Q12 56 20 56 Q28 56 28 49 L27 44 Q23 41 20 41 Q17 41 13 44 Z" fill="#1a1a18"/>
    <ellipse cx="20" cy="44" rx="8" ry="3" fill="#3a3a34"/>
    <ellipse cx="19" cy="44" rx="3.5" ry="1.2" fill="#555550" opacity="0.5"/>
    <line x1="20" y1="44" x2="54" y2="8" stroke="#1a1a18" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M54 8 Q47 14 41 20 Q38 17 40 13 Q47 9 54 8Z" fill="#2a2a28" opacity="0.85"/>
    <path d="M48 14 Q41 21 35 28 Q32 25 34 21 Q41 16 48 14Z" fill="#3a3a34" opacity="0.8"/>
    <path d="M42 20 Q35 28 29 35 Q26 32 28 28 Q35 23 42 20Z" fill="#2a2a28" opacity="0.85"/>
    <path d="M36 27 Q29 35 23 42 Q20 39 22 35 Q29 30 36 27Z" fill="#3a3a34" opacity="0.8"/>
    <path d="M54 8 Q47 11 40 16 Q38 12 41 9 Q48 6 54 8Z" fill="#6a6a62" opacity="0.6"/>
    <path d="M48 14 Q41 18 34 23 Q32 19 35 16 Q42 12 48 14Z" fill="#888880" opacity="0.55"/>
    <path d="M42 20 Q35 24 28 30 Q26 26 29 23 Q36 18 42 20Z" fill="#6a6a62" opacity="0.6"/>
    <path d="M20 44 L17 50 L20 47 L23 50 Z" fill="#1a1a18"/>
  </svg>
);

const BeatPreview = ({ label, text, color, explanation, sv }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [savedText, setSavedText] = useState(text);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
      <div style={{ width: "3px", background: color, borderRadius: "2px", flexShrink: 0, marginTop: "4px" }} />
      <div style={{ flex: 1 }}>
        {/* Label row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color, fontFamily: F.serif }}>{label}</span>
            {explanation && (
              <button onClick={() => setShowInfo(s => !s)} style={{
                background: showInfo ? C.ink : "none",
                border: `1px solid ${showInfo ? C.ink : C.border}`,
                borderRadius: "50%", width: "18px", height: "18px", cursor: "pointer",
                color: showInfo ? "#fff" : C.inkDim, fontSize: "11px",
                fontFamily: F.serif, display: "flex", alignItems: "center",
                justifyContent: "center", transition: "all 0.15s", flexShrink: 0, padding: 0,
              }}>i</button>
            )}
          </div>
          {!isEditing && (
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => { setIsEditing(true); setShowFeedback(false); setEditText(savedText); }} style={{
                background: "none", border: `1px solid ${C.border}`, borderRadius: "4px",
                cursor: "pointer", color: C.inkDim, fontFamily: F.serif, fontSize: "12px", padding: "2px 8px",
              }}>{sv ? "Redigera" : "Edit"}</button>
              <button onClick={() => { setShowFeedback(s => !s); setIsEditing(false); }} style={{
                background: showFeedback ? "rgba(0,0,0,0.04)" : "none",
                border: `1px solid ${C.border}`, borderRadius: "4px",
                cursor: "pointer", color: C.inkDim, fontFamily: F.serif, fontSize: "12px", padding: "2px 8px",
              }}>{showFeedback ? (sv ? "Avbryt" : "Cancel") : (sv ? "Ge feedback" : "Give feedback")}</button>
            </div>
          )}
        </div>

        {/* Info panel */}
        {showInfo && explanation && (
          <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "5px", padding: "12px 14px", marginBottom: "8px" }}>
            <p style={{ margin: 0, fontSize: "13px", color: C.inkDim, lineHeight: 1.65, fontStyle: "italic", fontFamily: F.serif }}>{explanation}</p>
          </div>
        )}

        {/* Beat text or edit */}
        {isEditing ? (
          <div>
            <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={3}
              style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: "6px", padding: "10px 12px", color: C.ink, fontSize: "15px", fontFamily: F.serif, outline: "none", boxSizing: "border-box", resize: "vertical", marginBottom: "8px" }} autoFocus />
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => { setSavedText(editText); setIsEditing(false); }} style={{ background: C.ink, border: "none", color: "#fff", borderRadius: "5px", padding: "7px 14px", cursor: "pointer", fontFamily: F.serif, fontSize: "13px" }}>{sv ? "Spara" : "Save"}</button>
              <button onClick={() => setIsEditing(false)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.inkDim, borderRadius: "5px", padding: "7px 12px", cursor: "pointer", fontFamily: F.serif, fontSize: "13px" }}>{sv ? "Avbryt" : "Cancel"}</button>
            </div>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: "15px", color: C.ink, lineHeight: 1.65, fontFamily: F.serif }}>{savedText}</p>
        )}

        {/* Feedback */}
        {showFeedback && !isEditing && (
          <div style={{ marginTop: "10px" }}>
            {feedbackSent ? (
              <p style={{ margin: 0, fontSize: "13px", color: C.act1, fontStyle: "italic", fontFamily: F.serif }}>
                {sv ? "✓ Feedback mottagen — i den riktiga appen regenereras strukturen nu." : "✓ Feedback received — in the real app, the structure would now regenerate."}
              </p>
            ) : (
              <>
                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={2}
                  placeholder={sv ? "T.ex. 'Elara borde tveka längre' eller 'gör det mörkare'…" : "E.g. 'Elara should hesitate longer' or 'make it darker'…"}
                  style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: "6px", padding: "10px 12px", color: C.ink, fontSize: "14px", fontFamily: F.serif, outline: "none", boxSizing: "border-box", resize: "none", marginBottom: "8px" }} />
                <button onClick={() => { if (feedback.trim()) { setFeedbackSent(true); setShowFeedback(false); } }} disabled={!feedback.trim()} style={{ background: feedback.trim() ? C.ink : "rgba(0,0,0,0.04)", border: "none", color: feedback.trim() ? "#fff" : C.inkFaint, borderRadius: "5px", padding: "8px 16px", cursor: feedback.trim() ? "pointer" : "default", fontFamily: F.serif, fontSize: "13px" }}>
                  {sv ? "Fortsätt" : "Continue"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function LandingPage({ onEnter, lang: initialLang = "sv" }) {
  const [lang, setLang] = useState(initialLang);
  const sv = lang === "sv";

  const copy = {
    sv: {
      nav: "Dramaturg",
      tagline: "Vet du vad du vill skriva, men inte hur det ska hänga ihop?",
      sub: "Dramaturg hjälper dig hitta formen på din berättelse — utan att ta ifrån dig rösten. Beskriv din idé och dina karaktärer, så genereras en struktur anpassad till just din historia.",
      cta: "Prova gratis",
      free: "Inget konto krävs. Gratis att använda.",
      howTitle: "Hur det fungerar",
      ctaTitle: "Redo att ge din berättelse form?",
      skeptic: "Dramaturgi behöver inte vara ett tvång. Många av de bästa berättelserna börjar med en struktur — och hittar sin form när de bryter mot den.",
      steps: [
        { n: "1", title: "Välj modell", desc: "Save the Cat, Hjälteresan eller Freytags pyramid — beroende på vilken typ av berättelse du skriver." },
        { n: "2", title: "Beskriv din historia", desc: "Skriv en logline, välj genre och ton, och lägg till dina karaktärer med deras drivkrafter." },
        { n: "3", title: "Forma strukturen", desc: "Du får ett komplett förslag steg för steg. Ge feedback, redigera direkt i texten och exportera när du är klar." },
      ],
      featTitle: "Vad du får",
      features: [
        "Tre dramaturgimodeller med förklaringar",
        "En komplett dramaturgistruktur anpassad till din berättelse",
        "Ge feedback och justera enskilda delar med AI-hjälp",
        "Export som PDF, Word eller Markdown",
      ],
      previewTitle: "Ett exempel",
      previewSub: "Ur en genererad dramaturgistruktur för en fantasy-roman — Hjälteresan",
      footer: "Dramaturg — ett verktyg för berättare med en idé som vill hitta sin form.",
    },
    en: {
      nav: "Dramaturg",
      tagline: "Do you know what you want to write, but not how it should hold together?",
      sub: "Dramaturg helps you find the shape of your story — without taking away your voice. Describe your idea and characters, and get a structure tailored to your story.",
      cta: "Try for free",
      free: "No account needed. Free to use.",
      howTitle: "How it works",
      ctaTitle: "Ready to give your story shape?",
      skeptic: "Structure doesn't have to be a constraint. Many of the best stories begin with a framework — and find their form by breaking it.",
      steps: [
        { n: "1", title: "Choose a model", desc: "Save the Cat, The Hero's Journey or Freytag's Pyramid — depending on what kind of story you're writing." },
        { n: "2", title: "Describe your story", desc: "Write a logline, choose genre and tone, and add your characters with their motivations." },
        { n: "3", title: "Shape the structure", desc: "You get a complete suggestion step by step. Give feedback, edit directly in the text and export when you're done." },
      ],
      featTitle: "What you get",
      features: [
        "Three story models with explanations",
        "A complete dramatic structure tailored to your story",
        "Give feedback and adjust individual parts with AI",
        "Export as PDF, Word or Markdown",
      ],
      previewTitle: "An example",
      previewSub: "From a generated dramatic structure for a fantasy novel — The Hero's Journey",
      footer: "Dramaturg — a tool for storytellers with an idea looking for its shape.",
    },
  };

  const c = copy[lang];

  const previewBeats = sv ? [
    { label: "Den vanliga världen", text: "Elara lever som hästtjuv i det fattiga utkanten av kejsardömet. Hon är skicklig, cynisk och har lärt sig att inte lita på någon — minst av allt makten.", color: C.act1, explanation: "Vi etablerar hjältens normala tillvaro. Kontrasten mot vad som komma skall är avgörande: vi måste förstå vad hjälten lämnar bakom sig." },
    { label: "Kallelsen", text: "En döende soldat räcker henne ett sigill med en karta och viskar ett namn: den försvunne kung som alla tror är legend. Elara är den enda som vet att han är verklig.", color: C.act1, explanation: "En utmaning dyker upp som stör den vanliga världen. Hjälten kallas att kliva utanför sin bekvämlighetszon." },
    { label: "Vägran", text: "Elara bränner kartan. Det är inte hennes krig, inte hennes kung. Hon har överlevt i åtta år utan att bry sig om riket — hon tänker inte börja nu.", color: C.act2a, explanation: "Hjälten tvekar eller nekar kallelsen. Vägran är mänsklig och nödvändig — den visar att stakes är verkliga." },
    { label: "Mötet med mentorn", text: "Den blinde bibliotekarien Oryn hittar henne ändå. Han vet redan vem hon är — och vad sigillet betyder. Han erbjuder henne inte uppdrag, utan ett val: fortsätta fly, eller förstå varför hon alltid flyr.", color: C.act2a, explanation: "En visdomsfigur ger hjälten vad hen behöver för att ta steget — men gör inte resan åt hen." },
    { label: "Tröskelövergången", text: "Kejsarens soldater bränner ner byn. Elara har ingenstans att vända sig. Hon tar kartan Oryn rittat ur minnet och rider mot berget i norr.", color: C.act2a, explanation: "Hjälten lämnar den kända världen och kliver in i äventyrets värld. Det är point of no return." },
    { label: "Prövningar och allierade", text: "I de norra vidderna möter hon Renn, en deserterad soldat med ett pris på huvudet, och Siv, en trollkvinna som hatar Elara för vad hennes far en gång gjorde. De behöver varandra. Det räcker inte.", color: C.act2a, explanation: "Den nya världen testar hjälten. Allierade hittas, fiender identifieras, reglerna i den nya världen lärs in." },
  ] : [
    { label: "Ordinary World", text: "Elara lives as a horse thief on the impoverished outskirts of the empire. She is skilled, cynical, and has learned not to trust anyone — least of all those in power.", color: C.act1, explanation: "We establish the hero's normal existence. The contrast with what is to come is crucial: we must understand what the hero is leaving behind." },
    { label: "Call to Adventure", text: "A dying soldier hands her a seal with a map and whispers a name: the vanished king everyone believes is legend. Elara is the only one who knows he is real.", color: C.act1, explanation: "A challenge appears that disrupts the ordinary world. The hero is called to step outside their comfort zone." },
    { label: "Refusal of the Call", text: "Elara burns the map. It is not her war, not her king. She has survived eight years without caring about the realm — she is not about to start now.", color: C.act2a, explanation: "The hero hesitates or refuses the call. Refusal is human and necessary — it shows that the stakes are real." },
    { label: "Meeting the Mentor", text: "The blind librarian Oryn finds her anyway. He already knows who she is — and what the seal means. He does not offer her a mission, but a choice: keep running, or understand why she always runs.", color: C.act2a, explanation: "A wisdom figure gives the hero what they need to take the step — without making the journey for them." },
    { label: "Crossing the Threshold", text: "The emperor's soldiers burn down the village. Elara has nowhere left to turn. She takes the map Oryn drew from memory and rides toward the mountain in the north.", color: C.act2a, explanation: "The hero leaves the known world and enters the adventure world. It is the point of no return." },
    { label: "Tests, Allies, Enemies", text: "In the northern wastes she meets Renn, a deserter with a price on his head, and Siv, a sorceress who hates Elara for what her father once did. They need each other. It is not enough.", color: C.act2a, explanation: "The new world tests the hero. Allies are found, enemies identified, the rules of the new world are learned." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F.serif, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .landing-fade { animation: fadeUp 0.6s ease both; }
        .landing-fade-2 { animation: fadeUp 0.6s ease 0.15s both; }
        .landing-fade-3 { animation: fadeUp 0.6s ease 0.3s both; }
        .cta-btn:hover { background: #2a2a28 !important; }
        @media (max-width: 640px) {
          .hero-title { font-size: 32px !important; }
          .section-pad { padding: 60px 20px !important; }
          .step-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "14px 40px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <QuillIcon size={22} />
          <span style={{ fontSize: "18px", fontFamily: F.serif, color: C.ink }}>{c.nav}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => onEnter(lang)} className="cta-btn" style={{ background: C.ink, border: "none", color: "#fff", borderRadius: "6px", padding: "8px 18px", cursor: "pointer", fontFamily: F.serif, fontSize: "14px", transition: "background 0.2s" }}>
            {c.cta}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-pad" style={{ padding: "100px 40px 80px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 className="hero-title landing-fade" style={{ fontSize: "44px", fontWeight: "400", lineHeight: 1.15, marginBottom: "20px", color: C.ink }}>
          {c.tagline}
        </h1>
        <p className="landing-fade-2" style={{ fontSize: "18px", color: C.inkDim, lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 36px" }}>
          {c.sub}
        </p>
        <div className="landing-fade-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => onEnter("sv")} className="cta-btn" style={{
              background: lang === "sv" ? C.ink : "#fff",
              border: `2px solid ${C.ink}`,
              color: lang === "sv" ? "#fff" : C.ink,
              borderRadius: "6px", padding: "14px 32px", cursor: "pointer",
              fontFamily: F.serif, fontSize: "17px", transition: "all 0.2s",
            }}>
              Svenska
            </button>
            <button onClick={() => onEnter("en")} className="cta-btn" style={{
              background: lang === "en" ? C.ink : "#fff",
              border: `2px solid ${C.ink}`,
              color: lang === "en" ? "#fff" : C.ink,
              borderRadius: "6px", padding: "14px 32px", cursor: "pointer",
              fontFamily: F.serif, fontSize: "17px", transition: "all 0.2s",
            }}>
              English
            </button>
          </div>
          <span style={{ fontSize: "13px", color: C.inkFaint, fontStyle: "italic" }}>{c.free}</span>
        </div>
      </section>

      {/* Structure preview */}
      <section style={{ background: "#fff", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section-pad" style={{ padding: "60px 40px", maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", color: C.inkFaint, fontFamily: F.serif, marginBottom: "6px", letterSpacing: "1px" }}>{c.previewTitle.toUpperCase()}</p>
          <p style={{ fontSize: "15px", color: C.inkDim, fontStyle: "italic", marginBottom: "32px" }}>{c.previewSub}</p>
          <div style={{ position: "relative" }}>
            {previewBeats.map((b, i) => <BeatPreview key={i} {...b} sv={sv} />)}
            {/* Fade-out overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.97) 70%, #fff 100%)",
              display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "16px",
            }}>
              <button onClick={() => onEnter(lang)} className="cta-btn" style={{
                background: C.ink, border: "none", color: "#fff", borderRadius: "6px",
                padding: "12px 24px", cursor: "pointer", fontFamily: F.serif, fontSize: "15px",
                transition: "background 0.2s",
              }}>
                {sv ? "Se hela strukturen i appen" : "See the full structure in the app"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad" style={{ padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "400", marginBottom: "40px", color: C.ink }}>{c.howTitle}</h2>
        <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px" }}>
          {c.steps.map((s, i) => (
            <div key={i}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "14px", color: C.inkDim, fontFamily: F.serif }}>{s.n}</span>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: "400", marginBottom: "8px", color: C.ink }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: C.inkDim, lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "40px", fontSize: "15px", color: C.inkDim, fontStyle: "italic", lineHeight: 1.7, fontFamily: "Georgia, serif", borderLeft: `3px solid ${C.border}`, paddingLeft: "16px" }}>
          {c.skeptic}
        </p>
      </section>

      {/* Features */}
      <section style={{ background: "#fff", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section-pad" style={{ padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "400", marginBottom: "32px", color: C.ink }}>{c.featTitle}</h2>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {c.features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: C.act1, fontSize: "16px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "15px", color: C.ink, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad" style={{ padding: "80px 40px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "400", marginBottom: "16px", color: C.ink }}>{c.ctaTitle}</h2>
        <p style={{ fontSize: "16px", color: C.inkDim, marginBottom: "32px" }}>{c.free}</p>
        <button onClick={() => onEnter(lang)} className="cta-btn" style={{ background: C.ink, border: "none", color: "#fff", borderRadius: "6px", padding: "16px 36px", cursor: "pointer", fontFamily: F.serif, fontSize: "17px", transition: "background 0.2s" }}>
          {c.cta}
        </button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <QuillIcon size={16} />
          <span style={{ fontSize: "14px", color: C.inkDim, fontFamily: F.serif }}>Dramaturg</span>
        </div>
        <span style={{ fontSize: "13px", color: C.inkFaint, fontStyle: "italic" }}>{c.footer}</span>
      </footer>
    </div>
  );
}