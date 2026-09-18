/**
 * All customer-facing copy. English and French are complete — the deck's
 * claim is that language support is embedded in the journey rather than
 * bolted on, so the copy lives here per language instead of being wrapped
 * around an English original.
 */

export type LangCode = 'en' | 'fr'

/**
 * A follow-up question, opened by one of the answers to the first question.
 * The set a customer sees is built from what they told us, so two people
 * never walk the same path.
 */
export type FollowQ = {
  title: string
  sub: string
  options?: { id: string; label: string }[]
  input?: { label: string; placeholder: string }
}

const followEn: Record<string, FollowQ> = {
  newcomer: {
    title: 'Let’s get your banking set up in Canada.',
    sub: 'You said you just moved. Where are you in the move?',
    options: [
      { id: 'here', label: 'I’m already in Canada' },
      { id: 'soon', label: 'I’m preparing to arrive' },
    ],
  },
  student: {
    title: 'Let’s build this around school.',
    sub: 'You said you’re a student. Where are you with it?',
    options: [
      { id: 'now', label: 'I’m studying now' },
      { id: 'soon', label: 'I start soon' },
    ],
  },
  grad: {
    title: 'Let’s set you up for what’s next.',
    sub: 'You said you just graduated. What does the year ahead look like?',
    options: [
      { id: 'work', label: 'I’ve lined up work' },
      { id: 'looking', label: 'I’m still looking' },
    ],
  },
  retirement: {
    title: 'Let’s plan around retirement.',
    sub: 'You said you’re planning for it. How close is it?',
    options: [
      { id: 'already', label: 'I’m already retired' },
      { id: 'soon', label: 'It’s still a few years off' },
    ],
  },
  other: {
    title: 'Tell us in your own words.',
    sub: 'You said there’s something else. A sentence is plenty.',
    input: {
      label: 'What should we know?',
      placeholder: 'I’m self-employed and my income varies month to month…',
    },
  },
}

const en = {
  meta: { native: 'English', note: 'English', chip: 'EN' },
  brand: 'Polaris',
  back: 'Back',
  legal: 'Polaris Bank of Canada · Member CDIC',

  /* Disclosure by default — one of the program's Responsible AI controls. */
  aiNote: 'AI guides this application. A person is always one tap away.',
  saved: 'Saved on this device. Stop and resume at any time.',
  skip: 'Skip',
  help: 'Need help?',

  lang: {
    open: 'Change language',
    title: 'Choose your language',
    body: 'Everything that follows is in the language you pick, including the agreements you sign.',
    done: 'Done',
  },

  q: {
    step: (n: number, of: number) => `Question ${n} of ${of}`,
    change: 'You can change any of this later.',
    choose: 'Choose one',
    chooseAny: 'Pick as many as apply',
  },

  profile: {
    title: 'Anything we should know about you?',
    sub: 'Choose any that apply. You can skip.',
    foot: 'This shapes what we recommend. It has no bearing on whether you are approved.',
    cta: 'Continue',
    options: [
      { id: 'newcomer', label: 'I’m a newcomer to Canada' },
      { id: 'student', label: 'I’m a student' },
      { id: 'grad', label: 'I just graduated' },
      { id: 'retirement', label: 'I’m retirement planning' },
      { id: 'other', label: 'Other' },
    ],
  },

  follow: followEn,

  goals: {
    title: 'What do you need the account for?',
    sub: 'Your answers narrow the catalogue to the two or three accounts that fit.',
    foot: 'Nothing here is a credit check, and none of it is shared outside Polaris.',
    cta: 'See what fits',
    options: [
      { id: 'everyday', label: 'Everyday spending and bills', note: 'Debit, transfers, pre-authorised payments' },
      { id: 'paid', label: 'Getting paid', note: 'Direct deposit from an employer or client' },
      { id: 'saving', label: 'Saving toward something', note: 'A goal with a date on it' },
      { id: 'credit', label: 'Building a credit history', note: 'Starting from nothing, or starting again' },
      { id: 'abroad', label: 'Sending money abroad', note: 'Supporting family in another country' },
    ],
  },
}

export type Dict = typeof en

const followFr: Record<string, FollowQ> = {
  newcomer: {
    title: 'Mettons en place vos services bancaires au Canada.',
    sub: 'Vous avez dit que vous venez d’arriver. Où en êtes-vous ?',
    options: [
      { id: 'here', label: 'Je suis déjà au Canada' },
      { id: 'soon', label: 'Je prépare mon arrivée' },
    ],
  },
  student: {
    title: 'Construisons cela autour de vos études.',
    sub: 'Vous avez dit que vous êtes étudiant. Où en êtes-vous ?',
    options: [
      { id: 'now', label: 'J’étudie en ce moment' },
      { id: 'soon', label: 'Je commence bientôt' },
    ],
  },
  grad: {
    title: 'Préparons la suite.',
    sub: 'Vous avez dit que vous venez d’obtenir votre diplôme. À quoi ressemble l’année à venir ?',
    options: [
      { id: 'work', label: 'J’ai trouvé un emploi' },
      { id: 'looking', label: 'Je cherche encore' },
    ],
  },
  retirement: {
    title: 'Planifions autour de la retraite.',
    sub: 'Vous avez dit que vous la préparez. Est-elle proche ?',
    options: [
      { id: 'already', label: 'Je suis déjà retraité' },
      { id: 'soon', label: 'Encore quelques années' },
    ],
  },
  other: {
    title: 'Dites-le dans vos mots.',
    sub: 'Vous avez dit qu’il y a autre chose. Une phrase suffit.',
    input: {
      label: 'Que devrions-nous savoir ?',
      placeholder: 'Je suis travailleur autonome et mes revenus varient chaque mois…',
    },
  },
}

const fr: Dict = {
  meta: { native: 'Français', note: 'French', chip: 'FR' },
  brand: 'Polaris',
  back: 'Retour',
  legal: 'Banque Polaris du Canada · Membre de la SADC',

  aiNote: "L'IA vous guide dans cette demande. Une personne est toujours à un geste près.",
  saved: 'Enregistré sur cet appareil. Arrêtez et reprenez quand vous voulez.',
  skip: 'Passer',
  help: 'Besoin d’aide ?',

  lang: {
    open: 'Changer de langue',
    title: 'Choisissez votre langue',
    body: 'Tout ce qui suit sera dans la langue choisie, y compris les documents que vous signez.',
    done: 'Terminé',
  },

  q: {
    step: (n: number, of: number) => `Question ${n} sur ${of}`,
    change: 'Vous pourrez modifier tout cela plus tard.',
    choose: 'Choisissez une réponse',
    chooseAny: 'Choisissez tout ce qui s’applique',
  },

  profile: {
    title: 'Y a-t-il quelque chose à savoir sur vous ?',
    sub: 'Choisissez tout ce qui s’applique. Vous pouvez passer.',
    foot: 'Cela façonne nos recommandations. Cela n’influe pas sur l’acceptation de votre demande.',
    cta: 'Continuer',
    options: [
      { id: 'newcomer', label: 'Je suis nouvel arrivant au Canada' },
      { id: 'student', label: 'Je suis étudiant' },
      { id: 'grad', label: 'Je viens d’obtenir mon diplôme' },
      { id: 'retirement', label: 'Je planifie ma retraite' },
      { id: 'other', label: 'Autre' },
    ],
  },

  follow: followFr,

  goals: {
    title: 'À quoi vous servira ce compte ?',
    sub: 'Vos réponses ramènent le catalogue aux deux ou trois comptes qui vous conviennent.',
    foot: 'Rien ici n’est une vérification de crédit, et rien n’est communiqué à l’extérieur de Polaris.',
    cta: 'Voir ce qui convient',
    options: [
      { id: 'everyday', label: 'Dépenses et factures courantes', note: 'Débit, virements, paiements préautorisés' },
      { id: 'paid', label: 'Recevoir ma paie', note: 'Dépôt direct d’un employeur ou d’un client' },
      { id: 'saving', label: 'Épargner pour un projet', note: 'Un objectif avec une date' },
      { id: 'credit', label: 'Bâtir un historique de crédit', note: 'En partant de zéro, ou en recommençant' },
      { id: 'abroad', label: 'Envoyer de l’argent à l’étranger', note: 'Soutenir ma famille dans un autre pays' },
    ],
  },
}

export const dicts: Record<LangCode, Dict> = { en, fr }
export const langOrder: LangCode[] = ['en', 'fr']
