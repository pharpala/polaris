/**
 * All customer-facing copy. English and French are complete — the deck's
 * claim is that language support is embedded in the journey rather than
 * bolted on, so the copy lives here per language instead of being wrapped
 * around an English original.
 */

import type { Intent } from './assistant'

/** A product's words. The rules that rank them live in `products.ts`. */
export type ProductCopy = { name: string; tagline: string; terms: string; trade: string }

export type LangCode = 'en' | 'fr'

/**
 * A follow-up question, opened by one of the answers to the first question.
 * The set a customer sees is built from what they told us, so two people
 * never walk the same path.
 */
/** The closing question, grouped. Two sets exist: one for the newcomer path
 *  and one for everyone else, so the wording and the options both bend to
 *  what the customer told us. */
export type GoalSet = {
  title: string
  sub: string
  cta: string
  groups: { label: string; options: { id: string; label: string }[] }[]
}

export type FollowQ = {
  title: string
  sub: string
  options?: { id: string; label: string }[]
  input?: { label: string; placeholder: string }
}

const assistEn = {
  title: 'Polaris help',
  sub: 'We’ll reply right away',
  greeting: 'Hi! I can help while you set up your account. Ask me anything.',
  placeholder: 'Ask a question...',
  send: 'Send',
  close: 'Close help',
  typing: 'Polaris is typing',
  fallback:
    'I don’t have a good answer for that one. Want me to pass you to a person? They’ll have your answers already, so you won’t repeat yourself.',
  handoff:
    'Passing you to someone now. They’ll see everything you’ve told us so far, so you won’t start over. The wait is about four minutes.',
  /** Offered per step: the questions people actually ask there. */
  prompts: {
    profile: ['id', 'time', 'resume'],
    follow: ['id', 'branch', 'privacy'],
    goals: ['fee', 'credit', 'privacy'],
  },
  intents: [
    {
      id: 'id',
      q: 'Which ID should I use?',
      a: 'You can use a Canadian passport, a provincial photo ID, or a driver’s licence. Choose the one you have with you now.',
      aNewcomer:
        'You can use a Foreign passport, PR card, Canadian driver’s licence, Canadian passport, or a provincial photo ID. Choose the one you have with you now.',
      match: ['id', 'identification', 'identity', 'passport', 'licence', 'license', 'document', 'documents', 'pr card', 'permit'],
    },
    {
      id: 'fee',
      q: 'What is the monthly fee?',
      a: '$4.95 a month, waived if you keep $3,000 in the account or set up a direct deposit.',
      aNewcomer:
        'Nothing for the first year on the newcomer account. After that it’s $4.95 a month, waived if you keep $3,000 in the account or set up a direct deposit.',
      match: ['fee', 'fees', 'monthly fee', 'cost', 'costs', 'charge', 'price', 'how much', 'free'],
    },
    {
      id: 'resume',
      q: 'Can I leave and come back?',
      a: 'Yes. Everything is saved on this device as you answer, so you can stop here and pick up exactly where you left off.',
      match: ['leave', 'come back', 'save', 'saved', 'resume', 'later', 'pause', 'stop', 'lose', 'start over'],
    },
    {
      id: 'time',
      q: 'How long does this take?',
      a: 'About five minutes if nothing needs extra review. If something does, we ask for the one missing thing rather than making you restart.',
      match: ['how long', 'long', 'time', 'minutes', 'quick', 'fast', 'take'],
    },
    {
      id: 'branch',
      q: 'Do I have to go to a branch?',
      a: 'No. You can finish this on your phone.',
      aNewcomer:
        'No. Foreign passports, work permits and study permits are all accepted right here, so a newcomer does not need a branch visit.',
      match: ['branch', 'in person', 'visit', 'office', 'location', 'appointment'],
    },
    {
      id: 'credit',
      q: 'I have no Canadian credit history',
      a: 'That’s fine. These accounts don’t involve a credit check, and “build my credit history” is one of the things you can pick on the next screen.',
      match: ['credit', 'credit history', 'credit check', 'score', 'no history', 'thin file'],
    },
    {
      id: 'privacy',
      q: 'Who sees my answers?',
      a: 'Only Polaris, and only to shape what we recommend and which documents we ask for. None of it is shared outside Polaris, and none of it is a credit check.',
      match: ['who sees', 'privacy', 'private', 'share', 'shared', 'data', 'sell', 'safe', 'secure', 'why ask', 'why do you'],
    },
    {
      id: 'ai',
      q: 'Am I talking to a bot?',
      a: 'You’re talking to Polaris AI. A person is always one tap away, and they get everything you’ve told me so far.',
      match: ['bot', 'robot', 'ai', 'human', 'real person', 'chatbot', 'automated'],
    },
    {
      id: 'human',
      q: 'I’d like to talk to a person',
      a: '',
      match: ['talk to a person', 'talk to someone', 'speak to', 'agent', 'advisor', 'representative', 'call'],
    },
  ] as Intent[],
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
  /** Joins the phrases the recommendation quotes back. */
  and: ' and ',

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
  assist: assistEn,
  /** Phrases the recommendation quotes back, one per goal. */
  goalPhrase: {
    rent: 'cover everyday expenses',
    pay: 'receive pay',
    transfer: 'move money into Canada',
    abroad: 'send money to family abroad',
    budget: 'plan your spending',
    credit: 'build a credit history',
    rainy: 'put something aside for surprises',
    home: 'save toward a home',
    learn: 'learn about investing',
    debt: 'pay down debt',
    unsure: '',
  } as Record<string, string>,

  products: {
    newcomer: {
      name: 'Polaris Newcomer Chequing',
      tagline: 'Your first year, on us.',
      terms:
        'No monthly fee for your first 12 months, then $15.95 on the same waivers as Everyday Chequing. Foreign passports and permits accepted, and no fee on transfers into Canada.',
      trade: 'The most generous account for a first year here, and it reverts to Everyday Chequing pricing after it.',
    },
    student: {
      name: 'Student Chequing',
      tagline: 'Free while you study.',
      terms:
        'No monthly fee while you are enrolled, and no limit on transactions. Proof of enrolment once a year.',
      trade: 'Free, but it needs proof of enrolment each year and ends when you finish.',
    },
    sixty: {
      name: 'Sixty Plus Chequing',
      tagline: 'No fee from sixty.',
      terms:
        'No monthly fee for customers 60 and over, with no charge for paper statements, drafts or certified cheques.',
      trade: 'Free for good, with no balance to maintain — it just needs you to be 60 or over.',
    },
    everyday: {
      name: 'Everyday Chequing',
      tagline: 'Spend day to day.',
      terms:
        '$15.95 each month, waived with a direct deposit of $500 or more in a statement period, or a $2,000 minimum daily balance.',
      trade: 'Unlimited transactions, and free if your pay lands here — but $15.95 if it does not.',
    },
    simple: {
      name: 'Simple Chequing',
      tagline: 'Low cost, low volume.',
      terms:
        '$4.95 each month for 12 transactions, then 65¢ each. Waived with a $1,000 minimum daily balance.',
      trade: 'Cheaper than Everyday Chequing, but only worth it under about twelve transactions a month.',
    },
    savings: {
      name: 'Everyday Savings',
      tagline: 'Keep it separate, and growing.',
      terms: 'No monthly fee and no minimum. 2.75% on every dollar, paid monthly.',
      trade: 'Pays interest, but it is not a spending account — pair it with a chequing account.',
    },
    builder: {
      name: 'Credit Builder Card',
      tagline: 'Start a credit history.',
      terms:
        'No annual fee. A refundable deposit from $300 sets your limit, and we report to both credit bureaus every month.',
      trade: 'The fastest way to a Canadian credit file, but the deposit is money you cannot spend.',
    },
    invest: {
      name: 'Starter Investing Account',
      tagline: 'Begin with twenty-five dollars.',
      terms:
        'No account fee. Start from $25 in a TFSA, FHSA or RRSP, with every fee and holding explained in plain language. An advisor is there when you ask for one.',
      trade: 'Built for learning by doing, so the balance can move down as well as up.',
    },
  } as Record<string, ProductCopy>,

  rec: {
    title: 'Start with this account.',
    /** Quotes the customer, then names the product. */
    because: (said: string, product: string) =>
      `You said you want to ${said}. ${product} is built for that.`,
    generic: (product: string) => `${product} is the closest fit to what you told us.`,
    badge: 'Suggested',
    cta: 'Continue with this account',
    compare: 'Compare other accounts',
  },

  compare: {
    title: 'The ones that fit, and why.',
    sub: 'Ranked on what you told us, not on what earns us the most. Every fee is here.',
    badge: 'Suggested',
    pick: 'Choose this one',
    close: 'Back to the suggestion',
  },


  goals: {
    title: 'What would you like your banking to do?',
    sub: 'Choose any that apply. We’ll use your answers to personalise your banking and guidance.',
    cta: 'Continue',
    groups: [
      {
        label: 'Day to day',
        options: [
          { id: 'rent', label: 'Pay rent and everyday expenses' },
          { id: 'pay', label: 'Receive my pay' },
          { id: 'budget', label: 'Plan my monthly spending' },
          { id: 'abroad', label: 'Send money to family abroad' },
        ],
      },
      {
        label: 'Build for the future',
        options: [
          { id: 'credit', label: 'Build my credit history' },
          { id: 'rainy', label: 'Save for unexpected expenses' },
          { id: 'home', label: 'Save for a home' },
          { id: 'learn', label: 'Learn about saving and investing' },
          { id: 'debt', label: 'Pay down debt' },
          { id: 'unsure', label: 'I’m not sure yet' },
        ],
      },
    ],
  } as GoalSet,

  goalsNewcomer: {
    title: 'What would you like to do as you settle into Canada?',
    sub: 'Choose any that apply. We’ll use your answers to personalise your banking and guidance.',
    cta: 'Continue',
    groups: [
      {
        label: 'Get settled',
        options: [
          { id: 'rent', label: 'Pay rent and everyday expenses' },
          { id: 'pay', label: 'Receive my pay' },
          { id: 'transfer', label: 'Transfer money to Canada' },
          { id: 'abroad', label: 'Send money to family abroad' },
          { id: 'budget', label: 'Plan my monthly spending' },
        ],
      },
      {
        label: 'Build for the future',
        options: [
          { id: 'credit', label: 'Build my credit history in Canada' },
          { id: 'rainy', label: 'Save for unexpected expenses' },
          { id: 'home', label: 'Save for a home' },
          { id: 'learn', label: 'Learn about saving and investing' },
          { id: 'debt', label: 'Pay down debt' },
          { id: 'unsure', label: 'I’m not sure yet' },
        ],
      },
    ],
  } as GoalSet,
}

export type Dict = typeof en

const assistFr: typeof assistEn = {
  title: 'Aide Polaris',
  sub: 'Nous répondons tout de suite',
  greeting: 'Bonjour ! Je peux vous aider pendant l’ouverture de votre compte. Posez-moi vos questions.',
  placeholder: 'Posez une question...',
  send: 'Envoyer',
  close: 'Fermer l’aide',
  typing: 'Polaris écrit',
  fallback:
    'Je n’ai pas de bonne réponse à celle-là. Voulez-vous parler à une personne ? Elle aura déjà vos réponses, vous n’aurez rien à répéter.',
  handoff:
    'Je vous mets en relation. La personne verra tout ce que vous nous avez dit, vous ne recommencez donc pas. L’attente est d’environ quatre minutes.',
  prompts: {
    profile: ['id', 'time', 'resume'],
    follow: ['id', 'branch', 'privacy'],
    goals: ['fee', 'credit', 'privacy'],
  },
  intents: [
    {
      id: 'id',
      q: 'Quelle pièce d’identité utiliser ?',
      a: 'Un passeport canadien, une carte d’identité provinciale avec photo ou un permis de conduire. Choisissez celle que vous avez sur vous.',
      aNewcomer:
        'Un passeport étranger, une carte de RP, un permis de conduire canadien, un passeport canadien ou une pièce d’identité provinciale avec photo. Choisissez celle que vous avez sur vous.',
      match: ['identite', 'identité', 'piece', 'pièce', 'passeport', 'permis', 'document', 'documents', 'carte de rp', 'rp'],
    },
    {
      id: 'fee',
      q: 'Quels sont les frais mensuels ?',
      a: '4,95 $ par mois, sans frais si vous gardez 3 000 $ dans le compte ou si vous y faites déposer votre paie.',
      aNewcomer:
        'Rien la première année avec le compte nouvel arrivant. Ensuite 4,95 $ par mois, sans frais si vous gardez 3 000 $ dans le compte ou si vous y faites déposer votre paie.',
      match: ['frais', 'cout', 'coût', 'prix', 'combien', 'gratuit', 'mensuel'],
    },
    {
      id: 'resume',
      q: 'Puis-je partir et revenir ?',
      a: 'Oui. Tout est enregistré sur cet appareil à mesure que vous répondez : vous pouvez vous arrêter et reprendre exactement où vous étiez.',
      match: ['partir', 'revenir', 'enregistre', 'enregistré', 'reprendre', 'plus tard', 'pause', 'arreter', 'arrêter', 'perdre', 'recommencer'],
    },
    {
      id: 'time',
      q: 'Combien de temps cela prend-il ?',
      a: 'Environ cinq minutes si rien ne demande d’examen supplémentaire. Si c’est le cas, nous demandons l’élément manquant plutôt que de vous faire recommencer.',
      match: ['combien de temps', 'temps', 'minutes', 'rapide', 'duree', 'durée', 'long'],
    },
    {
      id: 'branch',
      q: 'Dois-je aller en succursale ?',
      a: 'Non. Vous pouvez tout terminer sur votre téléphone.',
      aNewcomer:
        'Non. Les passeports étrangers, les permis de travail et les permis d’études sont acceptés ici même : un nouvel arrivant n’a pas besoin d’aller en succursale.',
      match: ['succursale', 'en personne', 'rendez-vous', 'bureau', 'agence', 'deplacer', 'déplacer'],
    },
    {
      id: 'credit',
      q: 'Je n’ai pas d’historique de crédit canadien',
      a: 'Ce n’est pas un problème. Ces comptes ne demandent aucune vérification de crédit, et « bâtir mon historique de crédit » figure parmi les choix de l’écran suivant.',
      match: ['credit', 'crédit', 'historique', 'cote', 'verification', 'vérification', 'dossier mince'],
    },
    {
      id: 'privacy',
      q: 'Qui voit mes réponses ?',
      a: 'Seulement Polaris, et uniquement pour adapter nos recommandations et les documents demandés. Rien n’est communiqué à l’extérieur, et rien n’est une vérification de crédit.',
      match: ['qui voit', 'confidentialite', 'confidentialité', 'prive', 'privé', 'partage', 'partagé', 'donnees', 'données', 'vendre', 'securite', 'sécurité', 'pourquoi'],
    },
    {
      id: 'ai',
      q: 'Est-ce que je parle à un robot ?',
      a: 'Vous parlez à l’IA de Polaris. Une personne est toujours à un geste près, et elle reçoit tout ce que vous m’avez dit.',
      match: ['robot', 'bot', 'ia', 'humain', 'vraie personne', 'automatise', 'automatisé'],
    },
    {
      id: 'human',
      q: 'Je veux parler à une personne',
      a: '',
      match: ['parler a une personne', 'parler à une personne', 'parler a quelquun', 'conseiller', 'agent', 'representant', 'représentant', 'appeler'],
    },
  ] as Intent[],
}

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
  and: ' et ',

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
  assist: assistFr,
  goalPhrase: {
    rent: 'payer le loyer et les dépenses courantes',
    pay: 'recevoir votre paie',
    transfer: 'transférer de l’argent au Canada',
    abroad: 'envoyer de l’argent à votre famille à l’étranger',
    budget: 'planifier vos dépenses',
    credit: 'bâtir un historique de crédit',
    rainy: 'mettre de l’argent de côté pour les imprévus',
    home: 'épargner pour une maison',
    learn: 'en apprendre sur le placement',
    debt: 'rembourser vos dettes',
    unsure: '',
  } as Record<string, string>,

  products: {
    newcomer: {
      name: 'Compte Chèques Nouvel Arrivant',
      tagline: 'Votre première année, offerte.',
      terms:
        'Aucuns frais mensuels pendant 12 mois, puis 15,95 $ avec les mêmes exemptions que le compte Chèques Quotidien. Passeports étrangers et permis acceptés, et aucuns frais sur les transferts vers le Canada.',
      trade: 'Le compte le plus généreux pour une première année ici, puis il passe à la tarification du compte Quotidien.',
    },
    student: {
      name: 'Compte Chèques Étudiant',
      tagline: 'Gratuit pendant vos études.',
      terms:
        'Aucuns frais mensuels pendant vos études et aucune limite de transactions. Une preuve d’inscription une fois par an.',
      trade: 'Gratuit, mais il exige une preuve d’inscription chaque année et se termine à la fin des études.',
    },
    sixty: {
      name: 'Compte Chèques Soixante Plus',
      tagline: 'Sans frais dès soixante ans.',
      terms:
        'Aucuns frais mensuels à partir de 60 ans, sans frais pour les relevés papier, les traites ni les chèques certifiés.',
      trade: 'Gratuit pour de bon, sans solde à maintenir — il faut simplement avoir 60 ans ou plus.',
    },
    everyday: {
      name: 'Compte Chèques Quotidien',
      tagline: 'Pour les dépenses de tous les jours.',
      terms:
        '15,95 $ par mois, sans frais avec un dépôt direct de 500 $ ou plus par période de relevé, ou un solde quotidien minimal de 2 000 $.',
      trade: 'Transactions illimitées, et gratuit si votre paie y est déposée — sinon 15,95 $.',
    },
    simple: {
      name: 'Compte Chèques Simple',
      tagline: 'Petit prix, peu de transactions.',
      terms:
        '4,95 $ par mois pour 12 transactions, puis 0,65 $ chacune. Sans frais avec un solde quotidien minimal de 1 000 $.',
      trade: 'Moins cher que le compte Quotidien, mais avantageux seulement sous une douzaine de transactions par mois.',
    },
    savings: {
      name: 'Épargne Quotidienne',
      tagline: 'À part, et qui fructifie.',
      terms: 'Aucuns frais mensuels, aucun minimum. 2,75 % sur chaque dollar, versés mensuellement.',
      trade: 'Il rapporte des intérêts, mais ce n’est pas un compte de dépenses — à jumeler à un compte chèques.',
    },
    builder: {
      name: 'Carte Bâtisseur de Crédit',
      tagline: 'Commencez votre historique de crédit.',
      terms:
        'Aucuns frais annuels. Un dépôt remboursable à partir de 300 $ fixe votre limite, et nous transmettons vos données aux deux bureaux chaque mois.',
      trade: 'Le chemin le plus rapide vers un dossier de crédit canadien, mais le dépôt est immobilisé.',
    },
    invest: {
      name: 'Compte Placement Débutant',
      tagline: 'Commencez avec vingt-cinq dollars.',
      terms:
        'Aucuns frais de compte. À partir de 25 $ dans un CELI, un CELIAPP ou un REER, avec tous les frais et titres expliqués en langage clair. Un conseiller est là si vous le demandez.',
      trade: 'Conçu pour apprendre en pratiquant : le solde peut donc baisser autant que monter.',
    },
  } as Record<string, ProductCopy>,

  rec: {
    title: 'Commencez avec ce compte.',
    because: (said: string, product: string) =>
      `Vous avez dit vouloir ${said}. ${product} est conçu pour cela.`,
    generic: (product: string) => `${product} correspond le mieux à ce que vous nous avez dit.`,
    badge: 'Suggéré',
    cta: 'Continuer avec ce compte',
    compare: 'Comparer les autres comptes',
  },

  compare: {
    title: 'Ceux qui conviennent, et pourquoi.',
    sub: 'Classés selon ce que vous nous avez dit, non selon ce qui nous rapporte le plus. Tous les frais sont ici.',
    badge: 'Suggéré',
    pick: 'Choisir celui-ci',
    close: 'Revenir à la suggestion',
  },


  goals: {
    title: 'Que voulez-vous faire avec votre compte ?',
    sub: 'Choisissez tout ce qui s’applique. Vos réponses nous servent à personnaliser vos services et nos conseils.',
    cta: 'Continuer',
    groups: [
      {
        label: 'Au quotidien',
        options: [
          { id: 'rent', label: 'Payer le loyer et les dépenses courantes' },
          { id: 'pay', label: 'Recevoir ma paie' },
          { id: 'budget', label: 'Planifier mes dépenses mensuelles' },
          { id: 'abroad', label: 'Envoyer de l’argent à ma famille à l’étranger' },
        ],
      },
      {
        label: 'Bâtir pour l’avenir',
        options: [
          { id: 'credit', label: 'Bâtir mon historique de crédit' },
          { id: 'rainy', label: 'Épargner pour les imprévus' },
          { id: 'home', label: 'Épargner pour une maison' },
          { id: 'learn', label: 'En apprendre sur l’épargne et le placement' },
          { id: 'debt', label: 'Rembourser mes dettes' },
          { id: 'unsure', label: 'Je ne sais pas encore' },
        ],
      },
    ],
  } as GoalSet,

  goalsNewcomer: {
    title: 'Que voulez-vous faire en vous installant au Canada ?',
    sub: 'Choisissez tout ce qui s’applique. Vos réponses nous servent à personnaliser vos services et nos conseils.',
    cta: 'Continuer',
    groups: [
      {
        label: 'S’installer',
        options: [
          { id: 'rent', label: 'Payer le loyer et les dépenses courantes' },
          { id: 'pay', label: 'Recevoir ma paie' },
          { id: 'transfer', label: 'Transférer de l’argent au Canada' },
          { id: 'abroad', label: 'Envoyer de l’argent à ma famille à l’étranger' },
          { id: 'budget', label: 'Planifier mes dépenses mensuelles' },
        ],
      },
      {
        label: 'Bâtir pour l’avenir',
        options: [
          { id: 'credit', label: 'Bâtir mon historique de crédit au Canada' },
          { id: 'rainy', label: 'Épargner pour les imprévus' },
          { id: 'home', label: 'Épargner pour une maison' },
          { id: 'learn', label: 'En apprendre sur l’épargne et le placement' },
          { id: 'debt', label: 'Rembourser mes dettes' },
          { id: 'unsure', label: 'Je ne sais pas encore' },
        ],
      },
    ],
  } as GoalSet,
}

export const dicts: Record<LangCode, Dict> = { en, fr }
export const langOrder: LangCode[] = ['en', 'fr']
