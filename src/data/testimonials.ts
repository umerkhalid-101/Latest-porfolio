export type Testimonial = {
  /** Exact words from the person, supplied by Umer. Never write or edit these. */
  quote: string;
  name: string;
  title: string;
  company: string;
  /** For example "Worked with Umer at MBLM" */
  relationship: string;
  linkedinUrl?: string;
  /** Optional 1:1 headshot served from /public */
  photo?: string;
};

// Entries whose quote still starts with TODO are skipped by the Kind words section.
export const testimonials: Testimonial[] = [
  {
    quote: 'TODO_REAL_QUOTE',
    name: 'Norton Gomes',
    title: 'Creative Director',
    company: 'MBLM Dubai',
    relationship: 'TODO',
  },
  {
    quote: 'TODO_REAL_QUOTE',
    name: 'Adeel Raza',
    title: 'TODO',
    company: 'TODO',
    relationship: 'TODO',
  },
];

/** Shown only until at least one named quote above is real. Remove once one is. */
export const anonymousQuotes: { quote: string; by?: string }[] = [
  { quote: 'He was quick to move, easy to work with, and fully dedicated to shipping our product on time and on scope.', by: 'Head of Product, SaaS startup' },
  { quote: 'Umer owned design end to end and made the hard calls. Our loyalty platform shipped faster and tighter because he was in the room.' },
  { quote: 'The design system he built gave our engineers a real foundation. Consistent, documented, and easy to extend.' },
  { quote: 'Umer brings research rigor most designers skip. He talked to users, mapped the problem, then shipped the right thing.' },
];

export const namedTestimonials = testimonials.filter((t) => !t.quote.trim().startsWith('TODO'));
