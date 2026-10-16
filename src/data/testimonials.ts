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

// Approved by each person, word for word. Entries whose quote starts with TODO are skipped.
export const testimonials: Testimonial[] = [
  {
    quote: 'Umer brings real product thinking to government work. On VARA he turned a complex regulatory process into a five-step guide people could actually follow, and he built the UI kit that kept the whole portal consistent.',
    name: 'Norton Gomes',
    title: 'Creative Director',
    company: 'MBLM',
    relationship: 'Worked with Umer at MBLM',
  },
  {
    quote: 'Umer led design with clear direction and a steady hand. He set a quality bar the team rose to, worked closely with engineering, and shipped Salams on time and on scope.',
    name: 'Adeel Raza',
    title: 'Serial Entrepreneur',
    company: '',
    relationship: 'Worked with Umer on Salams',
  },
];

export const namedTestimonials = testimonials.filter((t) => !t.quote.trim().startsWith('TODO'));
