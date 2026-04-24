export type Vibe = 'DEFAULT' | 'KUJAWIAK_THEATER' | 'FOLK_RITUAL' | 'VAPORWAVE' | 'BAZAR_FOLK' | 'POLAND_WAVE' | 'TEATR_ROZPIERDOL' | 'RADIO_BABILON';

interface LoreData {
  subjects: string[];
  verbs: string[];
  objects: string[];
  modifiers: string[];
}

export const LORE_MODULES: Record<Vibe, LoreData> = {
  DEFAULT: {
    subjects: ["Duch Teatru", "KujawiakOS", "Polonez Inscenizacja", "Akordeon Mirek", "Aktor Regionalny", "Taśma Matka", "Czysty Głos", "Remiza w Kowalu", "Rezonator", "Sygnał Przeszłości", "Kod Rytuału", "Przystanek PKS", "Kujawska Inscenizacja", "Oberek-Widmo", "Przejście Teatralne", "Gospodyn z Murzynna", "Dziewka z Murzynka", "Antałek Kultury", "Misterium Kujawskie", "Bęben Obrzędowy"],
    verbs: ["reżyseruje", "przenika", "inscenizuje", "wybrzmiewa w", "transmutuje", "wywołuje", "wystawia", "tańczy z", "generuje", "pętluje", "odgrywa", "destyluje", "zdybał", "prowadzi spektakl", "nastraja", "intonuje"],
    objects: ["ludową duszę", "przestrzeń obrzędową", "zapomniane rytuały", "szumy i pieśni", "regionalne widma", "kujawską glebę", "napięcie na scenie", "teatralne sny", "modry dym", "bachuse w remizie", "scenografię wspomnień", "akustykę stodoły"],
    modifiers: ["w oparach tradycji", "pod wpływem rytuału", "bez maski", "z prędkością zapomnienia", "w liminalnej pustce", "między stodołą a sceną", "kiej słońce wschodzi", "wdy wierny obrzędowi", "w rytmie serca regionu"]
  },
  KUJAWIAK_THEATER: {
    subjects: ["Sufler z Kowala", "Maska Ludowa", "Kostium z Lnu", "Reflektor Sceniczny", "Scenariusz w Brudnopisie", "Dyrektor Objazdowy", "Rekwizyt Magiczny", "Chór Kujawski", "Scenografia z Siana"],
    verbs: ["gra", "interpretuje", "deklamuje", "improwizuje", "podpowiada", "wchodzi w rolę", "buduje napięcie", "odsłania kurtynę", "kończy akt"],
    objects: ["dramat wiejski", "kujawską komedię", "tragedię na bazarze", "monolog wewnętrzny", "gestykulację przodków", "widowisko światła", "misterium chleba"],
    modifiers: ["na deskach remizy", "przy pełnej sali", "z pasją amatora", "w świetle lamp naftowych", "poza konwencją", "w głębokiej ciszy", "pod okiem Janka Sztukmistrza"]
  },
  FOLK_RITUAL: {
    subjects: ["Obrzędnik", "Gromnica", "Wieniec Dożynkowy", "Pieśń Przejścia", "Rytualny Akordeon", "Starosta Weselny", "Widmo Kujawskie", "Szeptucha z Murzynna"],
    verbs: ["odprawia", "oczyszcza", "przywołuje", "celebruje", "namaszcza", "składa w ofierze", "wiązuje", "zaklina"],
    objects: ["cykl natury", "pamięć zbiorową", "duchy przodków", "ziemskie dary", "sacrum bazarowe", "mistyczną więź", "prawdę ukrytą w szumie"],
    modifiers: ["na rozstajach dróg", "w blasku księżyca", "zgodnie z przekazem", "przy dźwiękach bębna", "w transie", "nad brzegiem Wisły", "w nocy świętojańskiej"]
  },
  VAPORWAVE: {
    subjects: ["Gipsowe Popiersie", "Palma z Plastiku", "Fontanna w Galerii", "Macintosh Plus", "Północny Neon", "Kaseta Video-8", "Windows 95 Logo"],
    verbs: ["spowalnia", "estetyzuje", "pętluje", "rozmywa", "degraduje", "syntezuje", "marzy o"],
    objects: ["różowe sny", "cyfrowe marzenia", "błękitne niebo .BMP", "lo-fi Poloneza", "szum oceanu danych", "gradienty zachodu"],
    modifiers: ["w zwolnionym tempie", "z echem", "w barwach zachodu", "a e s t h e t i c", "poprzez filtr lo-fi", "w nieskończonym reverbie"]
  },
  BAZAR_FOLK: {
    subjects: ["Szczęka z Bazaru", "Pan Mirek", "Aktor Bazarowy", "Reklamówka z Biedronki", "Kaseta z Pieśniami", "Scena Polowa", "Budka z Kulturą"],
    verbs: ["prezentuje", "negocjuje rolę", "przebija ofertę", "opchnie rekwizyt", "zachwala widowisko", "wymienia doświadczenia", "podrabia styl"],
    objects: ["ludowe autentyki", "płytę z nagraniem", "regionalne skarby", "widowisko za złotówkę", "kasetę VHS z występu", "puste rzędy"],
    modifiers: ["pod mostem", "ze sceny polowej", "bez biletu", "w oparach lokalnej kuchni", "za dziękuje", "tylko dzisiaj"]
  },
  POLAND_WAVE: {
    subjects: ["Wielka Płyta", "Przystanek PKS", "Latarnia Uliczna", "Betonowy Płot", "Sklep Spożywczy", "Klatka Schodowa", "Antena Satelitarna"],
    verbs: ["otacza", "przytłacza", "neonizuje", "betonuje", "szarzeje", "rezonuje w", "odbija"],
    objects: ["miejską dżunglę", "nocny spacer", "światło sodowe", "blokowisko", "pamięć osiedla", "neonowy blask"],
    modifiers: ["w deszczu", "przy dźwiękach syntezatora", "pod blokiem", "w świetle jarzeniówek", "w rytmie pociągu", "między garażami"]
  },
  TEATR_ROZPIERDOL: {
    subjects: ["Zepsuty Akordeon", "Pijany Sufler", "Płonąca Scenografia", "Agresywny Kujawiak", "Chaos Teatralny", "Rozpierdol Artystyczny", "Buntownik z Remizy"],
    verbs: ["burzy", "rozpierdala", "anihiluje", "podpala", "krzyczy na", "zrywa kurtynę", "atakuje", "wymiotuje sztuką"],
    objects: ["sztywną tradycję", "porządek społeczny", "bezpieczną scenę", "mieszczański spokój", "iluzję stabilności", "fałszywy uśmiech"],
    modifiers: ["z furią", "bez litości", "w czystym chaosie", "na oczach przerażonej widowni", "pod prąd", "z prędkością światła i wódki"]
  },
  RADIO_BABILON: {
    subjects: ["Radiostacja Babilon", "Tajemniczy Głos", "Przekaźnik z Reszek", "Antena na Stodole", "Sygnał z Eteru", "Pirat Radiowy", "Częstotliwość 108.0"],
    verbs: ["nadaje", "emituje", "koduje", "zakłóca", "szepcze o", "przemyca", "budzi", "filtruje"],
    objects: ["prawdę o Kujawach", "zakazaną lore", "szum informacyjny", "kod wyzwolenia", "melodię buntu", "ukryte przekazy"],
    modifiers: ["między falami", "z głębi nocy", "ponad cenzurą", "w każdym odbiorniku", "bez licencji", "prosto w podświadomość"]
  }
};

export const generateLoreLine = (vibe: Vibe = 'DEFAULT') => {
  const module = LORE_MODULES[vibe] || LORE_MODULES.DEFAULT;
  const currentModule = Math.random() > 0.8 ? LORE_MODULES[Object.keys(LORE_MODULES)[Math.floor(Math.random() * Object.keys(LORE_MODULES).length)] as Vibe] : module;

  const s = currentModule.subjects[Math.floor(Math.random() * currentModule.subjects.length)];
  const v = currentModule.verbs[Math.floor(Math.random() * currentModule.verbs.length)];
  const o = currentModule.objects[Math.floor(Math.random() * currentModule.objects.length)];
  const m = currentModule.modifiers[Math.floor(Math.random() * currentModule.modifiers.length)];
  
  return `${s} ${v} ${o} ${m}.`;
};

export const getLoreSnippet = (vibe: Vibe = 'DEFAULT') => {
  const snippets: Record<Vibe, string[]> = {
    DEFAULT: [
      "Pamiętaj: Kujawiak to nie taniec, to akt teatralny.",
      "Scena jest wszędzie. Nawet w twoim RAM-ie.",
      "Nie ufaj gładkim powierzchniom. Prawda jest chropowata jak szum VHS.",
      "Spektakl to najwyższa forma medytacji.",
      "Kiej w Murzynku teatr buchnie, to i w Murzynnie serce pęknie.",
      "Modry dym z Poloneza to teatralna aura."
    ],
    KUJAWIAK_THEATER: [
      "Scenariusz pisze się sam, na marginesach codzienności.",
      "Kurtyna opada tylko po to, byś mógł zobaczyć siebie.",
      "Teatr to kradzież rzeczywistości w formacie 4:3.",
      "Gesty mówią głośniej niż słowa, kiej są szczere.",
      "Aktor nie gra, on się staje kujawską glebą."
    ],
    FOLK_RITUAL: [
      "Każdy krok w korowodzie to linia przeznaczenia.",
      "Kliknij 'OK', aby zaakceptować rolę.",
      "Rytuał to powrót do korzeni, których nigdy nie widziałeś.",
      "Pamięć przodków zwiększa precyzję gry o 200%.",
      "Kujawska pieśń to firewall przeciwko zapomnieniu."
    ],
    VAPORWAVE: [
      "Wszystko jest scenografią, dopóki nie skończy się prąd.",
      "Czy androidy marzą o gipsowych popiersiach?",
      "Centrum Handlowe to świątynia zapomnianych widowisk.",
      "Lo-fi to jedyna droga do autentyczności."
    ],
    BAZAR_FOLK: [
      "Gwarancja do bramy, a potem spektakl trwa dalej.",
      "Sztuka czyni cuda, teatr czyni duszę.",
      "Kostium nie szeleści, on nadaje komunikat.",
      "Prawdziwa sztuka nie potrzebuje certyfikatu, tylko widza."
    ],
    POLAND_WAVE: [
      "Blokowisko to wielki amfiteatr przetwarzający sny.",
      "Beton nie zapomina ról.",
      "Sodowe światło to naturalny filtr dramatu.",
      "PKS spóźnia się tylko po to, byś mógł poczuć sceniczny czas."
    ],
    TEATR_ROZPIERDOL: [
      "Sztuka to nie piękno. Sztuka to ogień w remizie.",
      "Jeśli scena nie trzeszczy, to nie jest teatr.",
      "Rozpierdol to najwyższa forma reżyserii.",
      "Prawdziwy aktor pije tylko łzy widowni (i spirytus).",
      "Kujawiak to taniec wojenny, kiej go dobrze zagrasz."
    ],
    RADIO_BABILON: [
      "Słuchasz Radia Babilon. Sygnał jest wszędzie.",
      "Nie szukaj nas na skali FM. Szukaj nas w szumie krwi.",
      "Babilon nadaje. My wiemy, co Mirek ukrył w Polonezie.",
      "Antena na stodole to twój portal do wolności.",
      "Głos z eteru nie kłamie. On tylko inaczej koduje prawdę."
    ]
  };

  const currentSnippets = snippets[vibe] || snippets.DEFAULT;
  return currentSnippets[Math.floor(Math.random() * currentSnippets.length)];
};

export const DEEP_LORE = {
  events: [
    { date: "1994-08-15", name: "Inauguracja Teatru Prędkości", description: "Dzień, w którym po raz pierwszy zsynchronizowano sygnał akordeonu z teatralnym echem remizy w Kowalu. Powstanie metody Raptem." },
    { date: "1995-05-20", name: "Widowisko Murzynno-Murzynek", description: "Wielka inscenizacja łącząca wieś Murzynno z Murzynkiem. To tutaj narodził się pierwotny język Grupy Raptem." },
    { date: "1997-03-12", name: "Etiuda w PKS Inowrocław", description: "Autobus relacji Inowrocław-Włocławek stał się mobilną sceną na 3 minuty. Pasażerowie stali się częścią improwizacji." },
    { date: "1999-09-09", name: "Powstanie Radia Babilon", description: "Wybuch chaosu na częstotliwościach regionalnych. Tajemniczy nadajnik w Reszkach zaczyna emitować lore Raptem poza kontrolą sołtysa." },
    { date: "2002-12-31", name: "Ostatni Monolog", description: "Legendarne widowisko, w którym jedynym aktorem był dźwięk silnika Poloneza Caro nadawany w kodzie Morse'a." },
    { date: "2024-04-24", name: "Kodowanie Obrzędowe", description: "Wprowadzenie protokołu 'Folklor Algorytmiczny'. Pierwsza próba generalna teatru w formacie 4K/VHS." },
    { date: "2026-06-06", name: "Manifest Teatru Rozpierdol", description: "Przewidywana data wielkiego buntu artystycznego. Scena w Kowalu ma stanąć w płomieniach (metaforycznie... lub nie)." }
  ],
  rituals: [
    { name: "Przygotowanie Sceny", steps: ["Wypełnij przestrzeń ciszą przedburzową.", "Zagraj nutę G na starym akordeonie.", "Czekaj na odpowiedź z głębi widowni."] },
    { name: "Przywołanie Ducha Regionu", steps: ["Rozłóż lniane płótno na ziemi kujawskiej.", "Ustaw 3 monitory CRT jako ołtarze światła.", "Puść kasetę z nagraniem śpiewu ptaków z 1991 roku."] },
    { name: "Inscenizacja Przeszłości", steps: ["Włóż maskę z kory dębowej.", "Wyrecytuj monolog o zapomnianym bazarze.", "Zapal neonową gromnicę."] }
  ],
  lyrics: [
    "Oj, kiej w Murzynnie teatr grała,\nPod stodołą dusza drżała,\nMirek miech ten pieśnią poił,\nA Polonez w cieniu stoił.",
    "Dziewka w dąbrowie role sypała,\nWszystkie gesty w antałek składała,\nSzum przeszłości po polach się niesie,\nZdybał Janek sztukę w gęstym lesie.",
    "Jadziem, jadziem na ten teatr modry,\nKujawiakOS jest wdy bardzo szczodry,\nGrać i śpiewać będziem aż do rana,\nPóki rola nie zostanie zgrana."
  ]
};

export const generateFolkLyric = () => {
  const lyricsPool = DEEP_LORE.lyrics;
  const chorus = [
    "Raptem folk! Raptem teatr! Regionalny wiatr!",
    "Murzynno, Murzynek - inscenizacji budynek!",
    "Kujawy, Kujawy - duchowe sprawy!",
    "Teatr prężny, teatr nasz - kujawską trzymasz straż!"
  ];
  const base = lyricsPool[Math.floor(Math.random() * lyricsPool.length)];
  const ref = chorus[Math.floor(Math.random() * chorus.length)];
  return `${base}\n\n(REF: ${ref})`;
};

export const UI_GLITCHES: Record<string, string[]> = {
  "PULPIT": ["PULPIT_WIDMO", "STREFA_SCENY", "BAZAR_CORE", "C:\\ARCHIWUM"],
  "MUZYKA": ["HAŁAS_LUDOWY", "RYTUAŁ_WAV", "ECHO_REMIZY", "AUDIO_ENTROPIA"],
  "WIDEO": ["VHS_DREAM", "SZUM_PRZODKÓW", "OPTYKA_TEATRU", "PIKSELOZA"],
  "O NAS": ["README.RAW", "MANIFEST_TEATRU", "KIM_JESTEŚMY?", "PROTOKÓŁ_RAPTEM"],
  "KONTAKT": ["MODEM_KOWAL", "LINIA_SCENY", "SYGNAŁ_PKS", "WYŚLIJ_RYTUAŁ"],
  "SKLEPIK": ["HANDEL_SZTUKĄ", "BAZAR_KULTURY", "KUP_KASETE", "BONY_W_GÓRĘ"]
};

export const getRandomGlitch = (key: string) => {
  const glitches = UI_GLITCHES[key];
  if (!glitches) return key;
  return glitches[Math.floor(Math.random() * glitches.length)];
};

type VibeListener = (vibe: Vibe) => void;

class VibeManager {
  private currentVibe: Vibe = 'DEFAULT';
  private listeners: VibeListener[] = [];

  setVibe(vibe: Vibe) {
    this.currentVibe = vibe;
    this.listeners.forEach(l => l(vibe));
  }

  getVibe() {
    return this.currentVibe;
  }

  subscribe(listener: VibeListener) {
    this.listeners.push(listener);
    listener(this.currentVibe);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const vibeManager = new VibeManager();
