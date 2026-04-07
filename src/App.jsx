import { useState, useEffect, useRef } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  bg:       "#f7f5f0",
  surface:  "rgba(0,0,0,0.03)",
  border:   "rgba(0,0,0,0.15)",
  borderHov:"rgba(0,0,0,0.50)",
  ink:      "#111110",
  inkDim:   "#555550",
  inkFaint: "#aaa9a3",
  act1:     "#2d6e3a",
  act2a:    "#185fa5",
  act2b:    "#7a3a20",
  act3:     "#6a5010",
  err:      "#8b2020",
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
    {
      id: "save_the_cat", name: "Save the Cat", author: "Blake Snyder",
      tagline: "15 exakta beats, manus-preciserat",
      best: "Spänning, thriller, komedi — berättelser med tydlig yttre konflikt och tempo.",
      worst: "Litterär prosa, icke-linjära berättelser, karaktärsstudier utan tydlig yttre handling.",
      desc: "Varje beat har en procentuell position i manuset, vilket ger en tydlig struktur att följa eller medvetet bryta mot.",
      examples: "Används i filmer som Parasite, Bridesmaids och The Dark Knight.",
    },
    {
      id: "hero_journey", name: "Hjälteresan", author: "Joseph Campbell / Christopher Vogler",
      tagline: "12 arketypiska steg, fokus på inre förändring",
      best: "Fantasy, epos, coming-of-age — berättelser om transformation och kallelse.",
      worst: "Ensembledrama, berättelser utan tydlig central hjälte, minimalistisk realism.",
      desc: "Campbells urgamla struktur, bearbetad för film av Vogler. Lika fokuserad på den inre förändringen som den yttre handlingen.",
      examples: "Harry Potter, Frodo i Sagan om ringen och Neo i The Matrix följer alla hjälteresan.",
    },
    {
      id: "freytag", name: "Freytags Pyramid", author: "Gustav Freytag",
      tagline: "5 akter, klassisk dramatik",
      best: "Teaterpjäser, drama, tragedi — berättelser som undersöker konsekvenser av val.",
      worst: "Snabbtempad action, komedier, berättelser med många sidospår.",
      desc: "Utvecklad för analys av drama och tragedi. Strukturen är enkel: exposition, stigande handling, klimax, fallande handling, upplösning — vilket ger stort tolkningsutrymme inom varje fas.",
      examples: "Ibsens pjäser, Shakespeares tragedier och många klassiska dramer följer denna modell.",
    },
  ],
  en: [
    {
      id: "save_the_cat", name: "Save the Cat", author: "Blake Snyder",
      tagline: "15 precise beats, screenplay-tuned",
      best: "Suspense, thriller, comedy — stories with clear external conflict and pace.",
      worst: "Literary prose, non-linear narratives, character studies without clear external plot.",
      desc: "Each beat has a percentage position in the screenplay, giving you a clear structure to follow — or deliberately break.",
      examples: "Used in films like Parasite, Bridesmaids and The Dark Knight.",
    },
    {
      id: "hero_journey", name: "The Hero's Journey", author: "Joseph Campbell / Christopher Vogler",
      tagline: "12 archetypal stages, focus on inner change",
      best: "Fantasy, epic, coming-of-age — stories about transformation and calling.",
      worst: "Ensemble drama, stories without a clear central hero, minimalist realism.",
      desc: "Campbell's ancient structure, adapted for film by Vogler. Equally focused on inner transformation as outer action.",
      examples: "Harry Potter, Frodo in The Lord of the Rings and Neo in The Matrix all follow the Hero's Journey.",
    },
    {
      id: "freytag", name: "Freytag's Pyramid", author: "Gustav Freytag",
      tagline: "5 acts, classical drama",
      best: "Stage plays, drama, tragedy — stories that explore the consequences of choice.",
      worst: "Fast-paced action, comedies, stories with many subplots.",
      desc: "Developed for the analysis of drama and tragedy. The structure is straightforward — exposition, rising action, climax, falling action, resolution — leaving considerable room for interpretation.",
      examples: "Ibsen's plays, Shakespeare's tragedies and many classical dramas follow this model.",
    },
  ],
};

// ─── BEAT LABELS ─────────────────────────────────────────────────────────────
const BEAT_LABELS = {
  save_the_cat: {
    sv: [
      { id: "opening_image",    label: "Öppningsbild",          pct: "1%",     color: C.act1  },
      { id: "theme_stated",     label: "Temats kärna",          pct: "5%",     color: C.act1  },
      { id: "setup",            label: "Etablering",            pct: "1–10%",  color: C.act1  },
      { id: "catalyst",         label: "Katalysator",           pct: "12%",    color: C.act2a },
      { id: "debate",           label: "Debatt / Tvekan",       pct: "12–25%", color: C.act2a },
      { id: "break_into_two",   label: "Brytpunkt — Akt II",    pct: "25%",    color: C.act2a },
      { id: "b_story",          label: "B-berättelsen",         pct: "30%",    color: C.act2a },
      { id: "fun_and_games",    label: "Löfte & underhållning", pct: "30–55%", color: C.act2a },
      { id: "midpoint",         label: "Mittpunkt",             pct: "50%",    color: C.act2a },
      { id: "bad_guys_close_in",label: "Fienden stänger in",    pct: "55–75%", color: C.act2b },
      { id: "all_is_lost",      label: "Allt är förlorat",      pct: "75%",    color: C.act2b },
      { id: "dark_night",       label: "Själens mörka natt",    pct: "75–85%", color: C.act2b },
      { id: "break_into_three", label: "Brytpunkt — Akt III",   pct: "85%",    color: C.act3  },
      { id: "finale",           label: "Final",                 pct: "85–99%", color: C.act3  },
      { id: "final_image",      label: "Slutbild",              pct: "99%",    color: C.act3  },
    ],
    en: [
      { id: "opening_image",    label: "Opening Image",         pct: "1%",     color: C.act1  },
      { id: "theme_stated",     label: "Theme Stated",          pct: "5%",     color: C.act1  },
      { id: "setup",            label: "Set-Up",                pct: "1–10%",  color: C.act1  },
      { id: "catalyst",         label: "Catalyst",              pct: "12%",    color: C.act2a },
      { id: "debate",           label: "Debate",                pct: "12–25%", color: C.act2a },
      { id: "break_into_two",   label: "Break into Two",        pct: "25%",    color: C.act2a },
      { id: "b_story",          label: "B Story",               pct: "30%",    color: C.act2a },
      { id: "fun_and_games",    label: "Fun & Games",           pct: "30–55%", color: C.act2a },
      { id: "midpoint",         label: "Midpoint",              pct: "50%",    color: C.act2a },
      { id: "bad_guys_close_in",label: "Bad Guys Close In",     pct: "55–75%", color: C.act2b },
      { id: "all_is_lost",      label: "All Is Lost",           pct: "75%",    color: C.act2b },
      { id: "dark_night",       label: "Dark Night of the Soul",pct: "75–85%", color: C.act2b },
      { id: "break_into_three", label: "Break into Three",      pct: "85%",    color: C.act3  },
      { id: "finale",           label: "Finale",                pct: "85–99%", color: C.act3  },
      { id: "final_image",      label: "Final Image",           pct: "99%",    color: C.act3  },
    ],
  },
  hero_journey: {
    sv: [
      { id: "ordinary_world",      label: "Den vanliga världen",    pct: "1–10%",  color: C.act1  },
      { id: "call_to_adventure",   label: "Kallelsen",              pct: "10–12%", color: C.act1  },
      { id: "refusal",             label: "Vägran",                 pct: "12–20%", color: C.act2a },
      { id: "mentor",              label: "Mötet med mentorn",      pct: "20–25%", color: C.act2a },
      { id: "crossing_threshold",  label: "Tröskelövergången",      pct: "25%",    color: C.act2a },
      { id: "tests_allies_enemies",label: "Prövningar & allierade", pct: "30–50%", color: C.act2a },
      { id: "innermost_cave",      label: "Den innersta grottan",   pct: "50%",    color: C.act2b },
      { id: "ordeal",              label: "Den stora prövningen",   pct: "55–70%", color: C.act2b },
      { id: "reward",              label: "Belöningen",             pct: "70–75%", color: C.act2b },
      { id: "road_back",           label: "Vägen tillbaka",         pct: "75–85%", color: C.act3  },
      { id: "resurrection",        label: "Återuppståndelsen",      pct: "85–95%", color: C.act3  },
      { id: "return_with_elixir",  label: "Eliksirens återkomst",   pct: "95–99%", color: C.act3  },
    ],
    en: [
      { id: "ordinary_world",      label: "Ordinary World",         pct: "1–10%",  color: C.act1  },
      { id: "call_to_adventure",   label: "Call to Adventure",      pct: "10–12%", color: C.act1  },
      { id: "refusal",             label: "Refusal of the Call",    pct: "12–20%", color: C.act2a },
      { id: "mentor",              label: "Meeting the Mentor",     pct: "20–25%", color: C.act2a },
      { id: "crossing_threshold",  label: "Crossing the Threshold", pct: "25%",    color: C.act2a },
      { id: "tests_allies_enemies",label: "Tests, Allies, Enemies", pct: "30–50%", color: C.act2a },
      { id: "innermost_cave",      label: "The Innermost Cave",     pct: "50%",    color: C.act2b },
      { id: "ordeal",              label: "The Ordeal",             pct: "55–70%", color: C.act2b },
      { id: "reward",              label: "The Reward",             pct: "70–75%", color: C.act2b },
      { id: "road_back",           label: "The Road Back",          pct: "75–85%", color: C.act3  },
      { id: "resurrection",        label: "The Resurrection",       pct: "85–95%", color: C.act3  },
      { id: "return_with_elixir",  label: "Return with the Elixir", pct: "95–99%", color: C.act3  },
    ],
  },
  freytag: {
    sv: [
      { id: "exposition",        label: "Exposition",               pct: "1–20%",  color: C.act1  },
      { id: "inciting_incident", label: "Det utlösande ögonblicket",pct: "20%",    color: C.act1  },
      { id: "rising_action",     label: "Stigande handling",        pct: "20–50%", color: C.act2a },
      { id: "complication",      label: "Komplikation",             pct: "40–55%", color: C.act2a },
      { id: "climax",            label: "Klimax",                   pct: "50–60%", color: C.act2b },
      { id: "falling_action",    label: "Fallande handling",        pct: "60–85%", color: C.act3  },
      { id: "catastrophe",       label: "Katastrof / Vändning",     pct: "80–90%", color: C.act3  },
      { id: "resolution",        label: "Upplösning",               pct: "90–99%", color: C.act3  },
    ],
    en: [
      { id: "exposition",        label: "Exposition",               pct: "1–20%",  color: C.act1  },
      { id: "inciting_incident", label: "Inciting Incident",        pct: "20%",    color: C.act1  },
      { id: "rising_action",     label: "Rising Action",            pct: "20–50%", color: C.act2a },
      { id: "complication",      label: "Complication",             pct: "40–55%", color: C.act2a },
      { id: "climax",            label: "Climax",                   pct: "50–60%", color: C.act2b },
      { id: "falling_action",    label: "Falling Action",           pct: "60–85%", color: C.act3  },
      { id: "catastrophe",       label: "Catastrophe / Turn",       pct: "80–90%", color: C.act3  },
      { id: "resolution",        label: "Resolution",               pct: "90–99%", color: C.act3  },
    ],
  },
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  sv: {
    appSubtitle: "Dramaturgiverktyg för berättare",
    steps: ["Modell", "Idé", "Karaktärer", "Beat Sheet"],
    beatSheetExplainer: "Beskriv din berättelseidé och dina karaktärer. Appen genererar en komplett dramaturgistruktur anpassad till din historia.",
    modelStep: {
      heading: "Välj dramaturgimodell",
      bestLabel: "Passar bäst för",
      worstLabel: "Mindre lämpat för",
      examplesLabel: "Exempel",
      btn: "Nästa: Berättelseidé →",
    },
    ideaStep: {
      heading: "Din berättelseidé",
      sub: "Börja med kärnan — vad handlar berättelsen om?",
      loglineLabel: "Logline",
      loglinePlaceholder: "En mening som fångar berättelsens essens: vem är protagonisten, vad vill hen, och vad är hindret?",
      titleLabel: "Titel (valfri)",
      titlePlaceholder: "Arbetstiteln",
      genreLabel: "Genre",
      toneLabel: "Ton & stämning",
      btn: "Nästa: Karaktärer →",
    },
    charStep: {
      heading: "Karaktärer",
      sub: "Lägg till dina viktigaste karaktärer. Minst en krävs.",
      nameLabel: "Namn",
      namePlaceholder: "Karaktärens namn",
      roleLabel: "Roll",
      descLabel: "Bakgrund & drivkraft",
      descPlaceholder: "Vad vill karaktären? Vad hindrar hen?",
      addBtn: "+ Lägg till karaktär",
      backBtn: "← Tillbaka",
      nextBtn: "Generera beat sheet →",
    },
    beatStep: {
      fallbackTitle: "Beat Sheet",
      newBtn: "Ny berättelse",
      generating: "Bygger dramaturgisk struktur…",
      error503: "Servern är tillfälligt överbelastad. Vänta en stund och försök igen.",
      error: "Något gick fel. Försök igen.",
      tip: "Tips: Detta beat sheet är ett förslag, inte en tvångströja. Använd det som en karta att avvika ifrån.",
      loadingTips: [
        "Läser igenom din berättelse…",
        "Hittar de dramaturgiska vändpunkterna…",
        "Analyserar karaktärernas drivkrafter…",
        "Bygger strukturen beat för beat…",
        "Kontrollerar att berättelsebågen håller…",
        "Lägger sista handen på strukturen…",
      ],
      generatingBeat: "Genererar…",
      feedbackPlaceholder: "Skriv feedback — t.ex. 'för klichéartat' eller 'protagonisten skulle aldrig göra så här'…",
      feedbackBtn: "Fortsätt →",
      regenerating: "Regenererar…",
      whatIsThis: "Vad är detta?",
      giveFeedback: "Ge feedback",
      editBeat: "Redigera",
      saveBeat: "Spara",
      retryBtn: "Försök igen",
      switchModel: "Byt modell",
      switchModelLabel: "Prova med en annan modell:",
      cancel: "Avbryt",
      scopeQuestion: "Hur mycket ska regenereras?",
      scopeOnly: "Bara detta beat",
      scopeOnlySub: "Resten behålls",
      scopeForward: "Detta beat + alla efterföljande",
      scopeForwardSub: "Anpassar hela slutet",
    },
    genres: ["Thriller","Drama","Komedi","Romantik","Skräck","Science Fiction","Fantasy","Action","Historisk","Biografisk","Mysterium","Äventyr"],
    tones:  ["Mörk och pressad","Lättsam och varm","Poetisk och drömskt","Satirisk","Episk","Intim och personlig","Humoristisk","Dystopisk","Romantisk","Realistisk"],
    roles: [
      { label: "Protagonist",     desc: "Huvudpersonen — den vars resa och förändring berättelsen kretsar kring." },
      { label: "Antagonist",      desc: "Den som aktivt motarbetar protagonisten. Kan vara en person, ett system eller en inre kraft." },
      { label: "Sidekick",        desc: "Den trogna följeslagaren. Speglar protagonisten och lättar ofta stämningen." },
      { label: "Mentor",          desc: "Ger protagonisten kunskap, verktyg eller mod — men gör inte resan åt hen." },
      { label: "Kärleksintresse", desc: "Bär ofta B-storyn och temat. Utmanar protagonisten på ett personligt plan." },
      { label: "Folie",           desc: "Kontrasterar mot protagonisten och gör hens egenskaper tydligare — inte nödvändigtvis en fiende." },
      { label: "Trickster",       desc: "Skapar kaos, utmanar normer och avslöjar sanningar genom humor eller oväntade handlingar." },
      { label: "Budbärare",       desc: "Levererar kallelsen eller avgörande information som sätter berättelsen i rörelse." },
      { label: "Väktare",         desc: "Testar protagonisten vid viktiga trösklar. Kan vara en prövning snarare än en fiende." },
      { label: "Skuggfigur",      desc: "Representerar protagonistens mörka sida eller det hen fruktar att bli — en spegel, inte alltid en fiende." },
    ],
  },
  en: {
    appSubtitle: "Dramaturgy tool for storytellers",
    steps: ["Model", "Idea", "Characters", "Beat Sheet"],
    beatSheetExplainer: "Describe your story idea and characters. The app generates a complete dramatic structure tailored to your story.",
    modelStep: {
      heading: "Choose your story model",
      bestLabel: "Best suited for",
      worstLabel: "Less suited for",
      examplesLabel: "Examples",
      btn: "Next: Story Idea →",
    },
    ideaStep: {
      heading: "Your story idea",
      sub: "Start with the core — what is the story about?",
      loglineLabel: "Logline",
      loglinePlaceholder: "One sentence capturing the essence: who is the protagonist, what do they want, and what stands in the way?",
      titleLabel: "Title (optional)",
      titlePlaceholder: "Working title",
      genreLabel: "Genre",
      toneLabel: "Tone & mood",
      btn: "Next: Characters →",
    },
    charStep: {
      heading: "Characters",
      sub: "Add your key characters. At least one is required.",
      nameLabel: "Name",
      namePlaceholder: "Character's name",
      roleLabel: "Role",
      descLabel: "Background & motivation",
      descPlaceholder: "What does the character want? What holds them back?",
      addBtn: "+ Add character",
      backBtn: "← Back",
      nextBtn: "Generate beat sheet →",
    },
    beatStep: {
      fallbackTitle: "Beat Sheet",
      newBtn: "New story",
      generating: "Building dramatic structure…",
      error503: "The server is temporarily overloaded. Wait a moment and try again.",
      error: "Something went wrong. Please try again.",
      tip: "Tip: This beat sheet is a suggestion, not a straitjacket. Use it as a map to deviate from.",
      loadingTips: [
        "Reading through your story…",
        "Identifying the dramatic turning points…",
        "Analysing your characters' motivations…",
        "Building the structure beat by beat…",
        "Checking that the story arc holds…",
        "Putting the finishing touches on the structure…",
      ],
      generatingBeat: "Generating…",
      feedbackPlaceholder: "Write feedback — e.g. 'too clichéd' or 'my protagonist would never do this'…",
      feedbackBtn: "Continue →",
      regenerating: "Regenerating…",
      whatIsThis: "What is this?",
      giveFeedback: "Give feedback",
      editBeat: "Edit",
      saveBeat: "Save",
      retryBtn: "Try again",
      switchModel: "Switch model",
      switchModelLabel: "Try with a different model:",
      cancel: "Cancel",
      scopeQuestion: "How much should be regenerated?",
      scopeOnly: "This beat only",
      scopeOnlySub: "Rest stays unchanged",
      scopeForward: "This beat + all following",
      scopeForwardSub: "Adapts the rest to match",
    },
    genres: ["Thriller","Drama","Comedy","Romance","Horror","Science Fiction","Fantasy","Action","Historical","Biographical","Mystery","Adventure"],
    tones:  ["Dark and tense","Light and warm","Poetic and dreamlike","Satirical","Epic","Intimate and personal","Humorous","Dystopian","Romantic","Realistic"],
    roles: [
      { label: "Protagonist",        desc: "The main character — the one whose journey and transformation the story revolves around." },
      { label: "Antagonist",         desc: "The one who actively opposes the protagonist. Can be a person, a system, or an inner force." },
      { label: "Sidekick",           desc: "The loyal companion. Mirrors the protagonist and often lightens the mood." },
      { label: "Mentor",             desc: "Gives the protagonist knowledge, tools, or courage — but doesn't make the journey for them." },
      { label: "Love interest",      desc: "Often carries the B story and the theme. Challenges the protagonist on a personal level." },
      { label: "Foil",               desc: "Contrasts with the protagonist to make their qualities clearer — not necessarily an enemy." },
      { label: "Trickster",          desc: "Creates chaos, challenges norms, and reveals truths through humor or unexpected actions." },
      { label: "Herald",             desc: "Delivers the call to adventure or crucial information that sets the story in motion." },
      { label: "Threshold Guardian", desc: "Tests the protagonist at key thresholds. Can be a trial rather than an enemy." },
      { label: "Shadow",             desc: "Represents the protagonist's dark side or what they fear becoming — a mirror, not always an enemy." },
    ],
  },
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const F = { serif: "Georgia, serif" };
const inputStyle = {
  width: "100%", background: "#fff", border: `1px solid ${C.border}`,
  borderRadius: "6px", padding: "12px 14px", color: C.ink, fontSize: "16px",
  fontFamily: F.serif, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
};
const selectStyle = {
  ...inputStyle, appearance: "none", WebkitAppearance: "none", cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23555550' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px",
  background: "#fff",
};
const labelStyle = {
  display: "block", fontSize: "13px", color: C.inkDim,
  marginBottom: "6px", fontFamily: F.serif, fontWeight: "400",
};
const btnPrimary = (active) => ({
  background: active ? C.ink : "rgba(0,0,0,0.04)",
  border: `1px solid ${active ? C.ink : C.border}`,
  color: active ? "#fff" : C.inkFaint,
  padding: "14px 28px", borderRadius: "6px",
  cursor: active ? "pointer" : "not-allowed",
  fontFamily: F.serif, fontSize: "16px", transition: "all 0.2s",
});
const btnSecondary = {
  background: "none", border: `1px solid ${C.border}`, color: C.inkDim,
  padding: "14px 20px", borderRadius: "6px", cursor: "pointer",
  fontFamily: F.serif, fontSize: "16px",
};

// ─── SELECT FIELD ─────────────────────────────────────────────────────────────
const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle}>
      <option value="" style={{ background: "#fff", color: C.inkDim }}>{placeholder || "—"}</option>
      {options.map(o => <option key={o} value={o} style={{ background: "#fff", color: C.ink }}>{o}</option>)}
    </select>
  </div>
);

// ─── MODEL CARD ───────────────────────────────────────────────────────────────
const ModelCard = ({ model, selected, onSelect, t }) => (
  <div onClick={() => onSelect(model.id)} style={{
    background: selected ? "#fff" : C.surface,
    border: `2px solid ${selected ? C.ink : C.border}`,
    borderRadius: "8px", padding: "20px 22px", cursor: "pointer",
    transition: "all 0.18s", marginBottom: "12px",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
      <div>
        <span style={{ fontSize: "18px", fontWeight: "400", color: C.ink, fontFamily: F.serif }}>{model.name}</span>
        <span style={{ fontSize: "13px", color: C.inkDim, fontFamily: F.serif, marginLeft: "10px" }}>{model.author}</span>
      </div>
      {/* Checkmark */}
      <div style={{
        width: "22px", height: "22px", borderRadius: "4px", flexShrink: 0,
        border: `2px solid ${selected ? C.ink : C.border}`,
        background: selected ? C.ink : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s",
      }}>
        {selected && <span style={{ color: "#fff", fontSize: "13px", lineHeight: 1 }}>✓</span>}
      </div>
    </div>
    <p style={{ margin: "0 0 14px", color: C.inkDim, fontSize: "15px", lineHeight: 1.6, fontFamily: F.serif }}>{model.desc}</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }} className="r-grid2-sm">
      <div style={{ background: "#e8f3ea", border: "1px solid #b8d8bc", borderRadius: "5px", padding: "10px 12px" }}>
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#2d6e3a", fontFamily: F.serif }}>{t.modelStep.bestLabel}</p>
        <p style={{ margin: 0, fontSize: "13px", color: "#2d4e2a", lineHeight: 1.5, fontFamily: F.serif }}>{model.best}</p>
      </div>
      <div style={{ background: "#fde8e8", border: "1px solid #f0b8b8", borderRadius: "5px", padding: "10px 12px" }}>
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#8b2020", fontFamily: F.serif }}>{t.modelStep.worstLabel}</p>
        <p style={{ margin: 0, fontSize: "13px", color: "#6b1010", lineHeight: 1.5, fontFamily: F.serif }}>{model.worst}</p>
      </div>
    </div>
    <p style={{ margin: 0, fontSize: "13px", color: C.inkDim, fontFamily: F.serif, fontStyle: "italic" }}>
      {t.modelStep.examplesLabel}: {model.examples}
    </p>
  </div>
);

// ─── CHARACTER CARD ───────────────────────────────────────────────────────────
const CharacterCard = ({ char, index, onChange, onRemove, t }) => {
  const roleLabels = t.roles.map(r => r.label);
  const roleDesc = t.roles.find(r => r.label === char.role)?.desc || null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "7px", padding: "16px", marginBottom: "12px", position: "relative" }}>
      <button onClick={() => onRemove(index)} style={{ position: "absolute", top: "14px", right: "14px", background: "none", border: "none", color: C.inkFaint, cursor: "pointer", fontSize: "20px", lineHeight: 1 }}>×</button>
      <div className="r-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: roleDesc ? "8px" : "12px" }}>
        <div>
          <label style={labelStyle}>{t.charStep.nameLabel}</label>
          <input value={char.name} onChange={e => onChange(index, "name", e.target.value)} placeholder={t.charStep.namePlaceholder} style={inputStyle} />
        </div>
        <SelectField label={t.charStep.roleLabel} value={char.role} onChange={val => onChange(index, "role", val)} options={roleLabels} placeholder="—" />
      </div>
      {roleDesc && (
        <p style={{ margin: "0 0 12px", fontSize: "13px", color: C.inkDim, fontStyle: "italic", lineHeight: 1.5, fontFamily: F.serif, animation: "fadeIn 0.2s ease" }}>
          {roleDesc}
        </p>
      )}
      <div>
        <label style={labelStyle}>{t.charStep.descLabel}</label>
        <textarea value={char.description} onChange={e => onChange(index, "description", e.target.value)}
          placeholder={t.charStep.descPlaceholder} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
      </div>
    </div>
  );
};

// ─── BEAT CARD ────────────────────────────────────────────────────────────────
const BeatCard = ({ beat, label, pct, color, index, id, placeholder, onRegenerate, onEdit, regeneratingFrom, totalBeats, t, lang }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showScope, setShowScope] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const explanation = BEAT_EXPLANATIONS[lang]?.[id];
  const isRegenerating = regeneratingFrom !== null && index >= regeneratingFrom;
  const isFirst = regeneratingFrom !== null && index === regeneratingFrom;
  const isLastBeat = index === totalBeats - 1;

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    if (isLastBeat) { onRegenerate(index, feedback, "only"); setFeedback(""); setShowFeedback(false); return; }
    setShowScope(true);
  };
  const handleScope = (scope) => { onRegenerate(index, feedback, scope); setFeedback(""); setShowFeedback(false); setShowScope(false); };
  const cancelFeedback = () => { setShowFeedback(false); setShowScope(false); setFeedback(""); };

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px", opacity: isRegenerating && !beat ? 0.35 : 1, animation: `fadeIn 0.35s ease ${index * 0.04}s both` }}>
      <div style={{ width: "3px", background: color, borderRadius: "2px", flexShrink: 0, marginTop: "4px" }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", fontFamily: F.serif, color, fontWeight: "400" }}>{label}</span>
            {explanation && (
              <button onClick={() => setShowExplanation(s => !s)} title={t.beatStep.whatIsThis} style={{
                background: showExplanation ? C.ink : "none",
                border: `1px solid ${showExplanation ? C.ink : C.border}`,
                borderRadius: "50%", width: "18px", height: "18px", cursor: "pointer",
                color: showExplanation ? "#fff" : C.inkDim, fontSize: "11px",
                fontFamily: F.serif, display: "flex", alignItems: "center",
                justifyContent: "center", transition: "all 0.15s", flexShrink: 0, padding: 0,
              }}>i</button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", color: C.inkFaint, fontFamily: F.serif }}>{pct}</span>
            {beat && !isRegenerating && !showScope && !isEditing && (
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => { setEditText(beat); setIsEditing(true); setShowFeedback(false); }} style={{
                  background: "none", border: `1px solid ${C.border}`, borderRadius: "4px",
                  cursor: "pointer", color: C.inkDim, fontFamily: F.serif, fontSize: "13px", padding: "3px 10px",
                }}>{t.beatStep.editBeat}</button>
                <button onClick={() => showFeedback ? cancelFeedback() : setShowFeedback(true)} style={{
                  background: showFeedback ? C.surface : "none",
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px", cursor: "pointer", color: C.inkDim,
                  fontFamily: F.serif, fontSize: "13px", padding: "3px 10px", transition: "all 0.15s",
                }}>
                  {showFeedback ? t.beatStep.cancel : t.beatStep.giveFeedback}
                </button>
              </div>
            )}
          </div>
        </div>

        {showExplanation && explanation && (
          <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "5px", padding: "12px 14px", marginBottom: "10px", animation: "fadeIn 0.2s ease" }}>
            <p style={{ margin: 0, fontSize: "14px", color: C.inkDim, lineHeight: 1.65, fontStyle: "italic", fontFamily: F.serif }}>{explanation}</p>
          </div>
        )}

        {isEditing ? (
          <div style={{ marginTop: "4px" }}>
            <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={3}
              style={{ ...{width:"100%",background:"#fff",border:`1px solid ${C.border}`,borderRadius:"6px",padding:"12px 14px",color:C.ink,fontSize:"16px",fontFamily:"Georgia,serif",outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"},resize:"vertical",marginBottom:"8px" }} autoFocus />
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => { onEdit(id, editText); setIsEditing(false); }} style={{ background:C.ink,border:"none",color:"#fff",borderRadius:"5px",padding:"8px 16px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:"14px" }}>{t.beatStep.saveBeat}</button>
              <button onClick={() => setIsEditing(false)} style={{ background:"none",border:`1px solid ${C.border}`,color:C.inkDim,borderRadius:"5px",padding:"8px 14px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:"14px" }}>{t.beatStep.cancel}</button>
            </div>
          </div>
        ) : isRegenerating && !beat
          ? <p style={{ margin: 0, color: C.inkFaint, fontSize: "15px", fontFamily: F.serif, fontStyle: "italic" }}>{isFirst ? t.beatStep.regenerating : "…"}</p>
          : <p style={{ margin: 0, color: C.ink, fontSize: "16px", lineHeight: 1.7, fontFamily: F.serif }}>{beat || placeholder}</p>
        }

        {showFeedback && !showScope && (
          <div style={{ marginTop: "12px", animation: "fadeIn 0.2s ease" }}>
            <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
              placeholder={t.beatStep.feedbackPlaceholder} rows={2}
              style={{ ...inputStyle, fontSize: "15px", resize: "none", marginBottom: "10px" }}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleFeedbackSubmit(); }}
              autoFocus />
            <button onClick={handleFeedbackSubmit} disabled={!feedback.trim()} style={{ ...btnPrimary(!!feedback.trim()), padding: "10px 20px", fontSize: "14px" }}>
              {t.beatStep.feedbackBtn}
            </button>
          </div>
        )}

        {showScope && (
          <div style={{ marginTop: "12px", animation: "fadeIn 0.2s ease" }}>
            <p style={{ margin: "0 0 10px", fontSize: "14px", color: C.inkDim, fontFamily: F.serif }}>{t.beatStep.scopeQuestion}</p>
            <div className="r-col-mobile" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { scope: "only", label: t.beatStep.scopeOnly, sub: t.beatStep.scopeOnlySub },
                { scope: "forward", label: t.beatStep.scopeForward, sub: t.beatStep.scopeForwardSub },
              ].map(({ scope, label, sub }) => (
                <button key={scope} onClick={() => handleScope(scope)} style={{
                  background: "#fff", border: `1px solid ${C.border}`, borderRadius: "6px",
                  padding: "12px 16px", cursor: "pointer", fontFamily: F.serif, textAlign: "left", transition: "border-color 0.15s",
                }}>
                  <div style={{ fontSize: "14px", color: C.ink, marginBottom: "3px" }}>{label}</div>
                  <div style={{ fontSize: "12px", color: C.inkDim }}>{sub}</div>
                </button>
              ))}
              <button onClick={cancelFeedback} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkDim, fontFamily: F.serif, fontSize: "14px", padding: "12px 8px" }}>
                {t.beatStep.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ─── LOADING BAR ─────────────────────────────────────────────────────────────
const LoadingBar = ({ t }) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const tips = t.beatStep.loadingTips || [];

  useEffect(() => {
    // Progress bar — fills to ~85% then slows
    const interval = setInterval(() => {
      setProgress(p => {
        if (p < 70) return p + 1.2;
        if (p < 85) return p + 0.3;
        return p;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!tips.length) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTipIndex(i => (i + 1) % tips.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.12)", borderTopColor: "#1a1a18", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
        <span style={{ fontSize: "15px", fontFamily: "Georgia, serif", color: "#555550", fontStyle: "italic" }}>{t.beatStep.generating}</span>
      </div>
      <div style={{ height: "2px", background: "rgba(0,0,0,0.08)", borderRadius: "2px", overflow: "hidden", marginBottom: "16px" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#1a1a18", borderRadius: "2px", transition: "width 0.18s ease" }} />
      </div>
      {tips.length > 0 && (
        <p style={{
          margin: 0, fontSize: "14px", fontFamily: "Georgia, serif", color: "#888880",
          fontStyle: "italic", lineHeight: 1.6,
          opacity: fade ? 1 : 0, transition: "opacity 0.4s ease",
        }}>
          {tips[tipIndex]}
        </p>
      )}
    </div>
  );
};

// ─── EXPORT BAR ───────────────────────────────────────────────────────────────
const ExportBar = ({ beats, beatLabels, idea, modelInfo, lang, t }) => {
  const [exporting, setExporting] = useState(null);
  const filename = (idea.title || "beat-sheet").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  const exportPDF = async () => {
    setExporting("pdf");
    try {
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
        doc.setFontSize(size); doc.setTextColor(...color);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.splitTextToSize(text, maxW || col).forEach(line => {
          if (y > 277) { doc.addPage(); y = margin; }
          doc.text(line, margin, y); y += lineH || (size * 0.4);
        });
      };
      addText(idea.title || "Beat Sheet", 22, [17, 17, 16], true, col, 9); y += 2;
      addText(`"${idea.logline}"`, 10, [85, 85, 80], false, col, 5); y += 2;
      addText(modelInfo?.name || "", 8, [120, 120, 115], false, col, 4); y += 6;
      doc.setDrawColor(180, 178, 170); doc.setLineWidth(0.3); doc.line(margin, y, W - margin, y); y += 8;
      beatLabels.forEach(b => {
        const beatText = beats[b.id]; if (!beatText) return;
        if (y > 265) { doc.addPage(); y = margin; }
        addText(b.label, 8, [80, 80, 75], true, col * 0.6, 4); y += 1;
        addText(beatText, 10, [40, 40, 38], false, col, 5); y += 5;
      });
      doc.save(`${filename}.pdf`);
    } catch(e) { console.error(e); } finally { setExporting(null); }
  };

  const exportDOCX = async () => {
    setExporting("docx");
    try {
      await new Promise((resolve, reject) => {
        if (window.docx) { resolve(); return; }
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/docx/8.5.0/docx.umd.min.js";
        s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
      });
      const { Document, Paragraph, TextRun, Packer } = window.docx;
      const children = [
        new Paragraph({ children: [new TextRun({ text: idea.title || "Beat Sheet", bold: true, size: 44, color: "111110" })], spacing: { after: 80 } }),
        new Paragraph({ children: [new TextRun({ text: `"${idea.logline}"`, italics: true, size: 20, color: "555550" })], spacing: { after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: modelInfo?.name || "", size: 16, color: "888880" })], spacing: { after: 200 } }),
      ];
      beatLabels.forEach(b => {
        const beatText = beats[b.id]; if (!beatText) return;
        children.push(new Paragraph({ children: [new TextRun({ text: b.label, bold: true, size: 18, color: "333330" })], spacing: { before: 240, after: 60 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: beatText, size: 22, color: "111110" })], spacing: { after: 80 } }));
      });
      const doc = new Document({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `${filename}.docx`; a.click();
      URL.revokeObjectURL(url);
    } catch(e) { console.error(e); } finally { setExporting(null); }
  };

  const exportTXT = () => {
    const lines = [];
    lines.push(idea.title || "Beat Sheet");
    if (idea.logline) lines.push(`"${idea.logline}"`);
    if (modelInfo?.name) lines.push(modelInfo.name);
    lines.push("");
    beatLabels.forEach(b => {
      const beatText = beats[b.id]; if (!beatText) return;
      lines.push(b.label.toUpperCase()); lines.push(beatText); lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${filename}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportMD = () => {
    const lines = [];
    lines.push(`# ${idea.title || "Beat Sheet"}`);
    if (idea.logline) lines.push(`*"${idea.logline}"*`);
    if (modelInfo?.name) lines.push(`*${modelInfo.name}*`);
    lines.push("");
    beatLabels.forEach(b => {
      const beatText = beats[b.id]; if (!beatText) return;
      lines.push(`## ${b.label}`); lines.push(beatText); lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${filename}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  const eb = (onClick, label, loading) => (
    <button onClick={onClick} disabled={!!exporting} style={{
      background: "#fff", border: `1px solid ${C.border}`, color: exporting ? C.inkFaint : C.inkDim,
      borderRadius: "6px", padding: "10px 18px", cursor: exporting ? "default" : "pointer",
      fontFamily: F.serif, fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.18s",
    }}>
      {loading ? <><span style={{ width: "12px", height: "12px", border: `1.5px solid ${C.inkFaint}`, borderTopColor: C.ink, borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />{label}</> : label}
    </button>
  );

  return (
    <div style={{ marginTop: "36px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "14px", color: C.inkDim, fontFamily: F.serif, marginRight: "4px" }}>
        {lang === "sv" ? "Exportera:" : "Export:"}
      </span>
      {eb(exportPDF, exporting === "pdf" ? (lang === "sv" ? "Skapar PDF…" : "Creating PDF…") : "↓ PDF", exporting === "pdf")}
      {eb(exportDOCX, exporting === "docx" ? (lang === "sv" ? "Skapar Word…" : "Creating Word…") : "↓ Word (.docx)", exporting === "docx")}
      {eb(exportTXT, "↓ TXT", false)}
      {eb(exportMD, "↓ Markdown", false)}
    </div>
  );
};

// ─── LANG OPTION ─────────────────────────────────────────────────────────────
const LangOption = ({ lang, label, selected, onSelect }) => (
  <button onClick={() => onSelect(lang)} style={{
    background: selected ? C.ink : "#fff",
    border: `2px solid ${selected ? C.ink : C.border}`,
    borderRadius: "8px", padding: "20px 32px", cursor: "pointer", textAlign: "center",
    transition: "all 0.18s", flex: 1,
  }}>
    <div style={{ fontFamily: F.serif, fontSize: "13px", fontWeight: "400", color: selected ? "rgba(255,255,255,0.7)" : C.inkDim, marginBottom: "6px" }}>{lang.toUpperCase()}</div>
    <div style={{ fontFamily: F.serif, fontSize: "20px", color: selected ? "#fff" : C.ink }}>{label}</div>
  </button>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const getSaved = (key, fallback) => { try { const v = localStorage.getItem("dramaturg_" + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
  const save = (key, val) => { try { localStorage.setItem("dramaturg_" + key, JSON.stringify(val)); } catch {} };

  const [lang, setLangState] = useState(() => getSaved("lang", "sv"));
  const [model, setModelState] = useState(() => getSaved("model", "save_the_cat"));
  const [step, setStepState] = useState(() => { const s = getSaved("step", 0); return s === 4 ? 3 : s; }); // don't restore beat sheet step
  const [idea, setIdeaState] = useState(() => getSaved("idea", { title: "", logline: "", genre: "", tone: "" }));
  const [characters, setCharactersState] = useState(() => getSaved("characters", [{ name: "", role: "", description: "" }]));
  const [beats, setBeats] = useState({});
  const [loading, setLoading] = useState(false);
  const [regeneratingFrom, setRegeneratingFrom] = useState(null);
  const [error, setError] = useState("");

  const setStep = (v) => { setStepState(v); if (v !== 4) save("step", v); };
  const setLang = (v) => { setLangState(v); save("lang", v); };
  const setModel = (v) => { setModelState(v); save("model", v); };
  const setIdea = (v) => { setIdeaState(v); save("idea", v); };
  const setCharacters = (v) => { setCharactersState(v); save("characters", v); };

  const t = T[lang];
  const models = MODELS[lang];
  const beatLabels = BEAT_LABELS[model][lang];
  const modelInfo = models.find(m => m.id === model);

  const addCharacter = () => setCharacters([...characters, { name: "", role: "", description: "" }]);
  const removeCharacter = (i) => setCharacters(characters.filter((_, idx) => idx !== i));
  const updateCharacter = (i, field, val) => { const u = [...characters]; u[i] = { ...u[i], [field]: val }; setCharacters(u); };
  const resetAll = () => {
    setStep(0); setBeats({}); setError(""); setRegeneratingFrom(null);
    setModel("save_the_cat");
    setIdea({ title: "", logline: "", genre: "", tone: "" });
    setCharacters([{ name: "", role: "", description: "" }]);
    try { ["lang","model","step","idea","characters"].forEach(k => localStorage.removeItem("dramaturg_" + k)); } catch {}
  };

  const buildPrompt = (extraInstruction = null, fromIndex = null) => {
    const charText = characters.filter(c => c.name).map(c => `${c.name} (${c.role}): ${c.description}`).join("\n");
    const allKeys = beatLabels.map(b => b.id);
    const modelName = modelInfo?.name || model;
    if (fromIndex !== null && extraInstruction) {
      const confirmedBeats = beatLabels.slice(0, fromIndex).map(b => `${b.id}: "${beats[b.id] || ""}"`).join("\n");
      const regenKeys = beatLabels.slice(fromIndex).map(b => b.id).join(", ");
      return lang === "sv"
        ? `Du är en expert på dramaturgi.\n\nBerättelse: Titel: ${idea.title || "Okänd"} | Genre: ${idea.genre || "Okänd"} | Ton: ${idea.tone || "Okänd"}\nLogline: ${idea.logline}\nKaraktärer: ${charText || "Inga"}\nModell: ${modelName}\n\nGodkända beats:\n${confirmedBeats}\n\nFeedback på "${beatLabels[fromIndex].label}": ${extraInstruction}\n\nRegenerera från "${beatLabels[fromIndex].label}" och framåt. Svara ENBART med JSON: ${regenKeys}`
        : `You are an expert in dramaturgy.\n\nStory: Title: ${idea.title || "Unknown"} | Genre: ${idea.genre || "Unknown"} | Tone: ${idea.tone || "Unknown"}\nLogline: ${idea.logline}\nCharacters: ${charText || "None"}\nModel: ${modelName}\n\nApproved beats:\n${confirmedBeats}\n\nFeedback on "${beatLabels[fromIndex].label}": ${extraInstruction}\n\nRegenerate from "${beatLabels[fromIndex].label}" onward. Respond ONLY with JSON keys: ${regenKeys}`;
    }
    return lang === "sv"
      ? `Du är en expert på dramaturgi.\n\nBerättelse:\nTitel: ${idea.title || "Okänd"}\nGenre: ${idea.genre || "Okänd"}\nTon: ${idea.tone || "Okänd"}\nLogline: ${idea.logline}\n\nKaraktärer:\n${charText || "Inga"}\n\nModell: ${modelName}\n\nGenerera ett komplett beat sheet på SVENSKA. Svara ENBART med JSON (inga backticks) med dessa nycklar:\n${allKeys.join(", ")}\n\nVarje värde: 2–4 meningar, specifika för just den här berättelsen.`
      : `You are an expert in dramaturgy.\n\nStory:\nTitle: ${idea.title || "Unknown"}\nGenre: ${idea.genre || "Unknown"}\nTone: ${idea.tone || "Unknown"}\nLogline: ${idea.logline}\n\nCharacters:\n${charText || "None"}\n\nModel: ${modelName}\n\nGenerate a complete beat sheet in ENGLISH. Respond ONLY with JSON (no backticks) with these keys:\n${allKeys.join(", ")}\n\nEach value: 2–4 sentences specific to this story.`;
  };

  const callAPI = async (prompt, mergeKeys = null) => {
    const response = await fetch("/api/anthropic/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
    });
    if (response.status === 529 || response.status === 503) throw new Error("overloaded");
    const data = await response.json();
    const text = data.content?.map(i => i.text || "").join("") || "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    if (mergeKeys) setBeats(prev => ({ ...prev, ...parsed }));
    else setBeats(parsed);
  };

  const generateBeats = async () => {
    setLoading(true); setError(""); setBeats({}); setRegeneratingFrom(null); setStep(4);
    try { await callAPI(buildPrompt()); }
    catch(e) { setError(e.message === "overloaded" ? t.beatStep.error503 : t.beatStep.error); }
    finally { setLoading(false); }
  };

  const handleFeedback = async (fromIndex, feedback, scope) => {
    setError("");
    const isOnly = scope === "only";
    const endIndex = isOnly ? fromIndex + 1 : beatLabels.length;
    setBeats(prev => { const next = { ...prev }; beatLabels.slice(fromIndex, endIndex).forEach(b => delete next[b.id]); return next; });
    setRegeneratingFrom(fromIndex);
    try {
      if (isOnly) {
        const charText = characters.filter(c => c.name).map(c => `${c.name} (${c.role}): ${c.description}`).join("\n");
        const beatId = beatLabels[fromIndex].id;
        const beatName = beatLabels[fromIndex].label;
        const surroundingBeats = beatLabels.filter((_, i) => Math.abs(i - fromIndex) <= 2 && i !== fromIndex).map(b => `${b.label}: "${beats[b.id] || ""}"`).join("\n");
        const prompt = lang === "sv"
          ? `Du är en expert på dramaturgi.\n\nBerättelse: ${idea.title || "Okänd"} | ${idea.genre || "Okänd"} | ${idea.tone || "Okänd"}\nLogline: ${idea.logline}\nKaraktärer: ${charText || "Inga"}\n\nNärliggande beats:\n${surroundingBeats}\n\nFeedback på "${beatName}": ${feedback}\n\nRegenerera BARA detta beat. Svara ENBART med JSON: {"${beatId}": "..."}\n2–4 meningar, specifikt för berättelsen.`
          : `You are a dramaturgy expert.\n\nStory: ${idea.title || "Unknown"} | ${idea.genre || "Unknown"} | ${idea.tone || "Unknown"}\nLogline: ${idea.logline}\nCharacters: ${charText || "None"}\n\nNearby beats:\n${surroundingBeats}\n\nFeedback on "${beatName}": ${feedback}\n\nRegenerate ONLY this beat. Respond ONLY with JSON: {"${beatId}": "..."}\n2–4 sentences, specific to this story.`;
        await callAPI(prompt, [beatId]);
      } else {
        await callAPI(buildPrompt(feedback, fromIndex), beatLabels.slice(fromIndex).map(b => b.id));
      }
    } catch(e) { setError(e.message === "overloaded" ? t.beatStep.error503 : t.beatStep.error); }
    finally { setRegeneratingFrom(null); }
  };

  const canProceedIdea = idea.logline.length > 20;
  const canProceedChars = characters.some(c => c.name);
  const visibleSteps = t.steps; // ["Modell","Idé","Karaktärer","Beat Sheet"]

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F.serif, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
        * { box-sizing: border-box; }
        input:focus, textarea:focus, select:focus { border-color: rgba(0,0,0,0.5) !important; }
        input::placeholder, textarea::placeholder { color: #999997; }
        select option { background: #fff; color: #111110; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to { transform:rotate(360deg); } }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-thumb { background:#ccc; }
        .r-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .r-grid2-sm { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) {
          .r-grid2 { grid-template-columns: 1fr !important; }
          .r-grid2-sm { grid-template-columns: 1fr !important; }
          .r-hide-mobile { display: none !important; }
          .r-col-mobile { flex-direction: column !important; }
          .r-pad { padding: 24px 18px !important; }
          .r-header { padding: 14px 18px !important; }
          .r-lang-row { flex-direction: column !important; }
          .r-title { font-size: 26px !important; }
        }
      `}</style>

      {/* ── HEADER (step > 0) ── */}
      {step > 0 && (
        <div className="r-header" style={{ borderBottom: `1px solid ${C.border}`, padding: "12px 40px", background: "#fff" }}>
          {/* Logo */}
          <div style={{ cursor: "pointer", marginBottom: "6px", display: "flex", alignItems: "center", gap: "10px" }} onClick={resetAll}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="22" height="22" style={{ flexShrink: 0, opacity: 0.85 }}>
              <path d="M12 49 Q12 56 20 56 Q28 56 28 49 L27 44 Q23 41 20 41 Q17 41 13 44 Z" fill="#1a1a18"/>
              <ellipse cx="20" cy="44" rx="8" ry="3" fill="#3a3a34"/>
              <line x1="20" y1="44" x2="54" y2="8" stroke="#1a1a18" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M54 8 Q47 14 41 20 Q38 17 40 13 Q47 9 54 8Z" fill="#2a2a28" opacity="0.85"/>
              <path d="M48 14 Q41 21 35 28 Q32 25 34 21 Q41 16 48 14Z" fill="#3a3a34" opacity="0.8"/>
              <path d="M42 20 Q35 28 29 35 Q26 32 28 28 Q35 23 42 20Z" fill="#2a2a28" opacity="0.85"/>
              <path d="M36 27 Q29 35 23 42 Q20 39 22 35 Q29 30 36 27Z" fill="#3a3a34" opacity="0.8"/>
              <path d="M54 8 Q47 11 40 16 Q38 12 41 9 Q48 6 54 8Z" fill="#6a6a62" opacity="0.6"/>
              <path d="M48 14 Q41 18 34 23 Q32 19 35 16 Q42 12 48 14Z" fill="#888880" opacity="0.55"/>
              <path d="M42 20 Q35 24 28 30 Q26 26 29 23 Q36 18 42 20Z" fill="#6a6a62" opacity="0.6"/>
              <path d="M20 44 L17 50 L20 47 L23 50 Z" fill="#1a1a18"/>
            </svg>
            <span style={{ fontFamily: F.serif, fontSize: "18px", fontWeight: "400", color: C.ink }}>Dramaturg</span>
          </div>
          {/* Breadcrumbs — below logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {visibleSteps.map((s, i) => {
              const stepNum = i + 1;
              const active = step === stepNum;
              const done = step > stepNum;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={() => done && setStep(stepNum)} style={{
                    background: "none", border: "none", cursor: done ? "pointer" : "default",
                    padding: "2px 6px", borderRadius: "4px", fontFamily: F.serif, fontSize: "13px",
                    color: active ? C.ink : done ? C.inkDim : C.inkFaint,
                    textDecoration: done ? "underline" : "none",
                    textDecorationColor: "rgba(0,0,0,0.2)",
                    whiteSpace: "nowrap",
                  }}>{s}</button>
                  {i < visibleSteps.length - 1 && (
                    <span style={{ color: C.inkFaint, fontSize: "11px" }}>›</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={step === 0 ? "r-pad" : "r-pad"} style={{ maxWidth: "720px", margin: "0 auto", padding: step === 0 ? "60px 40px" : "40px 40px" }}>

        {/* ── 0: LANGUAGE ── */}
        {step === 0 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              {/* Logotype */}
              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="56" height="56" style={{ marginBottom: "14px" }}>
                  <ellipse cx="20" cy="52" rx="10" ry="4.5" fill="#1a1a18" opacity="0.10"/>
                  <path d="M12 49 Q12 56 20 56 Q28 56 28 49 L27 44 Q23 41 20 41 Q17 41 13 44 Z" fill="#1a1a18"/>
                  <ellipse cx="20" cy="44" rx="8" ry="3" fill="#3a3a34"/>
                  <ellipse cx="19" cy="44" rx="3.5" ry="1.2" fill="#555550" opacity="0.5"/>
                  <line x1="20" y1="44" x2="54" y2="8" stroke="#1a1a18" stroke-width="1.2" stroke-linecap="round"/>
                  <path d="M54 8 Q47 14 41 20 Q38 17 40 13 Q47 9 54 8Z" fill="#2a2a28" opacity="0.85"/>
                  <path d="M48 14 Q41 21 35 28 Q32 25 34 21 Q41 16 48 14Z" fill="#3a3a34" opacity="0.8"/>
                  <path d="M42 20 Q35 28 29 35 Q26 32 28 28 Q35 23 42 20Z" fill="#2a2a28" opacity="0.85"/>
                  <path d="M36 27 Q29 35 23 42 Q20 39 22 35 Q29 30 36 27Z" fill="#3a3a34" opacity="0.8"/>
                  <path d="M54 8 Q47 11 40 16 Q38 12 41 9 Q48 6 54 8Z" fill="#6a6a62" opacity="0.6"/>
                  <path d="M48 14 Q41 18 34 23 Q32 19 35 16 Q42 12 48 14Z" fill="#888880" opacity="0.55"/>
                  <path d="M42 20 Q35 24 28 30 Q26 26 29 23 Q36 18 42 20Z" fill="#6a6a62" opacity="0.6"/>
                  <path d="M36 27 Q29 31 22 37 Q20 33 23 30 Q30 25 36 27Z" fill="#888880" opacity="0.55"/>
                  <path d="M20 44 L17 50 L20 47 L23 50 Z" fill="#1a1a18"/>
                  <ellipse cx="20" cy="49" rx="1.5" ry="2" fill="#111110"/>
                </svg>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <h1 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "38px", fontWeight: "400", color: "#1a1a18", letterSpacing: "0.5px", lineHeight: 1 }}>Dramaturg</h1>
                  <div style={{ height: "1.5px", background: "#1a1a18", opacity: 0.15, marginTop: "6px" }} />
                  <p style={{ margin: "6px 0 0", fontFamily: "Georgia, serif", fontSize: "13px", color: "#888880", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {lang === "sv" ? "Dramaturgiverktyg för berättare" : "Dramaturgy tool for storytellers"}
                  </p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "16px", color: "#555550", fontFamily: "Georgia, serif", maxWidth: "420px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
                {lang === "sv" ? T.sv.beatSheetExplainer : T.en.beatSheetExplainer}
              </p>
            </div>
            <div className="r-lang-row" style={{ display: "flex", gap: "14px" }}>
              <LangOption lang="sv" label="Svenska" selected={lang === "sv"} onSelect={(l) => { setLang(l); setStep(1); }} />
              <LangOption lang="en" label="English" selected={lang === "en"} onSelect={(l) => { setLang(l); setStep(1); }} />
            </div>
          </div>
        )}

        {/* ── 1: MODEL ── */}
        {step === 1 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 className="r-title" style={{ fontFamily: F.serif, fontWeight: "400", fontSize: "30px", margin: "0 0 24px" }}>{t.modelStep.heading}</h2>
            {models.map(m => <ModelCard key={m.id} model={m} selected={model === m.id} onSelect={setModel} t={t} />)}
            <div style={{ marginTop: "24px" }}>
              <button onClick={() => setStep(2)} style={{ ...btnPrimary(true), width: "100%", padding: "16px" }}>{t.modelStep.btn}</button>
            </div>
          </div>
        )}

        {/* ── 2: IDEA ── */}
        {step === 2 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 className="r-title" style={{ fontFamily: F.serif, fontWeight: "400", fontSize: "30px", margin: "0 0 6px" }}>{t.ideaStep.heading}</h2>
            <p style={{ color: C.inkDim, fontSize: "16px", marginBottom: "28px", fontFamily: F.serif }}>{t.ideaStep.sub}</p>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>{t.ideaStep.loglineLabel}</label>
              <textarea value={idea.logline} onChange={e => setIdea({ ...idea, logline: e.target.value })}
                placeholder={t.ideaStep.loglinePlaceholder} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div className="r-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
              <div>
                <label style={labelStyle}>{t.ideaStep.titleLabel}</label>
                <input value={idea.title} onChange={e => setIdea({ ...idea, title: e.target.value })} placeholder={t.ideaStep.titlePlaceholder} style={inputStyle} />
              </div>
              <SelectField label={t.ideaStep.genreLabel} value={idea.genre} onChange={val => setIdea({ ...idea, genre: val })} options={t.genres} placeholder="—" />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <SelectField label={t.ideaStep.toneLabel} value={idea.tone} onChange={val => setIdea({ ...idea, tone: val })} options={t.tones} placeholder="—" />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} style={btnSecondary}>{lang === "sv" ? "← Tillbaka" : "← Back"}</button>
              <button onClick={() => setStep(3)} disabled={!canProceedIdea} style={{ ...btnPrimary(canProceedIdea), flex: 1 }}>{t.ideaStep.btn}</button>
            </div>
          </div>
        )}

        {/* ── 3: CHARACTERS ── */}
        {step === 3 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 className="r-title" style={{ fontFamily: F.serif, fontWeight: "400", fontSize: "30px", margin: "0 0 6px" }}>{t.charStep.heading}</h2>
            <p style={{ color: C.inkDim, fontSize: "16px", marginBottom: "24px", fontFamily: F.serif }}>{t.charStep.sub}</p>
            {characters.map((char, i) => <CharacterCard key={i} char={char} index={i} onChange={updateCharacter} onRemove={removeCharacter} t={t} />)}
            <button onClick={addCharacter} style={{ ...btnSecondary, width: "100%", marginBottom: "24px", borderStyle: "dashed" }}>{t.charStep.addBtn}</button>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(2)} style={btnSecondary}>{t.charStep.backBtn}</button>
              <button onClick={generateBeats} disabled={!canProceedChars} style={{ ...btnPrimary(canProceedChars), flex: 1 }}>{t.charStep.nextBtn}</button>
            </div>
          </div>
        )}

        {/* ── 4: BEAT SHEET ── */}
        {step === 4 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <h2 className="r-title" style={{ fontFamily: F.serif, fontWeight: "400", fontSize: "30px", margin: "0 0 4px" }}>{idea.title || t.beatStep.fallbackTitle}</h2>
                {idea.logline && <p style={{ color: C.inkDim, fontSize: "15px", margin: "0 0 2px", fontStyle: "italic", fontFamily: F.serif }}>"{idea.logline}"</p>}
                <p style={{ color: C.inkFaint, fontSize: "13px", margin: 0, fontFamily: F.serif }}>{modelInfo?.name}</p>
              </div>
            </div>

            <div style={{ height: "1px", background: C.border, margin: "20px 0 28px" }} />

            {loading && <LoadingBar t={t} />}

            {error && (
              <div style={{ background: "#fde8e8", border: "1px solid #f0b8b8", borderRadius: "6px", padding: "14px 16px", marginBottom: "20px", fontFamily: F.serif }}>
                <p style={{ margin: "0 0 12px", color: C.err, fontSize: "15px" }}>{error}</p>
                <button onClick={generateBeats} style={{ ...btnPrimary(true), padding: "10px 20px", fontSize: "14px" }}>{t.beatStep.retryBtn}</button>
              </div>
            )}

            <div>
              {beatLabels.map((b, i) => (
                <BeatCard key={b.id} id={b.id} beat={beats[b.id]} label={b.label} pct={b.pct} color={b.color} index={i}
                  placeholder={t.beatStep.generatingBeat} onRegenerate={handleFeedback}
                  onEdit={(id, text) => setBeats(prev => ({...prev, [id]: text}))}
                  regeneratingFrom={regeneratingFrom} totalBeats={beatLabels.length} t={t} lang={lang} />
              ))}
            </div>

            {Object.keys(beats).length > 0 && regeneratingFrom === null && (
              <>
                <ExportBar beats={beats} beatLabels={beatLabels} idea={idea} modelInfo={modelInfo} lang={lang} t={t} />
                <div style={{ marginTop: "16px", padding: "16px 18px", background: "#fff", border: `1px solid ${C.border}`, borderRadius: "6px" }}>
                  <p style={{ margin: 0, fontSize: "14px", color: C.inkDim, fontFamily: F.serif, fontStyle: "italic" }}>{t.beatStep.tip}</p>
                </div>
                {/* Model switcher */}
                <div style={{ marginTop: "24px", padding: "16px 18px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px" }}>
                  <p style={{ margin: "0 0 12px", fontSize: "14px", color: C.inkDim, fontFamily: F.serif }}>{t.beatStep.switchModelLabel}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {MODELS[lang].map(m => (
                      <button key={m.id} onClick={() => { setModel(m.id); generateBeats(); }}
                        style={{
                          background: m.id === model ? C.ink : "#fff",
                          border: `1px solid ${m.id === model ? C.ink : C.border}`,
                          color: m.id === model ? "#fff" : C.inkDim,
                          borderRadius: "5px", padding: "8px 14px", cursor: "pointer",
                          fontFamily: F.serif, fontSize: "14px", transition: "all 0.15s",
                        }}>{m.name}</button>
                    ))}
                  </div>
                </div>
                {/* New story button at bottom */}
                <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${C.border}` }}>
                  <button onClick={resetAll} style={{ ...btnSecondary, width: "100%" }}>{t.beatStep.newBtn}</button>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}