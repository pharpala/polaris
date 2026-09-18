/**
 * All customer-facing copy. English and French are complete — the deck's
 * claim is that language support is embedded in the journey rather than
 * bolted on, so the copy lives here per language instead of being wrapped
 * around an English original.
 */

export type LangCode = 'en' | 'fr'

const en = {
  meta: { native: 'English', note: 'English', chip: 'EN' },
  brand: 'Polaris',
  back: 'Back',
  legal: 'Polaris Bank of Canada · Member CDIC',

  /* Disclosure by default — one of the program's Responsible AI controls. */
  aiNote: 'AI guides this application. A person is always one tap away.',

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
    title: 'Which of these sounds most like you?',
    sub: 'It decides which accounts we show you and which documents we ask for.',
    foot: 'This shapes what we recommend. It has no bearing on whether you are approved.',
    cta: 'Continue',
    options: [
      { id: 'newcomer', label: 'New to Canada', note: 'Arrived in the last five years, or arriving soon' },
      { id: 'student', label: 'Student', note: 'Enrolled, or starting at a college or university' },
      { id: 'working', label: 'Working and building', note: 'Employed or self-employed, banking day to day' },
      { id: 'retirement', label: 'Near or in retirement', note: 'Winding down work, or already retired' },
    ],
  },

  status: {
    title: 'Your status in Canada',
    sub: 'The accounts we can open and the documents we can accept depend on it.',
    label: 'Status',
    placeholder: 'Choose your status',
    sheetTitle: 'Your status in Canada',
    sheetBody: 'Pick the one on your document. Foreign passports, work permits and study permits are all accepted here.',
    foot: 'We ask so we know which identity documents to accept — not to decide whether you are eligible.',
    cta: 'Continue',
    options: [
      { id: 'citizen', label: 'Canadian citizen' },
      { id: 'pr', label: 'Permanent resident' },
      { id: 'work', label: 'Work permit' },
      { id: 'study', label: 'Study permit' },
      { id: 'other', label: 'Visitor, or something else' },
    ],
  },

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

const fr: Dict = {
  meta: { native: 'Français', note: 'French', chip: 'FR' },
  brand: 'Polaris',
  back: 'Retour',
  legal: 'Banque Polaris du Canada · Membre de la SADC',

  aiNote: "L'IA vous guide dans cette demande. Une personne est toujours à un geste près.",

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
    title: 'Laquelle de ces situations vous ressemble le plus ?',
    sub: 'Cela détermine les comptes que nous vous montrons et les documents que nous demandons.',
    foot: 'Cela façonne nos recommandations. Cela n’influe pas sur l’acceptation de votre demande.',
    cta: 'Continuer',
    options: [
      { id: 'newcomer', label: 'Nouvel arrivant au Canada', note: 'Arrivé depuis moins de cinq ans, ou bientôt' },
      { id: 'student', label: 'Étudiant', note: 'Inscrit, ou en voie de l’être, au collège ou à l’université' },
      { id: 'working', label: 'Au travail', note: 'Salarié ou travailleur autonome, au quotidien' },
      { id: 'retirement', label: 'Proche de la retraite ou retraité', note: 'En fin de carrière, ou déjà retraité' },
    ],
  },

  status: {
    title: 'Votre statut au Canada',
    sub: 'Les comptes que nous pouvons ouvrir et les documents que nous acceptons en dépendent.',
    label: 'Statut',
    placeholder: 'Choisissez votre statut',
    sheetTitle: 'Votre statut au Canada',
    sheetBody: 'Choisissez celui qui figure sur votre document. Les passeports étrangers, les permis de travail et les permis d’études sont tous acceptés.',
    foot: 'Nous le demandons pour savoir quels documents d’identité accepter, non pour juger votre admissibilité.',
    cta: 'Continuer',
    options: [
      { id: 'citizen', label: 'Citoyen canadien' },
      { id: 'pr', label: 'Résident permanent' },
      { id: 'work', label: 'Permis de travail' },
      { id: 'study', label: 'Permis d’études' },
      { id: 'other', label: 'Visiteur, ou autre situation' },
    ],
  },

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
