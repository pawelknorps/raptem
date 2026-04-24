const starters = [
  "Kto Polonezem w błoto wjedzie,",
  "Gdy akordeon w remizie gra,",
  "Na bazarze u Pana Janka,",
  "Kto spirytusu nie rozcieńcza,",
  "Gdy oberek pętlę łapie,",
  "W cieniu wielkiej stodoły,",
  "Kiej dziewka w dąbrowie śpiewa,",
  "Gdy gospodyn antałek otwiera,",
  "Kto w Murzynnie wixę poczuje,",
  "Gdy modry dym z wydechu bucha,"
];

const middles = [
  "ten wixę w sercu poczuje,",
  "każda dycha się raduje,",
  "duch Mirek się objawia,",
  "ten system szybko naprawia,",
  "rdza z Poloneza odpada,",
  "nowa kaseta się składa,",
  "ten wdy radosny będzie,",
  "skakać w przód on zacznie,",
  "zdybać on szczęście w dresie,",
  "algorytm mu się nie zatrzęsie,"
];

const ends = [
  "i w Polskę ruszy w tany.",
  "bo system jest naoliwiony.",
  "aż remiza zacznie drżeć.",
  "i wixy nie będzie dość.",
  "pod okiem Janka-Sztukmistrza.",
  "w rytm binarnego kujawiaka.",
  "kiej pętla się domknie.",
  "na bazarze w Murzynku.",
  "zanim procesor mu zgaśnie.",
  "jadziem w stronę słońca!"
];

export const getFolkFortune = () => {
  const s = starters[Math.floor(Math.random() * starters.length)];
  const m = middles[Math.floor(Math.random() * middles.length)];
  const e = ends[Math.floor(Math.random() * ends.length)];
  return `${s} ${m} ${e}`;
};

export default { getFolkFortune };
