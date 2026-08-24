export const EXAM_BOARDS = {
  WAEC:  {region:"Nigeria & West Africa", icon:"🇳🇬", desc:"West African Senior School Certificate"},
  JAMB:  {region:"Nigeria", icon:"🎓", desc:"Joint university admissions exam (UTME)"},
  NECO:  {region:"Nigeria", icon:"📗", desc:"National Examinations Council"},
  GCE:   {region:"Nigeria & West Africa", icon:"📘", desc:"WAEC General Certificate (private candidates)"},
  IGCSE: {region:"International", icon:"🌍", desc:"Cambridge International GCSE"},
  SAT:   {region:"International", icon:"🇺🇸", desc:"US college admissions exam"}
};

export type BoardKey = keyof typeof EXAM_BOARDS;

export const NIGERIA_BOARDS = ["WAEC","JAMB","NECO","GCE"];

export const INTL_BOARDS = ["IGCSE","SAT"];

export const MOCK_TYPES = {
  full:  {name:'Full Mock',  english:60, other:40, minutes:120},
  quick: {name:'Quick Mock', english:30, other:20, minutes:60}
};

export const MOCK_SUBJECT_LIMIT = 4;
