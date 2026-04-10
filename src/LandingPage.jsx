import { useState } from "react";

const F = { serif: "Georgia, serif" };
const C = {
  bg: "#f7f5f0", ink: "#111110", inkDim: "#555550", inkFaint: "#aaa9a3",
  border: "rgba(0,0,0,0.12)", act1: "#2d6e3a", act2a: "#185fa5", act2b: "#7a3a20",
};

const QuillIcon = ({ size = 22 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
    <path d="M12 49 Q12 56 20 56 Q28 56 28 49 L27 44 Q23 41 20 41 Q17 41 13 44 Z" fill="#1a1a18"/>
    <ellipse cx="20" cy="44" rx="8" ry="3" fill="#3a3a34"/>
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

const COPY = {
  sv: {
    tagline: "Vet du vad du vill skriva, men inte hur?",
    sub: "Beskriv din idé och dina karaktärer. Dramaturg genererar en komplett dramaturgistruktur anpassad till just din historia.",
    cta: "Prova gratis",
    free: "Inget konto krävs. Gratis att använda.",
    howTitle: "Hur det fungerar",
    ctaTitle: "Redo att ge din berättelse form?",
    skeptic: "Dramaturgi behöver inte vara ett tvång. Många av de bästa berättelserna börjar med en struktur — och hittar sin form när de bryter mot den.",
    steps: [
      { n: "1", title: "Välj modell", desc: "Save the Cat, Hjälteresan eller Freytags pyramid — beroende på vilken typ av berättelse du skriver." },
      { n: "2", title: "Beskriv din historia", desc: "Skriv en logline, välj genre och ton, och lägg till dina karaktärer med deras drivkrafter." },
      { n: "3", title: "Forma strukturen", desc: "Du får ett komplett förslag steg för steg. Ge feedback, redigera direkt och exportera när du är klar." },
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
    previewBeats: [
      { label: "Den vanliga världen", text: "Elara lever som hästtjuv i det fattiga utkanten av kejsardömet. Hon är skicklig, cynisk och har lärt sig att inte lita på någon — minst av allt makten.", color: C.act1 },
      { label: "Kallelsen", text: "En döende soldat räcker henne ett sigill med en karta och viskar ett namn: den försvunne kung som alla tror är legend. Elara är den enda som vet att han är verklig.", color: C.act1 },
      { label: "Vägran", text: "Elara bränner kartan. Det är inte hennes krig, inte hennes kung. Hon har överlevt i åtta år utan att bry sig om riket — hon tänker inte börja nu.", color: C.act2a },
      { label: "Mötet med mentorn", text: "Den blinde bibliotekarien Oryn hittar henne ändå. Han vet redan vem hon är — och vad sigillet betyder. Han erbjuder henne inte ett uppdrag, utan ett val.", color: C.act2a },
      { label: "Tröskelövergången", text: "Kejsarens soldater bränner ner byn. Elara har ingenstans att vända sig. Hon tar kartan Oryn rittat ur minnet och rider mot berget i norr.", color: C.act2a },
      { label: "Prövningar och allierade", text: "I de norra vidderna möter hon Renn, en deserterad soldat med ett pris på huvudet, och Siv, en trollkvinna som hatar Elara för vad hennes far en gång gjorde.", color: C.act2a },
    ],
  },
  en: {
    tagline: "You know what you want to write — but not how?",
    sub: "Describe your story idea and characters. Dramaturg generates a complete dramatic structure tailored to your story.",
    cta: "Try for free",
    free: "No account needed. Free to use.",
    howTitle: "How it works",
    ctaTitle: "Ready to give your story shape?",
    skeptic: "Structure doesn't have to be a constraint. Many of the best stories begin with a framework — and find their form by breaking it.",
    steps: [
      { n: "1", title: "Choose a model", desc: "Save the Cat, The Hero's Journey or Freytag's Pyramid — depending on what kind of story you're writing." },
      { n: "2", title: "Describe your story", desc: "Write a logline, choose genre and tone, and add your characters with their motivations." },
      { n: "3", title: "Shape the structure", desc: "You get a complete suggestion step by step. Give feedback, edit directly and export when you're done." },
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
    previewBeats: [
      { label: "Ordinary World", text: "Elara lives as a horse thief on the impoverished outskirts of the empire. She is skilled, cynical, and has learned not to trust anyone — least of all those in power.", color: C.act1 },
      { label: "Call to Adventure", text: "A dying soldier hands her a seal with a map and whispers a name: the vanished king everyone believes is legend. Elara is the only one who knows he is real.", color: C.act1 },
      { label: "Refusal of the Call", text: "Elara burns the map. It is not her war, not her king. She has survived eight years without caring about the realm — she is not about to start now.", color: C.act2a },
      { label: "Meeting the Mentor", text: "The blind librarian Oryn finds her anyway. He already knows who she is — and what the seal means. He does not offer her a mission, but a choice.", color: C.act2a },
      { label: "Crossing the Threshold", text: "The emperor's soldiers burn down the village. Elara has nowhere left to turn. She takes the map Oryn drew from memory and rides toward the mountain in the north.", color: C.act2a },
      { label: "Tests, Allies, Enemies", text: "In the northern wastes she meets Renn, a deserter with a price on his head, and Siv, a sorceress who hates Elara for what her father once did.", color: C.act2a },
    ],
  },
  no: {
    tagline: "Vet du hva du vil skrive — men ikke hvordan?",
    sub: "Beskriv idéen din og karakterene dine. Dramaturg genererer en komplett dramaturgisk struktur tilpasset akkurat din historie.",
    cta: "Prøv gratis",
    free: "Ingen konto nødvendig. Gratis å bruke.",
    howTitle: "Slik fungerer det",
    ctaTitle: "Klar til å gi historien din form?",
    skeptic: "Dramaturgi trenger ikke være tvang. Mange av de beste historiene begynner med en struktur — og finner sin form når de bryter mot den.",
    steps: [
      { n: "1", title: "Velg modell", desc: "Save the Cat, Heltereisen eller Freytags Pyramide — avhengig av hva slags historie du skriver." },
      { n: "2", title: "Beskriv historien din", desc: "Skriv en logline, velg sjanger og tone, og legg til karakterene dine med motivasjonene deres." },
      { n: "3", title: "Form strukturen", desc: "Du får et komplett forslag trinn for trinn. Gi tilbakemelding, rediger direkte og eksporter når du er ferdig." },
    ],
    featTitle: "Hva du får",
    features: [
      "Tre dramaturgimodeller med forklaringer",
      "En komplett dramaturgisk struktur tilpasset din historie",
      "Gi tilbakemelding og juster enkeltdeler med AI-hjelp",
      "Eksporter som PDF, Word eller Markdown",
    ],
    previewTitle: "Et eksempel",
    previewSub: "Fra en generert dramaturgisk struktur for en fantasyroman — Heltereisen",
    footer: "Dramaturg — et verktøy for fortellere med en idé som vil finne sin form.",
    previewBeats: [
      { label: "Den vanlige verden", text: "Elara lever som hestyv i den fattige utkanten av keiserdømmet. Hun er dyktig, kynisk og har lært seg å ikke stole på noen — minst av alt makten.", color: C.act1 },
      { label: "Kallelsen", text: "En døende soldat rekker henne et segl med et kart og hvisker et navn: den forsvunne kongen som alle tror er en legende. Elara er den eneste som vet at han er virkelig.", color: C.act1 },
      { label: "Vegringa", text: "Elara brenner kartet. Det er ikke hennes krig, ikke hennes konge. Hun har overlevd i åtte år uten å bry seg om riket — hun har ikke tenkt å begynne nå.", color: C.act2a },
      { label: "Møtet med mentoren", text: "Den blinde bibliotekaren Oryn finner henne likevel. Han vet allerede hvem hun er — og hva seglet betyr. Han tilbyr henne ikke et oppdrag, men et valg.", color: C.act2a },
      { label: "Terskelpassasjen", text: "Keiserens soldater brenner ned landsbyen. Elara har ingen steder å vende seg. Hun tar kartet Oryn tegnet av hukommelsen og rir mot fjellet i nord.", color: C.act2a },
      { label: "Prøvelser og allierte", text: "I de nordlige vidder møter hun Renn, en desertert soldat med en pris på hodet, og Siv, en trollkvinne som hater Elara for hva hennes far en gang gjorde.", color: C.act2a },
    ],
  },
  da: {
    tagline: "Ved du hvad du vil skrive — men ikke hvordan?",
    sub: "Beskriv din idé og dine karakterer. Dramaturg genererer en komplet dramaturgisk struktur tilpasset netop din historie.",
    cta: "Prøv gratis",
    free: "Ingen konto kræves. Gratis at bruge.",
    howTitle: "Sådan fungerer det",
    ctaTitle: "Klar til at give din historie form?",
    skeptic: "Dramaturgi behøver ikke være tvang. Mange af de bedste historier begynder med en struktur — og finder sin form, når de bryder med den.",
    steps: [
      { n: "1", title: "Vælg model", desc: "Save the Cat, Helterejsen eller Freytags Pyramide — afhængigt af hvilken slags historie du skriver." },
      { n: "2", title: "Beskriv din historie", desc: "Skriv en logline, vælg genre og tone, og tilføj dine karakterer med deres motivationer." },
      { n: "3", title: "Form strukturen", desc: "Du får et komplet forslag trin for trin. Giv feedback, rediger direkte og eksportér når du er færdig." },
    ],
    featTitle: "Hvad du får",
    features: [
      "Tre dramaturgimodeller med forklaringer",
      "En komplet dramaturgisk struktur tilpasset din historie",
      "Giv feedback og juster enkeltdele med AI-hjælp",
      "Eksportér som PDF, Word eller Markdown",
    ],
    previewTitle: "Et eksempel",
    previewSub: "Fra en genereret dramaturgisk struktur for en fantasyroman — Helterejsen",
    footer: "Dramaturg — et værktøj for fortællere med en idé der vil finde sin form.",
    previewBeats: [
      { label: "Den almindelige verden", text: "Elara lever som hestetysv i den fattige udkant af kejserdømmet. Hun er dygtig, kynisk og har lært ikke at stole på nogen — mindst af alt magten.", color: C.act1 },
      { label: "Kaldet til eventyr", text: "En døende soldat rækker hende et segl med et kort og hvisker et navn: den forsvundne konge som alle tror er legende. Elara er den eneste der ved at han er virkelig.", color: C.act1 },
      { label: "Afvisning af kaldet", text: "Elara brænder kortet. Det er ikke hendes krig, ikke hendes konge. Hun har overlevet i otte år uden at bekymre sig om riget — hun agter ikke at begynde nu.", color: C.act2a },
      { label: "Mødet med mentoren", text: "Den blinde bibliotekar Oryn finder hende alligevel. Han ved allerede hvem hun er — og hvad seglet betyder. Han tilbyder hende ikke et opdrag, men et valg.", color: C.act2a },
      { label: "Tærskelpassagen", text: "Kejserens soldater brænder landsbyen ned. Elara har ingen steder at vende sig. Hun tager kortet Oryn tegnede af hukommelsen og rider mod bjerget i nord.", color: C.act2a },
      { label: "Prøvelser og allierede", text: "I de nordlige vidder møder hun Renn, en deserteret soldat med en pris på hovedet, og Siv, en troldkvinde der hader Elara for hvad hendes far engang gjorde.", color: C.act2a },
    ],
  },
};

export default function LandingPage({ onEnter, lang: initialLang }) {
  const detectLang = () => {
    try {
      const l = navigator.language || "sv";
      if (l.startsWith("no")) return "no";
      if (l.startsWith("da")) return "da";
      if (l.startsWith("en")) return "en";
      return "sv";
    } catch {
      return "sv";
    }
  };

  const [lang, setLang] = useState(() => initialLang || detectLang());
  const c = COPY[lang] || COPY.sv;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F.serif, color: C.ink }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .lp-fade1 { animation: fadeUp 0.5s ease both; }
        .lp-fade2 { animation: fadeUp 0.5s ease 0.12s both; }
        .lp-fade3 { animation: fadeUp 0.5s ease 0.24s both; }
        .lp-cta:hover { background: #2a2a28 !important; }
        @media (max-width: 640px) {
          .lp-hero-title { font-size: 30px !important; }
          .lp-pad { padding: 50px 20px !important; }
          .lp-grid3 { grid-template-columns: 1fr !important; }
          .lp-grid2 { grid-template-columns: 1fr !important; }
          .lp-nav { padding: 12px 20px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="lp-nav" style={{ borderBottom: `1px solid ${C.border}`, padding: "14px 40px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <QuillIcon size={22} />
          <span style={{ fontSize: "18px", color: C.ink }}>Dramaturg</span>
        </div>
        <div style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: "6px", overflow: "hidden" }}>
          {["sv","en","no","da"].map((l, i) => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? C.ink : "transparent",
              color: lang === l ? "#fff" : C.inkDim,
              border: "none",
              borderLeft: i > 0 ? `1px solid ${C.border}` : "none",
              padding: "5px 10px", cursor: "pointer",
              fontFamily: F.serif, fontSize: "13px", transition: "all 0.15s",
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="lp-pad" style={{ padding: "90px 40px 70px", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <h1 className="lp-hero-title lp-fade1" style={{ fontSize: "42px", fontWeight: "400", lineHeight: 1.2, marginBottom: "18px" }}>
          {c.tagline}
        </h1>
        <p className="lp-fade2" style={{ fontSize: "18px", color: C.inkDim, lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 32px" }}>
          {c.sub}
        </p>
        <div className="lp-fade3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <button onClick={() => onEnter(lang)} className="lp-cta" style={{
            background: C.ink, border: "none", color: "#fff", borderRadius: "6px",
            padding: "15px 36px", cursor: "pointer", fontFamily: F.serif, fontSize: "17px", transition: "background 0.2s",
          }}>{c.cta}</button>
          <span style={{ fontSize: "13px", color: C.inkFaint, fontStyle: "italic" }}>{c.free}</span>
        </div>
      </section>

      {/* Preview */}
      <section style={{ background: "#fff", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="lp-pad" style={{ padding: "60px 40px", maxWidth: "660px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", color: C.inkFaint, marginBottom: "6px", letterSpacing: "1px" }}>{c.previewTitle.toUpperCase()}</p>
          <p style={{ fontSize: "15px", color: C.inkDim, fontStyle: "italic", marginBottom: "32px" }}>{c.previewSub}</p>
          {c.previewBeats.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
              <div style={{ width: "3px", background: b.color, borderRadius: "2px", flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: "12px", color: b.color }}>{b.label}</p>
                <p style={{ margin: 0, fontSize: "15px", color: C.ink, lineHeight: 1.65 }}>{b.text}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button onClick={() => onEnter(lang)} className="lp-cta" style={{
              background: "none", border: `1px solid ${C.border}`, color: C.inkDim,
              borderRadius: "6px", padding: "10px 22px", cursor: "pointer",
              fontFamily: F.serif, fontSize: "14px", transition: "all 0.15s",
            }}>
              {lang === "sv" ? "Se hela strukturen i appen" : lang === "no" ? "Se hele strukturen i appen" : lang === "da" ? "Se hele strukturen i appen" : "See the full structure in the app"}
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="lp-pad" style={{ padding: "70px 40px", maxWidth: "760px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "400", marginBottom: "36px" }}>{c.howTitle}</h2>
        <div className="lp-grid3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "28px" }}>
          {c.steps.map((s, i) => (
            <div key={i}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", color: C.inkDim }}>{s.n}</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "400", marginBottom: "8px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: C.inkDim, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#fff", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="lp-pad" style={{ padding: "70px 40px", maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "26px", fontWeight: "400", marginBottom: "28px" }}>{c.featTitle}</h2>
          <div className="lp-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {c.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: C.act1, fontSize: "15px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "15px", lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skeptic + bottom CTA */}
      <section className="lp-pad" style={{ padding: "70px 40px", textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
        <p style={{ fontSize: "16px", color: C.inkDim, fontStyle: "italic", lineHeight: 1.7, marginBottom: "40px" }}>{c.skeptic}</p>
        <h2 style={{ fontSize: "26px", fontWeight: "400", marginBottom: "14px" }}>{c.ctaTitle}</h2>
        <p style={{ fontSize: "14px", color: C.inkFaint, marginBottom: "24px" }}>{c.free}</p>
        <button onClick={() => onEnter(lang)} className="lp-cta" style={{
          background: C.ink, border: "none", color: "#fff", borderRadius: "6px",
          padding: "15px 36px", cursor: "pointer", fontFamily: F.serif, fontSize: "17px", transition: "background 0.2s",
        }}>{c.cta}</button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <QuillIcon size={16} />
          <span style={{ fontSize: "14px", color: C.inkDim }}>Dramaturg</span>
        </div>
        <span style={{ fontSize: "13px", color: C.inkFaint, fontStyle: "italic" }}>{c.footer}</span>
      </footer>
    </div>
  );
}