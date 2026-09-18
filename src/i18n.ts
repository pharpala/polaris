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

  slides: [
    {
      title: 'Open an account in about five minutes.',
      body: 'A few questions, one photo of your ID, and it is open. No branch visit, no paperwork.',
    },
    {
      title: 'We narrow it down to the accounts that fit you.',
      body: 'Answer a few questions and you get two or three options — not a catalogue — with the fees and trade-offs in plain language.',
    },
    {
      title: 'Bank in the language you think in.',
      body: 'The questions, the guidance and the disclosures. All of it, not just this screen.',
    },
    {
      title: 'Stop anywhere. Nothing is lost.',
      body: 'Your progress saves as you go. If something needs a person, they pick up where you stopped — you never start over.',
    },
  ],

  welcome: {
    start: 'Get started',
    signIn: 'I already bank with Polaris',
    slideLabel: (n: number) => `Go to slide ${n}`,
  },

  lang: {
    open: 'Change language',
    title: 'Choose your language',
    body: 'Everything that follows is in the language you pick, including the agreements you sign.',
    done: 'Done',
  },

  signup: {
    stage: 'Create your login',
    step: (n: number, of: number) => `Step ${n} of ${of}`,
    email: 'Email',
    emailWhy: 'Your application status goes here, so you can leave and come back to it.',
    password: 'Password',
    passwordWhy: 'At least 8 characters.',
    show: 'Show password',
    hide: 'Hide password',
    legal:
      'By continuing you agree to the Polaris Terms of Use and Privacy Policy. We will only message you about this application unless you ask us for more.',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    next: 'Next',
    checking: 'Checking your email',
  },

  phone: {
    stage: 'Confirm it is you',
    label: 'Phone number',
    why: 'We use it to confirm it is you when you sign in, and to reach you if your application needs something. One Polaris account per number.',
    hint: 'A six-digit code arrives by text in a few seconds.',
    cta: 'Continue',
  },
}

export type Dict = typeof en

const fr: Dict = {
  meta: { native: 'Français', note: 'French', chip: 'FR' },
  brand: 'Polaris',
  back: 'Retour',
  legal: 'Banque Polaris du Canada · Membre de la SADC',

  aiNote: "L'IA vous guide dans cette demande. Une personne est toujours à un geste près.",

  slides: [
    {
      title: 'Ouvrez un compte en cinq minutes environ.',
      body: "Quelques questions, une photo de votre pièce d'identité, et c'est ouvert. Aucune visite en succursale, aucune paperasse.",
    },
    {
      title: 'Nous ramenons le choix aux comptes qui vous conviennent.',
      body: "Répondez à quelques questions et vous obtenez deux ou trois options — pas un catalogue — avec les frais et les compromis en langage clair.",
    },
    {
      title: 'Faites vos opérations dans la langue où vous pensez.',
      body: 'Les questions, les explications et les documents à signer. Tout, pas seulement cet écran.',
    },
    {
      title: 'Arrêtez quand vous voulez. Rien ne se perd.',
      body: "Votre progression est enregistrée. Si une personne doit intervenir, elle reprend là où vous vous êtes arrêté — vous ne recommencez jamais.",
    },
  ],

  welcome: {
    start: 'Commencer',
    signIn: 'Je suis déjà client de Polaris',
    slideLabel: (n: number) => `Aller à la diapositive ${n}`,
  },

  lang: {
    open: 'Changer de langue',
    title: 'Choisissez votre langue',
    body: 'Tout ce qui suit sera dans la langue choisie, y compris les documents que vous signez.',
    done: 'Terminé',
  },

  signup: {
    stage: 'Créez votre identifiant',
    step: (n: number, of: number) => `Étape ${n} sur ${of}`,
    email: 'Courriel',
    emailWhy: "L'état de votre demande y sera envoyé, pour que vous puissiez partir et y revenir.",
    password: 'Mot de passe',
    passwordWhy: 'Au moins 8 caractères.',
    show: 'Afficher le mot de passe',
    hide: 'Masquer le mot de passe',
    legal:
      "En continuant, vous acceptez les conditions d'utilisation et la politique de confidentialité de Polaris. Nous ne vous écrirons qu'au sujet de cette demande, sauf si vous demandez autre chose.",
    terms: "Conditions d'utilisation",
    privacy: 'Politique de confidentialité',
    next: 'Suivant',
    checking: 'Vérification de votre courriel',
  },

  phone: {
    stage: "Confirmez qu'il s'agit de vous",
    label: 'Numéro de téléphone',
    why: "Nous l'utilisons pour confirmer votre identité à la connexion et pour vous joindre si votre demande nécessite quelque chose. Un seul compte Polaris par numéro.",
    hint: 'Un code à six chiffres arrive par texto en quelques secondes.',
    cta: 'Continuer',
  },
}

export const dicts: Record<LangCode, Dict> = { en, fr }
export const langOrder: LangCode[] = ['en', 'fr']
