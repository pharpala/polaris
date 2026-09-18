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
  chip: string
  title: string
  sub: string
  options?: { id: string; label: string }[]
  input?: { label: string; placeholder: string }
}

const followEn: Record<string, FollowQ> = {
  newcomer: {
    chip: 'Newcomer to Canada',
    title: 'How long have you been here?',
    sub: 'Newcomers get different guidance in the first year than in the fifth.',
    options: [
      { id: 'soon', label: 'I haven’t arrived yet' },
      { id: 'u6', label: 'Less than 6 months' },
      { id: '6to12', label: '6 to 12 months' },
      { id: '1to3', label: '1 to 3 years' },
      { id: 'o3', label: 'More than 3 years' },
    ],
  },
  student: {
    chip: 'Student',
    title: 'Where are you in your studies?',
    sub: 'It changes what a student account should waive and for how long.',
    options: [
      { id: 'starting', label: 'Just starting' },
      { id: 'partway', label: 'Partway through' },
      { id: 'final', label: 'Final year' },
      { id: 'between', label: 'Between programs' },
    ],
  },
  grad: {
    chip: 'Just graduated',
    title: 'What comes next for you?',
    sub: 'The account that suits a first salary is not the one that suits a job hunt.',
    options: [
      { id: 'job', label: 'Starting a job' },
      { id: 'looking', label: 'Looking for work' },
      { id: 'study', label: 'More study' },
      { id: 'travel', label: 'Travelling first' },
      { id: 'unsure', label: 'Still working it out' },
    ],
  },
  retirement: {
    chip: 'Retirement planning',
    title: 'How far off is retirement?',
    sub: 'Nearer means income and access matter more than growth.',
    options: [
      { id: 'already', label: 'I’m already retired' },
      { id: 'u2', label: 'Within 2 years' },
      { id: '2to5', label: '2 to 5 years' },
      { id: '5to10', label: '5 to 10 years' },
      { id: 'o10', label: 'More than 10 years' },
    ],
  },
  other: {
    chip: 'Something else',
    title: 'Tell us in your own words.',
    sub: 'A sentence is plenty. It goes to the person who reviews your file, if one needs to.',
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
    chip: 'Nouvel arrivant',
    title: 'Depuis combien de temps êtes-vous ici ?',
    sub: 'Les conseils de la première année ne sont pas ceux de la cinquième.',
    options: [
      { id: 'soon', label: 'Je ne suis pas encore arrivé' },
      { id: 'u6', label: 'Moins de 6 mois' },
      { id: '6to12', label: 'De 6 à 12 mois' },
      { id: '1to3', label: 'De 1 à 3 ans' },
      { id: 'o3', label: 'Plus de 3 ans' },
    ],
  },
  student: {
    chip: 'Étudiant',
    title: 'Où en êtes-vous dans vos études ?',
    sub: 'Cela change ce qu’un compte étudiant devrait exempter, et pour combien de temps.',
    options: [
      { id: 'starting', label: 'Je commence' },
      { id: 'partway', label: 'En cours de programme' },
      { id: 'final', label: 'Dernière année' },
      { id: 'between', label: 'Entre deux programmes' },
    ],
  },
  grad: {
    chip: 'Nouveau diplômé',
    title: 'Qu’est-ce qui suit pour vous ?',
    sub: 'Le compte qui convient à un premier salaire n’est pas celui d’une recherche d’emploi.',
    options: [
      { id: 'job', label: 'Je commence un emploi' },
      { id: 'looking', label: 'Je cherche du travail' },
      { id: 'study', label: 'Je poursuis mes études' },
      { id: 'travel', label: 'Je voyage d’abord' },
      { id: 'unsure', label: 'Je ne sais pas encore' },
    ],
  },
  retirement: {
    chip: 'Planification de la retraite',
    title: 'Dans combien de temps la retraite ?',
    sub: 'Plus c’est proche, plus le revenu et l’accès comptent davantage que la croissance.',
    options: [
      { id: 'already', label: 'Je suis déjà retraité' },
      { id: 'u2', label: 'D’ici 2 ans' },
      { id: '2to5', label: 'De 2 à 5 ans' },
      { id: '5to10', label: 'De 5 à 10 ans' },
      { id: 'o10', label: 'Plus de 10 ans' },
    ],
  },
  other: {
    chip: 'Autre situation',
    title: 'Dites-le dans vos mots.',
    sub: 'Une phrase suffit. Elle ira à la personne qui examinera votre dossier, si nécessaire.',
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
