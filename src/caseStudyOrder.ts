import { juno, mblm, salams, unita, snapflow, zewards } from './caseStudyData';
import type { CaseStudy } from './components/CaseStudyTemplate';

/** Same order as the homepage work grid; the last one loops back to the first */
export const CASE_STUDY_ORDER: CaseStudy[] = [juno, mblm, salams, unita, snapflow, zewards];

export function nextCaseStudy(slug: string): CaseStudy {
  const i = CASE_STUDY_ORDER.findIndex((c) => c.slug === slug);
  return CASE_STUDY_ORDER[(i + 1) % CASE_STUDY_ORDER.length];
}
