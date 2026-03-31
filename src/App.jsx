import { useState, useRef } from "react";

const C = {
  bg:        "#f5f2ed",        // pappersVit
  surface:   "rgba(0,0,0,0.03)",
  border:    "rgba(0,0,0,0.12)",
  borderHov: "rgba(0,0,0,0.45)",
  ink:       "#1a1a18",        // nästan svart bläck
  inkDim:    "#6a6a62",        // bleknat bläck
  inkFaint:  "#b8b5ae",        // ytterst blekt
  accent:    "#3a3a34",        // mörkt bläck
  accentHi:  "#0e0e0c",        // djupsvart
  act1:      "#4a7a5a",        // mörkgrön
  act2a:     "#3a6070",        // mörkblå
  act2b:     "#805040",        // terrakotta
  act3:      "#7a6030",        // mörkguld
  err:       "#a03030",
};

// ─── BEAT EXPLANATIONS ───────────────────────────────────────────────────────
const BEAT_EXPLANATIONS = {
  sv: {
    opening_image:     "Den första bilden sätter hela berättelsens tonalitet och världsbild. Det är ett ögonblicksporträtt av protagonistens liv INNAN förändringen sker — kontrasten mot slutbilden visar hur lång resa hen gjort.",
    theme_stated:      "Berättelsens djupare fråga formuleras, ofta i förbifarten av en bikaraktär. Det är inte moralen i sig — det är frågan som berättelsen kommer att utforska och besvara på sitt eget vis.",
    setup:             "Vi lär känna protagonistens värld, vanor och det som är trasigt i hens liv utan att hen vet om det. Allt som planteras här — karaktärer, objekt, relationer — kommer att betalas av senare.",
    catalyst:          "Det händer något som slår omkull protagonistens vanliga värld och tvingar fram ett val. Utan denna händelse skulle berättelsen inte existera. Den är extern, dramatisk och oväntad.",
    debate:            "Protagonisten tvekar. Ska hen kliva in i det okända? Det är en inre kamp mellan det bekanta och det skrämmande nya. Tveksamheten gör att vi bryr oss — ingen utan rädslor är intressant.",
    break_into_two:    "Protagonisten fattar ett aktivt beslut och kliver in i Akt II — en ny värld med nya regler. Hen går inte dit av misstag. Det är ett medvetet val som förändrar allt.",
    b_story:           "En sekundär berättelsegång introduceras, ofta en relation. B-storyn bär temat — det är här hjälten egentligen lär sig livets läxa, även om hen tror att A-storyn är det viktiga.",
    fun_and_games:     "Löftet i loglinens uppfylls. Det är anledningen till att tittaren kom — den roliga, skrämmande eller spännande kärnan av berättelsen. Ännu ingen riktig kris, bara möjligheter och utforskande.",
    midpoint:          "Antingen en falsk seger (allt verkar gå bra) eller ett falskt nederlag (allt verkar gå fel). Insatserna höjs dramatiskt. Protagonisten är nu helhjärtat engagerad — det finns ingen väg tillbaka.",
    bad_guys_close_in: "Protagonistens inre och yttre fiender börjar vinna. Gruppen splittras, planer faller samman, tvivel gror. Det är den långsamma förknippningen av allting som byggdes upp.",
    all_is_lost:       "Det mörkaste ögonblicket. Protagonisten förlorar det hen kämpat för — eller tror att hen gör det. Ofta finns en 'whiff of death' här: något dör, bokstavligen eller symboliskt.",
    dark_night:        "Protagonisten är ensam i sitt mörkaste rum, utan hopp och utan svar. Det är precis detta tomrum som skapar utrymmet för den avgörande insikten — temats svar måste hittas inifrån, inte utifrån.",
    break_into_three:  "En ny insikt — ofta tack vare B-storyn — ger protagonisten det hen behöver för att försöka igen. Akt III är möjlig bara för att Akt II lärde hen något om sig själv.",
    finale:            "Protagonisten bevisar att hen har förändrats. Det räcker inte att ha lärt sig läxan i tanken — hen måste omsätta den i handling och besegra det yttre problemet på ett nytt sätt.",
    final_image:       "Spegeln av öppningsbilden, men nu omvänd. Protagonistens värld ser likadan ut — men det gör den inte. Vi ser hur lång resa som gjorts och vad förändringen faktiskt kostade.",
    // Hero's Journey
    ordinary_world:    "Vi etablerar hjältens normala tillvaro — vardagen, världsbilden, det som är välkänt. Kontrasten mot vad som komma skall är avgörande: vi måste förstå vad hjälten lämnar bakom sig.",
    call_to_adventure: "En utmaning, ett problem eller ett äventyr dyker upp som stör den vanliga världen. Hjälten kallas att kliva utanför sin bekvämlighetszon — in i det okända.",
    refusal:           "Hjälten tvekar eller nekar kallelsen. Rädsla, skyldigheter, tvivel — vägran är mänsklig och nödvändig. Den visar att stakes är verkliga och att resan inte är lätt.",
    mentor:            "En visdomsfigur ger hjälten vad hen behöver för att ta steget: kunskap, verktyg, mod eller välsignelse. Mentorn förbereder hjälten utan att göra resan åt hen.",
    crossing_threshold:"Hjälten lämnar den kända världen och kliver in i äventyrets värld. Det är point of no return — den verkliga resan börjar här.",
    tests_allies_enemies:"Den nya världen testar hjälten. Allierade hittas, fiender identifieras, reglerna i den nya världen lärs in. Hjälten förbereder sig för den stora prövningen.",
    innermost_cave:    "Hjälten närmar sig källan till den största faran eller fruktan. Det är en förberedelse, en gräns till det innersta — ofta en psykologisk tröskel lika mycket som en fysisk.",
    ordeal:            "Den centrala krisen — hjälten möter sin största rädsla och riskerar att dö (bokstavligen eller symboliskt). Det är döden och återfödelsen i berättelsens hjärta.",
    reward:            "Hjälten överlever och belönas — ett svärd, en insikt, ett erkännande. Men faran är inte över. Belöningen är ett resultat av ordeal, inte en slutpunkt.",
    road_back:         "Hjälten vänder mot hemvärlden men jagades fortfarande av konsekvenserna av sina handlingar. Den yttre faran är inte borta — och insikterna måste nu integreras.",
    resurrection:      "Den sista, avgörande prövningen. Hjälten måste visa att hen verkligen har förändrats — gamla vanor, gamla rädslor prövas en sista gång. Endast den förnyade hjälten kan segra.",
    return_with_elixir:"Hjälten återvänder till den vanliga världen med ett 'eliksir' — ett fysiskt föremål, en insikt, kärlek — som kan hela hemvärlden. Resan har förändrat både hjälten och världen.",
    // Freytag
    exposition:        "Grundförutsättningarna läggs ut: tid, plats, karaktärer och den konfliktkimande situationen. Exposition är bakgrundsmusiken — den ska vara knappt märkbar men avgörande.",
    inciting_incident: "Den händelse som sätter berättelsens konflikt i rörelse. Det är störningen av status quo, gnistan som antänder handlingens långa led.",
    rising_action:     "En serie händelser som bygger spänning och komplexitet. Protagonist och antagonist möts, stakes höjs successivt, karaktärerna avslöjas under press.",
    complication:      "En ny, oväntad vändning som gör konflikten svårare att lösa. Komplikationen omdefinierar vad protagonisten faktiskt måste åstadkomma.",
    climax:            "Berättelsens vändpunkt — den avgörande konfrontationen mellan protagonist och antagonistiska krafter. Allt spänning som byggts upp löses eller exploderar här.",
    falling_action:    "Konsekvenserna av klimax faller ut. Konflikten löser sig (eller inte). Bikaraktärer hittar sina platser. Det lugnar ner sig — men ännu är inte allt sagt.",
    catastrophe:       "I klassisk tragedi: hjältens fall, det tragiska priset. I modernare drama: den sista vändningen som avgör om upplösningen blir lycklig eller sorglig.",
    resolution:        "Ny jämvikt etableras. Berättelsens frågor besvaras. Vi lämnar karaktärerna i deras nya tillstånd — förändrade, eller tragiskt oförändrade, av vad de genomlevt.",
  },
  en: {
    opening_image:     "The first image establishes the entire story's tone and worldview. It's a snapshot of the protagonist's life BEFORE change happens — the contrast with the final image shows how far they've traveled.",
    theme_stated:      "The story's deeper question is articulated, often in passing by a secondary character. It's not the moral itself — it's the question the story will explore and answer in its own way.",
    setup:             "We come to know the protagonist's world, habits, and what is broken in their life without them knowing it. Everything planted here — characters, objects, relationships — will pay off later.",
    catalyst:          "Something happens that upends the protagonist's ordinary world and forces a choice. Without this event, the story would not exist. It is external, dramatic, and unexpected.",
    debate:            "The protagonist hesitates. Should they step into the unknown? It's an inner struggle between the familiar and the frightening new. The hesitation makes us care — nobody without fears is interesting.",
    break_into_two:    "The protagonist makes an active decision and enters Act II — a new world with new rules. They don't go there by accident. It's a deliberate choice that changes everything.",
    b_story:           "A secondary storyline is introduced, often a relationship. The B story carries the theme — this is where the hero actually learns the lesson of life, even though they think the A story is what matters.",
    fun_and_games:     "The promise of the logline is fulfilled. It's why the audience came — the fun, scary, or exciting core of the story. No real crisis yet, just possibility and exploration.",
    midpoint:          "Either a false victory (everything seems fine) or a false defeat (everything seems wrong). The stakes are dramatically raised. The protagonist is now fully committed — there's no going back.",
    bad_guys_close_in: "The protagonist's inner and outer enemies start winning. The group splinters, plans fall apart, doubts grow. It's the slow unraveling of everything that was built up.",
    all_is_lost:       "The darkest moment. The protagonist loses what they fought for — or believes they do. Often there's a 'whiff of death' here: something dies, literally or symbolically.",
    dark_night:        "The protagonist is alone in their darkest room, without hope and without answers. It's precisely this emptiness that creates space for the crucial insight — the theme's answer must come from within, not without.",
    break_into_three:  "A new insight — often thanks to the B story — gives the protagonist what they need to try again. Act III is only possible because Act II taught them something about themselves.",
    finale:            "The protagonist proves they have changed. It's not enough to have learned the lesson in thought — they must put it into action and defeat the outer problem in a new way.",
    final_image:       "The mirror of the opening image, but now reversed. The protagonist's world looks the same — but it doesn't. We see how long the journey has been and what the change actually cost.",
    // Hero's Journey
    ordinary_world:    "We establish the hero's normal existence — the everyday, the worldview, the familiar. The contrast with what's to come is crucial: we must understand what the hero is leaving behind.",
    call_to_adventure: "A challenge, problem, or adventure appears that disrupts the ordinary world. The hero is called to step outside their comfort zone — into the unknown.",
    refusal:           "The hero hesitates or refuses the call. Fear, obligation, doubt — refusal is human and necessary. It shows the stakes are real and the journey is not easy.",
    mentor:            "A wisdom figure gives the hero what they need to take the step: knowledge, tools, courage, or blessing. The mentor prepares the hero without making the journey for them.",
    crossing_threshold:"The hero leaves the known world and enters the adventure world. It's the point of no return — the real journey begins here.",
    tests_allies_enemies:"The new world tests the hero. Allies are found, enemies identified, the rules of the new world are learned. The hero prepares for the supreme ordeal.",
    innermost_cave:    "The hero approaches the source of greatest danger or fear. It's a preparation, a boundary to the innermost — often a psychological threshold as much as a physical one.",
    ordeal:            "The central crisis — the hero faces their greatest fear and risks death (literally or symbolically). It's the death and rebirth at the heart of the story.",
    reward:            "The hero survives and is rewarded — a sword, an insight, recognition. But danger isn't over. The reward is a result of the ordeal, not an endpoint.",
    road_back:         "The hero turns toward the home world but is still pursued by the consequences of their actions. The outer danger isn't gone — and the insights must now be integrated.",
    resurrection:      "The final, decisive ordeal. The hero must show they have truly changed — old habits, old fears are tested one last time. Only the reborn hero can succeed.",
    return_with_elixir:"The hero returns to the ordinary world with an 'elixir' — a physical object, an insight, love — that can heal the home world. The journey has changed both the hero and the world.",
    // Freytag
    exposition:        "The basic conditions are laid out: time, place, characters, and the simmering conflict situation. Exposition is background music — it should be barely noticeable but crucial.",
    inciting_incident: "The event that sets the story's conflict in motion. It's the disruption of the status quo, the spark that ignites the long chain of action.",
    rising_action:     "A series of events that build tension and complexity. Protagonist and antagonist meet, stakes rise gradually, characters are revealed under pressure.",
    complication:      "A new, unexpected turn that makes the conflict harder to resolve. The complication redefines what the protagonist must actually accomplish.",
    climax:            "The story's turning point — the decisive confrontation between protagonist and antagonistic forces. All built-up tension resolves or explodes here.",
    falling_action:    "The consequences of the climax fall out. The conflict resolves (or doesn't). Secondary characters find their places. Things calm down — but not everything has been said.",
    catastrophe:       "In classical tragedy: the hero's fall, the tragic price. In more modern drama: the final turn that determines whether the resolution will be happy or sorrowful.",
    resolution:        "A new equilibrium is established. The story's questions are answered. We leave the characters in their new state — changed, or tragically unchanged, by what they've lived through.",
  },
};

// ─── MODELS ──────────────────────────────────────────────────────────────────
const MODELS = {
  sv: [
    { id: "save_the_cat", name: "Save the Cat", author: "Blake Snyder", tagline: "15 exakta beats, manus-preciserat", best: "Spänning, thriller, komedi — berättelser med tydlig yttre konflikt och tempo.", worst: "Litterär prosa, icke-linjära berättelser, karaktärsstudier utan tydlig yttre handling.", desc: "Varje beat har en procentuell position i manuset, vilket ger ett skelett att bygga kött på. Lämpar sig när du vill ha en färdig struktur att följa eller bryta mot medvetet." },
    { id: "hero_journey", name: "Hjälteresan", author: "Joseph Campbell / Christopher Vogler", tagline: "12 arketypiska steg, mytisk resonans", best: "Fantasy, epos, coming-of-age — berättelser om transformation och kallelse.", worst: "Ensembledrama, berättelser utan tydlig central hjälte, minimalistisk realism.", desc: "Campbells urgamla struktur, bearbetad för film av Vogler. Lika fokuserad på den inre förändringen som den yttre handlingen." },
    { id: "freytag", name: "Freytags Pyramid", author: "Gustav Freytag", tagline: "5 akter, klassisk dramatik", best: "Teaterpjäser, drama, tragedi — berättelser som undersöker konsekvenser av val.", worst: "Snabbtempad action, komedier, berättelser med många sidospår.", desc: "Gustav Freytags femaktsmodell från 1863, ursprungligen utvecklad för analys av drama och tragedi. Strukturen är enkel: exposition, stigande handling, klimax, fallande handling, upplösning — vilket ger stort tolkningsutrymme inom varje fas." },
  ],
  en: [
    { id: "save_the_cat", name: "Save the Cat", author: "Blake Snyder", tagline: "15 precise beats, screenplay-tuned", best: "Suspense, thriller, comedy — stories with clear external conflict and pace.", worst: "Literary prose, non-linear narratives, character studies without clear external plot.", desc: "Each beat has a percentage position in the screenplay, giving you a skeleton to build on. Works well when you want a ready-made structure to follow — or break deliberately." },
    { id: "hero_journey", name: "The Hero's Journey", author: "Joseph Campbell / Christopher Vogler", tagline: "12 archetypal stages, mythic resonance", best: "Fantasy, epic, coming-of-age — stories about transformation and calling.", worst: "Ensemble drama, stories without a clear central hero, minimalist realism.", desc: "Campbell's ancient structure, adapted for film by Vogler. Equally focused on inner transformation as outer action." },
    { id: "freytag", name: "Freytag's Pyramid", author: "Gustav Freytag", tagline: "5 acts, classical drama", best: "Stage plays, drama, tragedy — stories that explore the consequences of choice.", worst: "Fast-paced action, comedies, stories with many subplots.", desc: "Gustav Freytag's five-act model from 1863, originally developed to analyse drama and tragedy. The structure is straightforward — exposition, rising action, climax, falling action, resolution — leaving considerable room for interpretation within each phase." },
  ],
};

// ─── BEAT LABELS ─────────────────────────────────────────────────────────────
const BEAT_LABELS = {
  save_the_cat: {
    sv: [
      { id: "opening_image",    label: "Öppningsbild",           pct: "1%",      color: C.act1  },
      { id: "theme_stated",     label: "Temats kärna",           pct: "5%",      color: C.act1  },
      { id: "setup",            label: "Etablering",             pct: "1–10%",   color: C.act1  },
      { id: "catalyst",         label: "Katalysator",            pct: "12%",     color: C.act2a },
      { id: "debate",           label: "Debatt / Tvekan",        pct: "12–25%",  color: C.act2a },
      { id: "break_into_two",   label: "Brytpunkt — Akt II",     pct: "25%",     color: C.act2a },
      { id: "b_story",          label: "B-berättelsen",          pct: "30%",     color: C.act2a },
      { id: "fun_and_games",    label: "Löfte & underhållning",  pct: "30–55%",  color: C.act2a },
      { id: "midpoint",         label: "Mittpunkt",              pct: "50%",     color: C.act2a },
      { id: "bad_guys_close_in",label: "Fienden stänger in",     pct: "55–75%",  color: C.act2b },
      { id: "all_is_lost",      label: "Allt är förlorat",       pct: "75%",     color: C.act2b },
      { id: "dark_night",       label: "Själens mörka natt",     pct: "75–85%",  color: C.act2b },
      { id: "break_into_three", label: "Brytpunkt — Akt III",    pct: "85%",     color: C.act3  },
      { id: "finale",           label: "Final",                  pct: "85–99%",  color: C.act3  },
      { id: "final_image",      label: "Slutbild",               pct: "99%",     color: C.act3  },
    ],
    en: [
      { id: "opening_image",    label: "Opening Image",          pct: "1%",      color: C.act1  },
      { id: "theme_stated",     label: "Theme Stated",           pct: "5%",      color: C.act1  },
      { id: "setup",            label: "Set-Up",                 pct: "1–10%",   color: C.act1  },
      { id: "catalyst",         label: "Catalyst",               pct: "12%",     color: C.act2a },
      { id: "debate",           label: "Debate",                 pct: "12–25%",  color: C.act2a },
      { id: "break_into_two",   label: "Break into Two",         pct: "25%",     color: C.act2a },
      { id: "b_story",          label: "B Story",                pct: "30%",     color: C.act2a },
      { id: "fun_and_games",    label: "Fun & Games",            pct: "30–55%",  color: C.act2a },
      { id: "midpoint",         label: "Midpoint",               pct: "50%",     color: C.act2a },
      { id: "bad_guys_close_in",label: "Bad Guys Close In",      pct: "55–75%",  color: C.act2b },
      { id: "all_is_lost",      label: "All Is Lost",            pct: "75%",     color: C.act2b },
      { id: "dark_night",       label: "Dark Night of the Soul", pct: "75–85%",  color: C.act2b },
      { id: "break_into_three", label: "Break into Three",       pct: "85%",     color: C.act3  },
      { id: "finale",           label: "Finale",                 pct: "85–99%",  color: C.act3  },
      { id: "final_image",      label: "Final Image",            pct: "99%",     color: C.act3  },
    ],
  },
  hero_journey: {
    sv: [
      { id: "ordinary_world",      label: "Den vanliga världen",     pct: "1–10%",  color: C.act1  },
      { id: "call_to_adventure",   label: "Kallelsen",               pct: "10–12%", color: C.act1  },
      { id: "refusal",             label: "Vägran",                  pct: "12–20%", color: C.act2a },
      { id: "mentor",              label: "Mötet med mentorn",       pct: "20–25%", color: C.act2a },
      { id: "crossing_threshold",  label: "Tröskelövergången",       pct: "25%",    color: C.act2a },
      { id: "tests_allies_enemies",label: "Prövningar & allierade",  pct: "30–50%", color: C.act2a },
      { id: "innermost_cave",      label: "Den innersta grottan",    pct: "50%",    color: C.act2b },
      { id: "ordeal",              label: "Den stora prövningen",    pct: "55–70%", color: C.act2b },
      { id: "reward",              label: "Belöningen",              pct: "70–75%", color: C.act2b },
      { id: "road_back",           label: "Vägen tillbaka",          pct: "75–85%", color: C.act3  },
      { id: "resurrection",        label: "Återuppståndelsen",       pct: "85–95%", color: C.act3  },
      { id: "return_with_elixir",  label: "Återkomsten med eliksir", pct: "95–99%", color: C.act3  },
    ],
    en: [
      { id: "ordinary_world",      label: "Ordinary World",          pct: "1–10%",  color: C.act1  },
      { id: "call_to_adventure",   label: "Call to Adventure",       pct: "10–12%", color: C.act1  },
      { id: "refusal",             label: "Refusal of the Call",     pct: "12–20%", color: C.act2a },
      { id: "mentor",              label: "Meeting the Mentor",      pct: "20–25%", color: C.act2a },
      { id: "crossing_threshold",  label: "Crossing the Threshold",  pct: "25%",    color: C.act2a },
      { id: "tests_allies_enemies",label: "Tests, Allies, Enemies",  pct: "30–50%", color: C.act2a },
      { id: "innermost_cave",      label: "The Innermost Cave",      pct: "50%",    color: C.act2b },
      { id: "ordeal",              label: "The Ordeal",              pct: "55–70%", color: C.act2b },
      { id: "reward",              label: "The Reward",              pct: "70–75%", color: C.act2b },
      { id: "road_back",           label: "The Road Back",           pct: "75–85%", color: C.act3  },
      { id: "resurrection",        label: "The Resurrection",        pct: "85–95%", color: C.act3  },
      { id: "return_with_elixir",  label: "Return with the Elixir",  pct: "95–99%", color: C.act3  },
    ],
  },
  freytag: {
    sv: [
      { id: "exposition",        label: "Exposition",                  pct: "1–20%",  color: C.act1  },
      { id: "inciting_incident", label: "Det utlösande ögonblicket",   pct: "20%",    color: C.act1  },
      { id: "rising_action",     label: "Stigande handling",           pct: "20–50%", color: C.act2a },
      { id: "complication",      label: "Komplikation",                pct: "40–55%", color: C.act2a },
      { id: "climax",            label: "Klimax",                      pct: "50–60%", color: C.act2b },
      { id: "falling_action",    label: "Fallande handling",           pct: "60–85%", color: C.act3  },
      { id: "catastrophe",       label: "Katastrof / Vändning",        pct: "80–90%", color: C.act3  },
      { id: "resolution",        label: "Upplösning",                  pct: "90–99%", color: C.act3  },
    ],
    en: [
      { id: "exposition",        label: "Exposition",                  pct: "1–20%",  color: C.act1  },
      { id: "inciting_incident", label: "Inciting Incident",           pct: "20%",    color: C.act1  },
      { id: "rising_action",     label: "Rising Action",               pct: "20–50%", color: C.act2a },
      { id: "complication",      label: "Complication",                pct: "40–55%", color: C.act2a },
      { id: "climax",            label: "Climax",                      pct: "50–60%", color: C.act2b },
      { id: "falling_action",    label: "Falling Action",              pct: "60–85%", color: C.act3  },
      { id: "catastrophe",       label: "Catastrophe / Turn",          pct: "80–90%", color: C.act3  },
      { id: "resolution",        label: "Resolution",                  pct: "90–99%", color: C.act3  },
    ],
  },
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  sv: {
    appSubtitle: "AI-ASSISTENT FÖR BERÄTTARSTRUKTURER",
    steps: ["Språk", "Modell", "Idé", "Karaktärer", "Beat Sheet"],
    modelStep: { heading: "Välj dramaturgimodell", sub: "", bestLabel: "Passar bäst för", worstLabel: "Mindre lämpat för", btn: "NÄSTA: BERÄTTELSEIDÉ →" },
    ideaStep: { heading: "Din berättelseidé", sub: "Börja med kärnan — vad handlar berättelsen om?", loglineLabel: "Logline *", loglinePlaceholder: "En mening som fångar berättelsens essens: vem är protagonisten, vad vill hen, och vad är hindret?", titleLabel: "Titel (valfri)", titlePlaceholder: "Arbetstiteln", genreLabel: "Genre", toneLabel: "Ton & stämning", btn: "NÄSTA: KARAKTÄRER →" },
    charStep: { heading: "Karaktärer", sub: "Lägg till dina viktigaste karaktärer. Minst en krävs.", nameLabel: "Namn", namePlaceholder: "Karaktärens namn", roleLabel: "Roll", descLabel: "Bakgrund & drivkraft", descPlaceholder: "Vad vill karaktären? Vad hindrar hen?", addBtn: "+ LÄGG TILL KARAKTÄR", backBtn: "← TILLBAKA", nextBtn: "GENERERA BEAT SHEET →" },
    beatStep: {
      fallbackTitle: "Beat Sheet", newBtn: "NY BERÄTTELSE", generating: "Bygger dramaturgisk struktur…",
      error: "Något gick fel. Kontrollera att du har en giltig API-nyckel.",
      tip: "TIPS: Detta beat sheet är ett förslag, inte en tvångströja. Använd det som en karta att avvika ifrån.",
      generatingBeat: "Genererar…", feedbackPlaceholder: "Skriv feedback — t.ex. 'för klichéartat' eller 'protagonisten skulle aldrig göra så här'…",
      feedbackBtn: "REGENERERA HÄRIFRÅN →", regenerating: "Regenererar beat {n} och framåt…",
      whatIsThis: "Vad är detta?",
    },
    genres: ["Thriller","Drama","Komedi","Romantik","Skräck","Science Fiction","Fantasy","Action","Historisk","Biografisk","Mysterium","Äventyr"],
    tones:  ["Mörk och pressad","Lättsam och varm","Poetisk och drömskt","Satirisk","Episk","Intim och personlig","Humoristisk","Dystopisk","Romantisk","Realistisk"],
    roles: [
      { label: "Protagonist",     desc: "Huvudpersonen — den vars resa och förändring berättelsen kretsar kring." },
      { label: "Antagonist",      desc: "Den som aktivt motarbetar protagonisten. Kan vara en person, ett system eller en inre kraft." },
      { label: "Sidekick",        desc: "Den trogna följeslagaren. Speglar protagonisten och lättar ofta stämningen." },
      { label: "Mentor",          desc: "Ger protagonisten kunskap, verktyg eller mod att ta nästa steg — men gör inte resan åt hen." },
      { label: "Kärleksintresse", desc: "Bär ofta B-storyn och temat. Utmanar protagonisten på ett personligt plan." },
      { label: "Folie",           desc: "Kontrasterar mot protagonisten och gör hens egenskaper tydligare — inte nödvändigtvis en fiende." },
      { label: "Trickster",       desc: "Skapar kaos, utmanar normer och avslöjar sanningar genom humor eller oväntade handlingar." },
      { label: "Budbärare",       desc: "Levererar kallelsen eller avgörande information som sätter berättelsen i rörelse." },
      { label: "Väktare",         desc: "Testar protagonisten vid viktiga trösklar. Kan vara en prövning snarare än en fiende." },
      { label: "Skuggfigur",      desc: "Representerar protagonistens mörka sida eller det hen fruktar att bli — en spegel, inte alltid en fiende." },
    ],
  },
  en: {
    appSubtitle: "AI ASSISTANT FOR STORY STRUCTURE",
    steps: ["Language", "Model", "Idea", "Characters", "Beat Sheet"],
    modelStep: { heading: "Choose your story model", sub: "", bestLabel: "Best suited for", worstLabel: "Less suited for", btn: "NEXT: STORY IDEA →" },
    ideaStep: { heading: "Your story idea", sub: "Start with the core — what is the story about?", loglineLabel: "Logline *", loglinePlaceholder: "One sentence capturing the essence: who is the protagonist, what do they want, and what stands in the way?", titleLabel: "Title (optional)", titlePlaceholder: "Working title", genreLabel: "Genre", toneLabel: "Tone & mood", btn: "NEXT: CHARACTERS →" },
    charStep: { heading: "Characters", sub: "Add your key characters. At least one is required.", nameLabel: "Name", namePlaceholder: "Character's name", roleLabel: "Role", descLabel: "Background & motivation", descPlaceholder: "What does the character want? What holds them back?", addBtn: "+ ADD CHARACTER", backBtn: "← BACK", nextBtn: "GENERATE BEAT SHEET →" },
    beatStep: {
      fallbackTitle: "Beat Sheet", newBtn: "NEW STORY", generating: "Building dramatic structure…",
      error: "Something went wrong. Please check that you have a valid API key.",
      tip: "TIP: This beat sheet is a suggestion, not a straitjacket. Use it as a map to deviate from.",
      generatingBeat: "Generating…", feedbackPlaceholder: "Write feedback — e.g. 'too clichéd' or 'my protagonist would never do this'…",
      feedbackBtn: "REGENERATE FROM HERE →", regenerating: "Regenerating beat {n} and forward…",
      whatIsThis: "What is this?",
    },
    genres: ["Thriller","Drama","Comedy","Romance","Horror","Science Fiction","Fantasy","Action","Historical","Biographical","Mystery","Adventure"],
    tones:  ["Dark and tense","Light and warm","Poetic and dreamlike","Satirical","Epic","Intimate and personal","Humorous","Dystopian","Romantic","Realistic"],
    roles: [
      { label: "Protagonist",          desc: "The main character — the one whose journey and transformation the story revolves around." },
      { label: "Antagonist",           desc: "The one who actively opposes the protagonist. Can be a person, a system, or an inner force." },
      { label: "Sidekick",             desc: "The loyal companion. Mirrors the protagonist and often lightens the mood." },
      { label: "Mentor",               desc: "Gives the protagonist knowledge, tools, or courage — but doesn't make the journey for them." },
      { label: "Love interest",        desc: "Often carries the B story and the theme. Challenges the protagonist on a personal level." },
      { label: "Foil",                 desc: "Contrasts with the protagonist to make their qualities clearer — not necessarily an enemy." },
      { label: "Trickster",            desc: "Creates chaos, challenges norms, and reveals truths through humor or unexpected actions." },
      { label: "Herald",               desc: "Delivers the call to adventure or crucial information that sets the story in motion." },
      { label: "Threshold Guardian",   desc: "Tests the protagonist at key thresholds. Can be a trial rather than an enemy." },
      { label: "Shadow",               desc: "Represents the protagonist's dark side or what they fear becoming — a mirror, not always an enemy." },
    ],
  },
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const inputStyle = { width: "100%", background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: "5px", padding: "10px 12px", color: C.ink, fontSize: "14px", fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
const selectStyle = { ...inputStyle, background: "#ffffff", appearance: "none", WebkitAppearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888880' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "32px" };
const labelStyle = { display: "block", fontSize: "10px", color: C.ink, letterSpacing: "1.5px", marginBottom: "6px", textTransform: "uppercase", fontFamily: "'Courier Prime', monospace", fontWeight: "700" };
const btnPrimary = (active) => ({ background: active ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.02)", border: `1px solid ${active ? C.borderHov : C.border}`, color: active ? C.accentHi : C.inkFaint, padding: "13px 28px", borderRadius: "5px", cursor: active ? "pointer" : "not-allowed", fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "2px", transition: "all 0.2s" });
const btnSecondary = { background: "none", border: `1px solid ${C.border}`, color: C.inkDim, padding: "13px 20px", borderRadius: "5px", cursor: "pointer", fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "2px" };

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle}>
      <option value="" style={{ background: "#f5f2ed", color: "#6a6a62" }}>{placeholder || "—"}</option>
      {options.map(o => <option key={o} value={o} style={{ background: "#f5f2ed", color: "#1a1a18" }}>{o}</option>)}
    </select>
  </div>
);

const ModelCard = ({ model, selected, onSelect, t }) => (
  <div onClick={() => onSelect(model.id)} style={{ background: selected ? "rgba(0,0,0,0.055)" : C.surface, border: `1px solid ${selected ? C.borderHov : C.border}`, borderRadius: "8px", padding: "22px 24px", cursor: "pointer", transition: "all 0.18s", marginBottom: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: selected ? C.accentHi : C.ink }}>{model.name}</span>
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "10px", color: C.inkDim, letterSpacing: "1px" }}>{model.author}</span>
        </div>
        <p style={{ margin: "3px 0 0", fontFamily: "'Courier Prime', monospace", fontSize: "10px", color: selected ? C.accent : C.inkDim, letterSpacing: "1px" }}>{model.tagline}</p>
      </div>
      <div style={{ width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, marginTop: "2px", border: `1px solid ${selected ? C.accentHi : C.border}`, background: selected ? C.accentHi : "transparent", transition: "all 0.18s" }} />
    </div>
    <p style={{ margin: "0 0 12px", color: C.inkDim, fontSize: "13px", lineHeight: 1.6 }}>{model.desc}</p>
    <div className="r-grid2-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <div style={{ background: "rgba(168,184,160,0.07)", border: "1px solid rgba(168,184,160,0.15)", borderRadius: "5px", padding: "10px 12px" }}>
        <p style={{ margin: "0 0 4px", fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "1.5px", color: C.act1 }}>{t.modelStep.bestLabel.toUpperCase()}</p>
        <p style={{ margin: 0, fontSize: "12px", color: C.inkDim, lineHeight: 1.5 }}>{model.best}</p>
      </div>
      <div style={{ background: "rgba(184,168,160,0.07)", border: "1px solid rgba(184,168,160,0.12)", borderRadius: "5px", padding: "10px 12px" }}>
        <p style={{ margin: "0 0 4px", fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "1.5px", color: C.act2b }}>{t.modelStep.worstLabel.toUpperCase()}</p>
        <p style={{ margin: 0, fontSize: "12px", color: C.inkDim, lineHeight: 1.5 }}>{model.worst}</p>
      </div>
    </div>
  </div>
);

const CharacterCard = ({ char, index, onChange, onRemove, t }) => {
  const roleLabels = t.roles.map(r => r.label);
  const roleDesc = t.roles.find(r => r.label === char.role)?.desc || null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "7px", padding: "16px", marginBottom: "10px", position: "relative" }}>
      <button onClick={() => onRemove(index)} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: C.inkFaint, cursor: "pointer", fontSize: "18px", lineHeight: 1 }}>×</button>
      <div className="r-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: roleDesc ? "6px" : "10px" }}>
        <div>
          <label style={labelStyle}>{t.charStep.nameLabel}</label>
          <input value={char.name} onChange={e => onChange(index, "name", e.target.value)} placeholder={t.charStep.namePlaceholder} style={inputStyle} />
        </div>
        <SelectField label={t.charStep.roleLabel} value={char.role} onChange={val => onChange(index, "role", val)} options={roleLabels} placeholder="—" />
      </div>
      {roleDesc && (
        <p style={{ margin: "0 0 10px", fontSize: "11px", color: C.inkDim, fontStyle: "italic", lineHeight: 1.5, animation: "fadeIn 0.2s ease" }}>
          {roleDesc}
        </p>
      )}
      <div>
        <label style={labelStyle}>{t.charStep.descLabel}</label>
        <textarea value={char.description} onChange={e => onChange(index, "description", e.target.value)} placeholder={t.charStep.descPlaceholder} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
      </div>
    </div>
  );
};

// ─── BEAT CARD (with explanation + feedback + scope choice) ──────────────────
const BeatCard = ({ beat, label, pct, color, index, id, placeholder, onRegenerate, regeneratingFrom, totalBeats, t, lang }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFeedback,    setShowFeedback]    = useState(false);
  const [feedback,        setFeedback]        = useState("");
  const [showScope,       setShowScope]       = useState(false);
  const explanation = BEAT_EXPLANATIONS[lang]?.[id];
  const isRegenerating = regeneratingFrom !== null && index >= regeneratingFrom;
  const isFirst = regeneratingFrom !== null && index === regeneratingFrom;
  const isLastBeat = index === totalBeats - 1;

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    // If only one beat left (last), no choice needed — just regenerate this one
    if (isLastBeat) { onRegenerate(index, feedback, "only"); setFeedback(""); setShowFeedback(false); return; }
    setShowScope(true);
  };

  const handleScope = (scope) => {
    onRegenerate(index, feedback, scope);
    setFeedback(""); setShowFeedback(false); setShowScope(false);
  };

  const cancelFeedback = () => { setShowFeedback(false); setShowScope(false); setFeedback(""); };

  const scopeLabels = lang === "sv"
    ? { only: "Bara detta beat", forward: "Detta beat + alla efterföljande" }
    : { only: "This beat only", forward: "This beat + all following" };

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "20px", opacity: isRegenerating && !beat ? 0.35 : 1, animation: `fadeIn 0.35s ease ${index * 0.04}s both` }}>
      <div style={{ width: "2px", background: color, borderRadius: "2px", flexShrink: 0, marginTop: "3px" }} />
      <div style={{ flex: 1 }}>
        {/* Label row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "10px", fontFamily: "'Courier Prime', monospace", color, letterSpacing: "1.5px", textTransform: "uppercase" }}>{label}</span>
            {explanation && (
              <button onClick={() => setShowExplanation(s => !s)} title={t.beatStep.whatIsThis} style={{
                background: showExplanation ? "rgba(0,0,0,0.08)" : "none",
                border: `1px solid ${showExplanation ? C.borderHov : C.inkFaint}`,
                borderRadius: "50%", width: "15px", height: "15px", cursor: "pointer",
                color: showExplanation ? C.ink : C.inkFaint, fontSize: "9px",
                fontFamily: "'Courier Prime', monospace", display: "flex", alignItems: "center",
                justifyContent: "center", transition: "all 0.15s", flexShrink: 0, padding: 0,
              }}>i</button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "10px", color: C.inkFaint }}>{pct}</span>
            {beat && !isRegenerating && !showScope && (
              <button onClick={() => showFeedback ? cancelFeedback() : setShowFeedback(true)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: showFeedback ? C.inkDim : C.inkFaint,
                fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "1px",
                padding: "2px 0", transition: "color 0.15s",
              }}>
                {showFeedback ? (lang === "sv" ? "AVBRYT" : "CANCEL") : (lang === "sv" ? "GE FEEDBACK" : "GIVE FEEDBACK")}
              </button>
            )}
          </div>
        </div>

        {/* Explanation panel */}
        {showExplanation && explanation && (
          <div style={{ background: "rgba(0,0,0,0.03)", border: `1px solid ${C.border}`, borderRadius: "5px", padding: "12px 14px", marginBottom: "8px", animation: "fadeIn 0.2s ease" }}>
            <p style={{ margin: 0, fontSize: "12px", color: C.inkDim, lineHeight: 1.65, fontStyle: "italic" }}>{explanation}</p>
          </div>
        )}

        {/* Beat text */}
        {isRegenerating && !beat
          ? <p style={{ margin: 0, color: C.inkFaint, fontSize: "13px", fontFamily: "'Courier Prime', monospace", letterSpacing: "0.5px" }}>
              {isFirst ? (t.beatStep.regenerating || "Regenererar…").replace("{n}", index + 1) : "…"}
            </p>
          : <p style={{ margin: 0, color: "#2a2a28", fontSize: "14px", lineHeight: 1.65, fontFamily: "Georgia, serif" }}>{beat || placeholder}</p>
        }

        {/* Feedback textarea */}
        {showFeedback && !showScope && (
          <div style={{ marginTop: "10px", animation: "fadeIn 0.2s ease" }}>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder={t.beatStep.feedbackPlaceholder}
              rows={2}
              style={{ ...inputStyle, fontSize: "13px", resize: "none", marginBottom: "8px" }}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleFeedbackSubmit(); }}
              autoFocus
            />
            <button onClick={handleFeedbackSubmit} disabled={!feedback.trim()} style={{ ...btnPrimary(!!feedback.trim()), padding: "8px 16px", fontSize: "10px" }}>
              {lang === "sv" ? "FORTSÄTT →" : "CONTINUE →"}
            </button>
          </div>
        )}

        {/* Scope choice */}
        {showScope && (
          <div style={{ marginTop: "10px", animation: "fadeIn 0.2s ease" }}>
            <p style={{ margin: "0 0 10px", fontSize: "11px", color: C.inkDim, fontFamily: "'Courier Prime', monospace", letterSpacing: "0.5px" }}>
              {lang === "sv" ? "Hur mycket ska regenereras?" : "How much should be regenerated?"}
            </p>
            <div className="r-col-mobile" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={() => handleScope("only")} style={{
                background: "rgba(0,0,0,0.04)", border: `1px solid ${C.border}`,
                borderRadius: "5px", padding: "10px 16px", cursor: "pointer",
                fontFamily: "'Courier Prime', monospace", fontSize: "10px", letterSpacing: "1px",
                color: C.ink, transition: "all 0.15s", textAlign: "left",
              }}>
                <div style={{ marginBottom: "3px" }}>{scopeLabels.only}</div>
                <div style={{ fontSize: "9px", color: C.inkDim }}>{lang === "sv" ? "Resten behålls" : "Rest stays unchanged"}</div>
              </button>
              <button onClick={() => handleScope("forward")} style={{
                background: "rgba(0,0,0,0.04)", border: `1px solid ${C.border}`,
                borderRadius: "5px", padding: "10px 16px", cursor: "pointer",
                fontFamily: "'Courier Prime', monospace", fontSize: "10px", letterSpacing: "1px",
                color: C.ink, transition: "all 0.15s", textAlign: "left",
              }}>
                <div style={{ marginBottom: "3px" }}>{scopeLabels.forward}</div>
                <div style={{ fontSize: "9px", color: C.inkDim }}>{lang === "sv" ? "Anpassar hela slutet" : "Adapts the rest to match"}</div>
              </button>
              <button onClick={cancelFeedback} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkFaint, fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "1px", padding: "10px 8px" }}>
                {lang === "sv" ? "AVBRYT" : "CANCEL"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ─── EXPORT BAR ───────────────────────────────────────────────────────────────
const ExportBar = ({ beats, beatLabels, idea, modelInfo, lang, t }) => {
  const [exporting, setExporting] = useState(null);

  const filename = (idea.title || (lang === "sv" ? "beat-sheet" : "beat-sheet"))
    .toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  const exportPDF = async () => {
    setExporting("pdf");
    try {
      // Load jsPDF from CDN
      await new Promise((resolve, reject) => {
        if (window.jspdf) { resolve(); return; }
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210, margin = 20, col = W - margin * 2;
      let y = margin;

      const addText = (text, size, color, bold, maxW, lineH) => {
        doc.setFontSize(size);
        doc.setTextColor(...color);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text, maxW || col);
        lines.forEach(line => {
          if (y > 277) { doc.addPage(); y = margin; }
          doc.text(line, margin, y);
          y += lineH || (size * 0.4);
        });
      };

      // Title
      addText(idea.title || (lang === "sv" ? "Beat Sheet" : "Beat Sheet"), 22, [30,30,28], true, col, 9);
      y += 2;
      addText(`"${idea.logline}"`, 10, [120,120,115], false, col, 5);
      y += 2;
      addText(modelInfo?.name || "", 8, [160,160,155], false, col, 4);
      y += 6;

      // Divider
      doc.setDrawColor(80,80,75); doc.setLineWidth(0.3);
      doc.line(margin, y, W - margin, y); y += 8;

      // Beats
      beatLabels.forEach(b => {
        const beatText = beats[b.id];
        if (!beatText) return;
        if (y > 265) { doc.addPage(); y = margin; }
        addText(b.label.toUpperCase(), 7.5, [100,100,95], true, col * 0.6, 4);
        y += 1;
        addText(beatText, 10, [40,40,38], false, col, 5);
        y += 5;
      });

      // Footer
      if (y > 270) { doc.addPage(); y = margin; }
      y += 4;
      doc.setDrawColor(80,80,75); doc.setLineWidth(0.2);
      doc.line(margin, y, W - margin, y); y += 5;
      addText("DRAMATURG — AI STORY STRUCTURE ASSISTANT", 7, [160,160,155], false, col, 4);

      doc.save(`${filename}.pdf`);
    } catch(e) { console.error(e); }
    finally { setExporting(null); }
  };

  const exportDOCX = async () => {
    setExporting("docx");
    try {
      await new Promise((resolve, reject) => {
        if (window.docx) { resolve(); return; }
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/docx/8.5.0/docx.umd.min.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
      const { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType, BorderStyle } = window.docx;

      const children = [];

      // Title
      children.push(new Paragraph({
        children: [new TextRun({ text: idea.title || "Beat Sheet", bold: true, size: 44, color: "1e1e1c" })],
        spacing: { after: 80 },
      }));
      // Logline
      children.push(new Paragraph({
        children: [new TextRun({ text: `"${idea.logline}"`, italics: true, size: 20, color: "666660" })],
        spacing: { after: 60 },
      }));
      // Model
      children.push(new Paragraph({
        children: [new TextRun({ text: modelInfo?.name || "", size: 16, color: "888880" })],
        spacing: { after: 200 },
      }));

      // Beats
      beatLabels.forEach(b => {
        const beatText = beats[b.id];
        if (!beatText) return;
        children.push(new Paragraph({
          children: [new TextRun({ text: b.label.toUpperCase(), bold: true, size: 16, color: "555550" })],
          spacing: { before: 240, after: 60 },
        }));
        children.push(new Paragraph({
          children: [new TextRun({ text: beatText, size: 22, color: "2a2a28" })],
          spacing: { after: 80 },
        }));
      });

      // Footer
      children.push(new Paragraph({
        children: [new TextRun({ text: "DRAMATURG — AI STORY STRUCTURE ASSISTANT", size: 14, color: "aaaaaa" })],
        spacing: { before: 400 },
      }));

      const doc = new Document({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `${filename}.docx`; a.click();
      URL.revokeObjectURL(url);
    } catch(e) { console.error(e); }
    finally { setExporting(null); }
  };

  const btnStyle = (active) => ({
    background: active ? "rgba(0,0,0,0.07)" : C.surface,
    border: `1px solid ${active ? C.borderHov : C.border}`,
    color: active ? C.ink : C.inkDim, borderRadius: "5px",
    padding: "10px 18px", cursor: active ? "pointer" : "default",
    fontFamily: "'Courier Prime', monospace", fontSize: "10px",
    letterSpacing: "1.5px", display: "flex", alignItems: "center", gap: "8px",
    transition: "all 0.18s",
  });

  return (
    <div className="r-wrap" style={{ marginTop: "36px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "9px", color: C.inkFaint, letterSpacing: "1.5px", marginRight: "4px" }}>
        {lang === "sv" ? "EXPORTERA:" : "EXPORT:"}
      </span>
      <button onClick={exportPDF} disabled={!!exporting} style={btnStyle(!exporting)}>
        {exporting === "pdf"
          ? <><span style={{ width: "10px", height: "10px", border: `1.5px solid ${C.inkFaint}`, borderTopColor: C.accent, borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> {lang === "sv" ? "Skapar PDF…" : "Creating PDF…"}</>
          : "↓ PDF"
        }
      </button>
      <button onClick={exportDOCX} disabled={!!exporting} style={btnStyle(!exporting)}>
        {exporting === "docx"
          ? <><span style={{ width: "10px", height: "10px", border: `1.5px solid ${C.inkFaint}`, borderTopColor: C.accent, borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> {lang === "sv" ? "Skapar Word…" : "Creating Word…"}</>
          : "↓ WORD (.docx)"
        }
      </button>
    </div>
  );
};

const LangOption = ({ lang, label, selected, onSelect }) => (
  <button onClick={() => onSelect(lang)} style={{ background: selected ? "rgba(0,0,0,0.06)" : C.surface, border: `1px solid ${selected ? C.borderHov : C.border}`, borderRadius: "8px", padding: "24px 32px", cursor: "pointer", textAlign: "center", transition: "all 0.18s", flex: 1 }}>
    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "13px", letterSpacing: "3px", fontWeight: "700", color: selected ? C.ink : C.inkDim, marginBottom: "8px" }}>{lang.toUpperCase()}</div>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: selected ? C.ink : C.inkDim }}>{label}</div>
  </button>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,            setLang]           = useState("sv");
  const [model,           setModel]          = useState("save_the_cat");
  const [step,            setStep]           = useState(0);
  const [idea,            setIdea]           = useState({ title: "", logline: "", genre: "", tone: "" });
  const [characters,      setCharacters]     = useState([{ name: "", role: "", description: "" }]);
  const [beats,           setBeats]          = useState({});
  const [loading,         setLoading]        = useState(false);
  const [regeneratingFrom,setRegeneratingFrom] = useState(null);
  const [error,           setError]          = useState("");

  const t          = T[lang];
  const models     = MODELS[lang];
  const beatLabels = BEAT_LABELS[model][lang];
  const modelInfo  = models.find(m => m.id === model);

  const addCharacter    = () => setCharacters([...characters, { name: "", role: "", description: "" }]);
  const removeCharacter = (i) => setCharacters(characters.filter((_, idx) => idx !== i));
  const updateCharacter = (i, field, val) => { const u = [...characters]; u[i] = { ...u[i], [field]: val }; setCharacters(u); };
  const resetAll = () => { setStep(0); setBeats({}); setError(""); setModel("save_the_cat"); setRegeneratingFrom(null); setIdea({ title: "", logline: "", genre: "", tone: "" }); setCharacters([{ name: "", role: "", description: "" }]); };

  const buildPrompt = (extraInstruction = null, fromIndex = null) => {
    const charText  = characters.filter(c => c.name).map(c => `${c.name} (${c.role}): ${c.description}`).join("\n");
    const allKeys   = beatLabels.map(b => b.id);
    const modelName = modelInfo?.name || model;

    if (fromIndex !== null && extraInstruction) {
      const confirmedBeats = beatLabels.slice(0, fromIndex).map(b => `${b.id}: "${beats[b.id] || ""}"`).join("\n");
      const regenKeys = beatLabels.slice(fromIndex).map(b => b.id).join(", ");
      return lang === "sv"
        ? `Du är en expert på dramaturgi och berättarstrukturer.

Berättelse:
Titel: ${idea.title || "Okänd"} | Genre: ${idea.genre || "Okänd"} | Ton: ${idea.tone || "Okänd"}
Logline: ${idea.logline}
Karaktärer: ${charText || "Inga"}
Modell: ${modelName}

Redan godkända beats (ÄNDRA INTE DESSA):
${confirmedBeats}

Feedback på beat "${beatLabels[fromIndex].label}": ${extraInstruction}

Regenerera alla beats från och med "${beatLabels[fromIndex].label}" och framåt, med hänsyn till feedbacken och så att de hänger ihop med de godkända beats ovan.
Svara ENBART med ett JSON-objekt med dessa nycklar: ${regenKeys}`
        : `You are an expert in dramaturgy and story structure.

Story:
Title: ${idea.title || "Unknown"} | Genre: ${idea.genre || "Unknown"} | Tone: ${idea.tone || "Unknown"}
Logline: ${idea.logline}
Characters: ${charText || "None"}
Model: ${modelName}

Already approved beats (DO NOT CHANGE THESE):
${confirmedBeats}

Feedback on beat "${beatLabels[fromIndex].label}": ${extraInstruction}

Regenerate all beats from "${beatLabels[fromIndex].label}" onward, taking the feedback into account and ensuring they cohere with the approved beats above.
Respond ONLY with a JSON object with these keys: ${regenKeys}`;
    }

    return lang === "sv"
      ? `Du är en expert på dramaturgi och berättarstrukturer.\n\nEn författare arbetar med:\nTitel: ${idea.title || "Okänd"}\nGenre: ${idea.genre || "Okänd"}\nTon: ${idea.tone || "Okänd"}\nLogline: ${idea.logline}\n\nKaraktärer:\n${charText || "Inga"}\n\nModell: ${modelName}\n\nGenerera ett komplett beat sheet på SVENSKA. Svara ENBART med JSON (inga backticks) med dessa nycklar:\n${allKeys.join(", ")}\n\nVarje värde: 2–4 meningar, specifika för just den här berättelsen.`
      : `You are an expert in dramaturgy and story structure.\n\nWriter's story:\nTitle: ${idea.title || "Unknown"}\nGenre: ${idea.genre || "Unknown"}\nTone: ${idea.tone || "Unknown"}\nLogline: ${idea.logline}\n\nCharacters:\n${charText || "None"}\n\nModel: ${modelName}\n\nGenerate a complete beat sheet in ENGLISH. Respond ONLY with JSON (no backticks) with these keys:\n${allKeys.join(", ")}\n\nEach value: 2–4 sentences specific to this story.`;
  };

  const callAPI = async (prompt, mergeKeys = null) => {
    const response = await fetch("/api/anthropic/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
    });
    const data  = await response.json();
    const text  = data.content?.map(i => i.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    if (mergeKeys) {
      setBeats(prev => ({ ...prev, ...parsed }));
    } else {
      setBeats(parsed);
    }
  };

  const generateBeats = async () => {
    setLoading(true); setError(""); setBeats({}); setRegeneratingFrom(null); setStep(4);
    try { await callAPI(buildPrompt()); }
    catch { setError(t.beatStep.error); }
    finally { setLoading(false); }
  };

  const handleFeedback = async (fromIndex, feedback, scope) => {
    setError("");
    const isOnly = scope === "only";
    const endIndex = isOnly ? fromIndex + 1 : beatLabels.length;

    setBeats(prev => {
      const next = { ...prev };
      beatLabels.slice(fromIndex, endIndex).forEach(b => delete next[b.id]);
      return next;
    });
    setRegeneratingFrom(fromIndex);

    try {
      if (isOnly) {
        const charText  = characters.filter(c => c.name).map(c => `${c.name} (${c.role}): ${c.description}`).join("\n");
        const modelName = modelInfo?.name || model;
        const beatId    = beatLabels[fromIndex].id;
        const beatName  = beatLabels[fromIndex].label;
        const surroundingBeats = beatLabels
          .filter((_, i) => Math.abs(i - fromIndex) <= 2 && i !== fromIndex)
          .map(b => `${b.label}: "${beats[b.id] || ""}"`)
          .join("\n");
        const prompt = lang === "sv"
          ? `Du är en expert på dramaturgi.\n\nBerättelse:\nTitel: ${idea.title || "Okänd"} | Genre: ${idea.genre || "Okänd"} | Ton: ${idea.tone || "Okänd"}\nLogline: ${idea.logline}\nKaraktärer: ${charText || "Inga"}\nModell: ${modelName}\n\nNärliggande beats för kontext:\n${surroundingBeats}\n\nFeedback på beatet "${beatName}": ${feedback}\n\nRegenerera BARA detta enstaka beat. Svara ENBART med JSON (inga backticks): {"${beatId}": "..."}\n2–4 meningar, specifikt för berättelsen.`
          : `You are an expert in dramaturgy.\n\nStory:\nTitle: ${idea.title || "Unknown"} | Genre: ${idea.genre || "Unknown"} | Tone: ${idea.tone || "Unknown"}\nLogline: ${idea.logline}\nCharacters: ${charText || "None"}\nModel: ${modelName}\n\nNearby beats for context:\n${surroundingBeats}\n\nFeedback on beat "${beatName}": ${feedback}\n\nRegenerate ONLY this single beat. Respond ONLY with JSON (no backticks): {"${beatId}": "..."}\n2–4 sentences, specific to this story.`;
        await callAPI(prompt, [beatId]);
      } else {
        const regenKeys = beatLabels.slice(fromIndex).map(b => b.id);
        await callAPI(buildPrompt(feedback, fromIndex), regenKeys);
      }
    } catch { setError(t.beatStep.error); }
    finally { setRegeneratingFrom(null); }
  };

  const canProceedIdea  = idea.logline.length > 20;
  const canProceedChars = characters.some(c => c.name);
  const visibleSteps    = t.steps.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif", color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Courier+Prime&display=swap');
        * { box-sizing: border-box; }
        input:focus, textarea:focus, select:focus { border-color: rgba(0,0,0,0.5) !important; }
        input::placeholder, textarea::placeholder { color: #aaa; }
        select option { background: #f5f2ed; color: #1a1a18; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to { transform:rotate(360deg); } }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#ccc; }

        /* ── RESPONSIVE ── */
        .r-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .r-grid2-sm { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) {
          .r-grid2 { grid-template-columns: 1fr !important; }
          .r-grid2-sm { grid-template-columns: 1fr !important; }
          .r-hide-mobile { display: none !important; }
          .r-col-mobile { flex-direction: column !important; }
          .r-pad { padding: 28px 18px !important; }
          .r-pad-start { padding: 40px 18px !important; }
          .r-header { padding: 14px 18px !important; }
          .r-lang-row { flex-direction: column !important; }
          .r-wrap { flex-wrap: wrap !important; }
          .r-full { width: 100% !important; }
          .r-title { font-size: 26px !important; }
          .r-h1 { font-size: 34px !important; letter-spacing: 4px !important; }
        }
      `}</style>

      {step > 0 && (
        <div className="r-header" style={{ borderBottom: `1px solid ${C.border}`, padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer" }} onClick={resetAll}>
            <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, letterSpacing: "4px", color: C.ink }}>DRAMATURG</h1>
            <p style={{ margin: "2px 0 0", fontSize: "10px", color: C.ink, fontFamily: "'Courier Prime', monospace", letterSpacing: "2px", fontWeight: "700" }}>{t.appSubtitle}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {visibleSteps.map((s, i) => {
              const active = step === i + 1, done = step > i + 1;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", opacity: active || done ? 1 : 0.25 }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: active ? C.accent : done ? C.act1 : C.inkFaint, transition: "all 0.3s" }} />
                  <span className="r-hide-mobile" style={{ fontSize: "9px", fontFamily: "'Courier Prime', monospace", color: active ? C.accent : C.inkDim, letterSpacing: "1px" }}>{s.toUpperCase()}</span>
                  {i < visibleSteps.length - 1 && <span className="r-hide-mobile" style={{ color: C.inkFaint, margin: "0 2px" }}>·</span>}
                </div>
              );
            })}
            <button onClick={() => setLang(l => l === "sv" ? "en" : "sv")} style={{ marginLeft: "14px", background: "none", border: `1px solid ${C.border}`, borderRadius: "3px", color: C.inkDim, cursor: "pointer", fontFamily: "'Courier Prime', monospace", fontSize: "9px", letterSpacing: "1px", padding: "3px 8px" }}>{lang === "sv" ? "EN" : "SV"}</button>
          </div>
        </div>
      )}

      <div className={step === 0 ? "r-pad-start" : "r-pad"} style={{ maxWidth: "700px", margin: "0 auto", padding: step === 0 ? "72px 40px" : "44px 40px" }}>

        {/* 0: LANGUAGE */}
        {step === 0 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h1 className="r-h1" style={{ margin: "0 0 6px", fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", fontWeight: 600, letterSpacing: "6px", color: C.ink }}>DRAMATURG</h1>
              <p style={{ margin: 0, fontFamily: "'Courier Prime', monospace", fontSize: "10px", letterSpacing: "3px", color: C.ink, fontWeight: "700" }}>AI STORY STRUCTURE ASSISTANT</p>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "24px", margin: "0 0 6px", textAlign: "center", fontStyle: "italic", color: C.ink }}>{lang === "sv" ? "Välj språk" : "Choose language"}</h2>
            <p style={{ color: C.inkDim, fontSize: "13px", marginBottom: "28px", textAlign: "center" }}>{lang === "sv" ? "Appen och ditt beat sheet genereras på valt språk." : "The app and beat sheet will be generated in the selected language."}</p>
            <div className="r-lang-row" style={{ display: "flex", gap: "14px", marginBottom: "36px" }}>
              <LangOption lang="sv" label="Svenska" selected={lang === "sv"} onSelect={setLang} />
              <LangOption lang="en" label="English" selected={lang === "en"} onSelect={setLang} />
            </div>
            <button onClick={() => setStep(1)} style={{ ...btnPrimary(true), width: "100%", padding: "15px" }}>{lang === "sv" ? "FORTSÄTT →" : "CONTINUE →"}</button>
          </div>
        )}

        {/* 1: MODEL */}
        {step === 1 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 className="r-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "34px", margin: "0 0 6px", fontStyle: "italic" }}>{t.modelStep.heading}</h2>
            <p style={{ color: C.inkDim, fontSize: "13px", marginBottom: "28px" }}>{t.modelStep.sub}</p>
            {models.map(m => <ModelCard key={m.id} model={m} selected={model === m.id} onSelect={setModel} t={t} />)}
            <div style={{ marginTop: "28px" }}>
              <button onClick={() => setStep(2)} style={{ ...btnPrimary(true), width: "100%", padding: "15px" }}>{t.modelStep.btn}</button>
            </div>
          </div>
        )}

        {/* 2: IDEA */}
        {step === 2 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 className="r-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "34px", margin: "0 0 6px", fontStyle: "italic" }}>{t.ideaStep.heading}</h2>
            <p style={{ color: C.inkDim, fontSize: "13px", marginBottom: "32px" }}>{t.ideaStep.sub}</p>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>{t.ideaStep.loglineLabel}</label>
              <textarea value={idea.logline} onChange={e => setIdea({ ...idea, logline: e.target.value })} placeholder={t.ideaStep.loglinePlaceholder} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div className="r-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
              <div>
                <label style={labelStyle}>{t.ideaStep.titleLabel}</label>
                <input value={idea.title} onChange={e => setIdea({ ...idea, title: e.target.value })} placeholder={t.ideaStep.titlePlaceholder} style={inputStyle} />
              </div>
              <SelectField label={t.ideaStep.genreLabel} value={idea.genre} onChange={val => setIdea({ ...idea, genre: val })} options={t.genres} placeholder="—" />
            </div>
            <div style={{ marginBottom: "32px" }}>
              <SelectField label={t.ideaStep.toneLabel} value={idea.tone} onChange={val => setIdea({ ...idea, tone: val })} options={t.tones} placeholder="—" />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} style={btnSecondary}>← {lang === "sv" ? "TILLBAKA" : "BACK"}</button>
              <button onClick={() => setStep(3)} disabled={!canProceedIdea} style={{ ...btnPrimary(canProceedIdea), flex: 1 }}>{t.ideaStep.btn}</button>
            </div>
          </div>
        )}

        {/* 3: CHARACTERS */}
        {step === 3 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 className="r-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "34px", margin: "0 0 6px", fontStyle: "italic" }}>{t.charStep.heading}</h2>
            <p style={{ color: C.inkDim, fontSize: "13px", marginBottom: "28px" }}>{t.charStep.sub}</p>
            {characters.map((char, i) => <CharacterCard key={i} char={char} index={i} onChange={updateCharacter} onRemove={removeCharacter} t={t} />)}
            <button onClick={addCharacter} style={{ ...btnSecondary, width: "100%", marginBottom: "28px", borderStyle: "dashed" }}>{t.charStep.addBtn}</button>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(2)} style={btnSecondary}>{t.charStep.backBtn}</button>
              <button onClick={generateBeats} disabled={!canProceedChars} style={{ ...btnPrimary(canProceedChars), flex: 1 }}>{t.charStep.nextBtn}</button>
            </div>
          </div>
        )}

        {/* 4: BEAT SHEET */}
        {step === 4 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div className="r-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "12px" }}>
              <div>
                <h2 className="r-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "34px", margin: "0 0 4px", fontStyle: "italic" }}>{idea.title || t.beatStep.fallbackTitle}</h2>
                <p style={{ color: C.inkDim, fontSize: "12px", margin: "0 0 2px", fontStyle: "italic" }}>"{idea.logline}"</p>
                <p style={{ color: C.inkFaint, fontSize: "10px", margin: 0, fontFamily: "'Courier Prime', monospace", letterSpacing: "1px" }}>{modelInfo?.name}</p>
              </div>
              <button onClick={resetAll} style={{ ...btnSecondary, whiteSpace: "nowrap", marginLeft: "16px", fontSize: "10px" }}>{t.beatStep.newBtn}</button>
            </div>

            <div style={{ height: "1px", background: C.border, margin: "20px 0 28px" }} />

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: C.inkDim, marginBottom: "28px" }}>
                <div style={{ width: "16px", height: "16px", border: `1.5px solid ${C.inkFaint}`, borderTopColor: C.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "1px" }}>{t.beatStep.generating}</span>
              </div>
            )}

            {error && <div style={{ background: "rgba(192,128,128,0.08)", border: `1px solid rgba(192,128,128,0.2)`, borderRadius: "5px", padding: "12px 14px", color: C.err, fontSize: "13px", marginBottom: "20px" }}>{error}</div>}

            <div>
              {beatLabels.map((b, i) => (
                <BeatCard
                  key={b.id} id={b.id} beat={beats[b.id]} label={b.label} pct={b.pct} color={b.color} index={i}
                  placeholder={t.beatStep.generatingBeat} onRegenerate={handleFeedback}
                  regeneratingFrom={regeneratingFrom} totalBeats={beatLabels.length} t={t} lang={lang}
                />
              ))}
            </div>

            {Object.keys(beats).length > 0 && regeneratingFrom === null && (
              <>
                <ExportBar beats={beats} beatLabels={beatLabels} idea={idea} modelInfo={modelInfo} lang={lang} t={t} />
                <div style={{ marginTop: "16px", padding: "16px 18px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: C.inkDim, fontFamily: "'Courier Prime', monospace", letterSpacing: "0.5px" }}>{t.beatStep.tip}</p>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}