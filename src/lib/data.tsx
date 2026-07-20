import { Dna, FlaskConical, Zap, Ruler, BookOpen, FileText } from 'lucide-react'
import type { Subject, Topic, PastPaper, TimetableSlot, Deadline } from './types'

export const SUBJECTS: Subject[] = [
  { id: 'biology',     name: 'Biology',     icon: <Dna size={20} />, topicCount: 5,  questionCount: 180, masteryScore: 74, colorHex: '#4CAF50' },
  { id: 'chemistry',   name: 'Chemistry',   icon: <FlaskConical size={20} />, topicCount: 3,  questionCount: 150, masteryScore: 62, colorHex: '#FF9800' },
  { id: 'physics',     name: 'Physics',     icon: <Zap size={20} />, topicCount: 2,  questionCount: 140, masteryScore: 58, colorHex: '#2196F3' },
  { id: 'mathematics', name: 'Mathematics', icon: <Ruler size={20} />, topicCount: 2,  questionCount: 200, masteryScore: 70, colorHex: '#E91E63' },
  { id: 'english',     name: 'English',     icon: <BookOpen size={20} />, topicCount: 2,  questionCount: 120, masteryScore: 66, colorHex: '#FFC107' },
]

export const TOPICS: Topic[] = [
  {
    id: 'bio-cell', name: 'Cell Structure & Function', subjectId: 'biology', questionCount: 3, masteryScore: 85,
    tutorial: 'Cells are the basic unit of life. All living organisms are made of cells — some are unicellular (like bacteria), others are multicellular (like humans).\n\nKey organelles:\n• Nucleus — control center, contains DNA\n• Mitochondria — powerhouse, produces ATP\n• Ribosomes — protein synthesis\n• Cell membrane — semi-permeable barrier\n• Chloroplasts (plants only) — photosynthesis\n\nWAEC tip: Label a diagram of both plant and animal cells and note 3 differences — cell wall, chloroplasts, and vacuole size.',
    questions: [
      { id: 'q1', topicId: 'bio-cell', text: 'Which organelle is responsible for protein synthesis?', options: ['Mitochondria', 'Ribosomes', 'Nucleus', 'Golgi body'], correctIndex: 1, explanation: 'Ribosomes are the sites of protein synthesis. They read mRNA and assemble amino acids into polypeptide chains.', difficulty: 'foundational' },
      { id: 'q2', topicId: 'bio-cell', text: 'The cell wall is made of _____ in plants.', options: ['Chitin', 'Cellulose', 'Peptidoglycan', 'Keratin'], correctIndex: 1, explanation: 'Plant cell walls are composed of cellulose — a polysaccharide that provides structural support.', difficulty: 'foundational' },
      { id: 'q3', topicId: 'bio-cell', text: 'Which organelle is the site of photosynthesis?', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Vacuole'], correctIndex: 2, explanation: 'Chloroplasts contain chlorophyll that captures light energy for photosynthesis.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'What is the function of mitochondria?', answer: 'Produces ATP through cellular respiration' },
      { question: 'Name the control center of the cell', answer: 'Nucleus' },
      { question: 'What surrounds the cell?', answer: 'Cell membrane — semi-permeable' },
      { question: 'Plant vs animal cell: 2 differences', answer: 'Cell wall & chloroplasts (plants only)' },
    ],
  },
  {
    id: 'bio-photo', name: 'Photosynthesis', subjectId: 'biology', questionCount: 2, masteryScore: 68,
    tutorial: 'Photosynthesis is the process by which green plants convert light energy into chemical energy (glucose).\n\nEquation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\nKey factors affecting rate: Light intensity, CO₂ concentration, Temperature.\n\nWAEC common question: Design an experiment to test for starch in a leaf.',
    questions: [
      { id: 'q4', topicId: 'bio-photo', text: 'What gas is released during photosynthesis?', options: ['CO₂', 'O₂', 'N₂', 'H₂'], correctIndex: 1, explanation: 'Oxygen (O₂) is released as a byproduct of photosynthesis when water molecules are split.', difficulty: 'foundational' },
      { id: 'q5', topicId: 'bio-photo', text: 'The green pigment in plants is called _____.', options: ['Chlorophyll', 'Haemoglobin', 'Melanin', 'Carotene'], correctIndex: 0, explanation: 'Chlorophyll absorbs light energy, primarily in the blue and red wavelengths, reflecting green.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Photosynthesis equation', answer: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' },
      { question: 'Test for starch in leaf?', answer: 'Iodine → blue-black if present' },
      { question: '3 factors affecting rate', answer: 'Light, CO₂, Temperature' },
    ],
  },
  {
    id: 'bio-nutrition', name: 'Nutrition & Food Tests', subjectId: 'biology', questionCount: 1, masteryScore: 59,
    tutorial: 'Organisms obtain nutrients through autotrophic and heterotrophic feeding modes.\n\nFood tests for WAEC: Starch → Iodine → Blue-black | Reducing sugars → Benedict\'s + heat → Brick-red | Proteins → Biuret → Purple | Fats → Ethanol emulsion → White.',
    questions: [
      { id: 'q6', topicId: 'bio-nutrition', text: "Benedict's solution tests for _____.", options: ['Starch', 'Protein', 'Reducing sugar', 'Fat'], correctIndex: 2, explanation: "Benedict's solution (blue) turns brick-red when heated with reducing sugars like glucose.", difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Biuret test detects what?', answer: 'Proteins → purple colour' },
      { question: 'Iodine test result?', answer: 'Blue-black = starch present' },
    ],
  },
  {
    id: 'bio-ecology', name: 'Ecology & Ecosystem', subjectId: 'biology', questionCount: 1, masteryScore: 45,
    tutorial: 'Ecology is the study of organisms and their environment.\n\nKey terms: Habitat, Population, Community, Ecosystem.\n\nWAEC practical: Use a quadrat to estimate population density.',
    questions: [
      { id: 'q7', topicId: 'bio-ecology', text: 'A group of the same species living in an area is a _____.', options: ['Community', 'Ecosystem', 'Population', 'Habitat'], correctIndex: 2, explanation: 'A population consists of organisms of the same species living and breeding together in a defined area.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Define habitat', answer: 'Where an organism lives' },
      { question: 'What is an ecosystem?', answer: 'Community + abiotic (non-living) factors' },
    ],
  },
  {
    id: 'bio-genetics', name: 'Genetics & Heredity', subjectId: 'biology', questionCount: 1, masteryScore: 38,
    tutorial: 'Genetics is the study of heredity.\n\nMendelian concepts: Gene, Allele, Genotype, Phenotype.\n\nWAEC: Draw Punnett squares for monohybrid crosses — 3:1 ratio for heterozygous cross.',
    questions: [
      { id: 'q8', topicId: 'bio-genetics', text: 'The physical expression of a gene is called _____.', options: ['Genotype', 'Allele', 'Phenotype', 'Chromosome'], correctIndex: 2, explanation: 'Phenotype is the observable characteristic (e.g., tall plant), while genotype is the genetic makeup (e.g., Tt).', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Gene vs Allele', answer: 'Gene = DNA segment; Allele = variant' },
      { question: 'Monohybrid ratio (Tt x Tt)', answer: '3:1 dominant:recessive' },
    ],
  },
  {
    id: 'chem-atom', name: 'Atomic Structure', subjectId: 'chemistry', questionCount: 2, masteryScore: 72,
    tutorial: 'Atoms are the smallest unit of matter.\n\nAtomic number (Z) = number of protons | Mass number (A) = protons + neutrons.\n\nWAEC: Draw electronic configuration for the first 20 elements.',
    questions: [
      { id: 'q9', topicId: 'chem-atom', text: 'The atomic number of an element is equal to the number of _____.', options: ['Neutrons', 'Protons', 'Electrons + protons', 'Neutrons + protons'], correctIndex: 1, explanation: 'Atomic number (Z) equals the number of protons in the nucleus.', difficulty: 'foundational' },
      { id: 'q10', topicId: 'chem-atom', text: 'Isotopes of an element have different numbers of _____.', options: ['Protons', 'Electrons', 'Neutrons', 'Both A and B'], correctIndex: 2, explanation: 'Isotopes share the same atomic number but differ in mass number due to different neutron counts.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Define atomic number', answer: 'Number of protons (Z)' },
      { question: 'Mass number = ?', answer: 'Protons + Neutrons' },
      { question: 'Electronic config of Oxygen (8)', answer: '2, 6' },
    ],
  },
  {
    id: 'chem-bond', name: 'Chemical Bonding', subjectId: 'chemistry', questionCount: 1, masteryScore: 58,
    tutorial: 'Atoms bond to achieve stable configurations.\n\nIonic bonding: transfer (metal + non-metal).\nCovalent bonding: sharing (non-metal + non-metal).\n\nWAEC: Draw dot-and-cross diagrams for NaCl, H₂O, CO₂.',
    questions: [
      { id: 'q11', topicId: 'chem-bond', text: 'NaCl is held together by _____ bonding.', options: ['Covalent', 'Metallic', 'Ionic', 'Hydrogen'], correctIndex: 2, explanation: 'Sodium transfers an electron to chlorine, forming Na⁺ and Cl⁻ ions held by electrostatic attraction.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Ionic bond = ?', answer: 'Metal + Non-metal, electron transfer' },
      { question: 'Covalent bond = ?', answer: 'Non-metals sharing electrons' },
    ],
  },
  {
    id: 'chem-acid', name: 'Acids, Bases & Salts', subjectId: 'chemistry', questionCount: 1, masteryScore: 55,
    tutorial: 'Acids: pH < 7, proton donors.\nBases: pH > 7, proton acceptors.\nSalts: product of neutralization.\n\nWAEC: Prepare soluble salt by titration.',
    questions: [
      { id: 'q12', topicId: 'chem-acid', text: 'A solution with pH 3 is _____.', options: ['Neutral', 'Acidic', 'Basic', 'Alkaline'], correctIndex: 1, explanation: 'pH values below 7 indicate acidic solutions.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Acid + Base → ?', answer: 'Salt + Water' },
      { question: 'HCl litmus test?', answer: 'Blue → Red' },
    ],
  },
  {
    id: 'phys-motion', name: 'Motion & Forces', subjectId: 'physics', questionCount: 2, masteryScore: 65,
    tutorial: 'Newton\'s Laws:\n1st: Inertia\n2nd: F = ma\n3rd: Action = -Reaction\n\nSUVAT: v = u + at, v² = u² + 2as\n\nWAEC: State the formula before substituting.',
    questions: [
      { id: 'q13', topicId: 'phys-motion', text: 'A car accelerates from rest at 2 m/s² for 5 s. Its final velocity is _____ m/s.', options: ['5', '10', '15', '20'], correctIndex: 1, explanation: 'v = u + at = 0 + (2 × 5) = 10 m/s', difficulty: 'intermediate' },
      { id: 'q14', topicId: 'phys-motion', text: 'F = ma represents which law?', options: ["Newton's 1st", "Newton's 2nd", "Newton's 3rd", 'Law of gravitation'], correctIndex: 1, explanation: "Newton's Second Law states F = ma.", difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'SUVAT: v = ?', answer: 'v = u + at' },
      { question: "Newton's 3rd Law", answer: 'Action = -Reaction' },
    ],
  },
  {
    id: 'phys-elec', name: 'Electricity', subjectId: 'physics', questionCount: 1, masteryScore: 52,
    tutorial: "Ohm's Law: V = IR\nPower: P = IV\nSeries: R = R₁ + R₂\nParallel: 1/R = 1/R₁ + 1/R₂\n\nWAEC: Draw correct circuit symbols.",
    questions: [
      { id: 'q15', topicId: 'phys-elec', text: "In Ohm's law, if V = 12V and R = 4Ω, the current is _____.", options: ['2A', '3A', '4A', '48A'], correctIndex: 1, explanation: 'I = V/R = 12/4 = 3 amperes', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: "Ohm's Law", answer: 'V = IR' },
      { question: 'Series resistors', answer: 'R = R₁ + R₂ + ...' },
    ],
  },
  {
    id: 'math-alg', name: 'Algebra', subjectId: 'mathematics', questionCount: 2, masteryScore: 78,
    tutorial: 'Algebra involves symbols to represent numbers.\n\nQuadratic formula: x = [-b ± √(b²-4ac)] / 2a\n\nWAEC: Solve by factorisation, completing square, or formula.',
    questions: [
      { id: 'q16', topicId: 'math-alg', text: 'Solve: 2x + 5 = 13', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correctIndex: 1, explanation: '2x + 5 = 13 → 2x = 8 → x = 4', difficulty: 'foundational' },
      { id: 'q17', topicId: 'math-alg', text: 'Factorise: x² - 9', options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', '(x+3)²'], correctIndex: 0, explanation: 'x² - 9 = (x-3)(x+3), difference of two squares.', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'Quadratic formula', answer: 'x = [-b ± √(b²-4ac)] / 2a' },
      { question: '(a+b)(a-b) = ?', answer: 'a² - b²' },
    ],
  },
  {
    id: 'math-trig', name: 'Trigonometry', subjectId: 'mathematics', questionCount: 1, masteryScore: 55,
    tutorial: 'SOH CAH TOA:\nsin θ = O/H, cos θ = A/H, tan θ = O/A\n\nWAEC: Know sin 30° = ½, sin 45° = 1/√2, sin 60° = √3/2',
    questions: [
      { id: 'q18', topicId: 'math-trig', text: 'In a right triangle, sin θ = _____.', options: ['Adj/Hyp', 'Opp/Hyp', 'Opp/Adj', 'Hyp/Opp'], correctIndex: 1, explanation: 'SOH: Sine = Opposite / Hypotenuse', difficulty: 'foundational' },
    ],
    flashcards: [
      { question: 'sin 30° = ?', answer: '½' },
      { question: 'SOH CAH TOA', answer: 'Sin=O/H, Cos=A/H, Tan=O/A' },
    ],
  },
  {
    id: 'eng-comp', name: 'Comprehension', subjectId: 'english', questionCount: 1, masteryScore: 70,
    tutorial: 'Read twice. Underline key phrases. Answer in your own words.\n\nWAEC: Many candidates lose marks copying directly from the passage.',
    questions: [
      { id: 'q19', topicId: 'eng-comp', text: 'The best approach to comprehension is to _____.', options: ['Copy from the passage', 'Answer in your own words', 'Skip difficult words', 'Read once only'], correctIndex: 1, explanation: 'WAEC examiners expect answers in your own words.', difficulty: 'foundational' },
    ],
    flashcards: [{ question: 'Comprehension strategy', answer: 'Read twice, paraphrase answers' }],
  },
  {
    id: 'eng-essay', name: 'Essay Writing', subjectId: 'english', questionCount: 1, masteryScore: 62,
    tutorial: 'Essay types: Narrative, Descriptive, Argumentative, Expository, Letter.\n\nStructure: Introduction → Body (3-4 paragraphs) → Conclusion',
    questions: [
      { id: 'q20', topicId: 'eng-essay', text: 'An essay that tells a story is called _____.', options: ['Descriptive', 'Narrative', 'Expository', 'Argumentative'], correctIndex: 1, explanation: 'A narrative essay tells a story.', difficulty: 'foundational' },
    ],
    flashcards: [{ question: '5 essay types', answer: 'Narrative, Descriptive, Argumentative, Expository, Letter' }],
  },
]

export const PAPERS: Record<string, PastPaper[]> = {
  biology: [
    { name: 'WAEC Biology 2023', exam: 'WAEC', year: '2023', question: 'Explain the process of photosynthesis and name two factors that affect its rate.', answer: 'Photosynthesis converts light energy to chemical energy. 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Two factors: light intensity and CO₂ concentration.', reference: '§ WAEC Biology — Photosynthesis, pg. 42' },
    { name: 'WAEC Biology 2022', exam: 'WAEC', year: '2022', question: 'Describe an experiment to test for starch in a green leaf.', answer: '1. Boil leaf 2 min. 2. Transfer to ethanol in water bath to decolorise. 3. Wash in cold water. 4. Add iodine solution → blue-black = starch.', reference: '§ WAEC Biology — Nutrition, pg. 58' },
  ],
  chemistry: [
    { name: 'WAEC Chemistry 2023', exam: 'WAEC', year: '2023', question: 'Define an isotope and give two examples.', answer: 'Same atomic number, different mass number. Examples: Carbon-12/14, Chlorine-35/37.', reference: '§ WAEC Chemistry — Atomic Structure, pg. 12' },
  ],
  physics: [
    { name: 'WAEC Physics 2023', exam: 'WAEC', year: '2023', question: "State Newton's second law and derive F = ma.", answer: 'Rate of change of momentum ∝ applied force. Momentum p = mv. For constant mass, F ∝ m(v-u)/t → F = ma.', reference: '§ WAEC Physics — Mechanics, pg. 28' },
  ],
  mathematics: [
    { name: 'WAEC Maths 2023', exam: 'WAEC', year: '2023', question: 'Solve: x² - 5x + 6 = 0', answer: '(x - 2)(x - 3) = 0 → x = 2 or x = 3.', reference: '§ WAEC Mathematics — Algebra, pg. 34' },
  ],
  english: [
    { name: 'WAEC English 2023', exam: 'WAEC', year: '2023', question: 'Write a letter describing your WAEC preparation.', answer: '[Letter format] Address, date, salutation, body describing study routine, subjects, challenges. Closing.', reference: '§ WAEC English — Letter Writing, pg. 72' },
  ],
}

export const TIMETABLE_SLOTS: TimetableSlot[] = [
  { weekday: 1, time: '8:00 AM – 9:30 AM', title: 'Biology — Cell Structure', tag: 'Study', subjectId: 'biology' },
  { weekday: 1, time: '11:00 AM – 12:30 PM', title: 'Chemistry — Atomic Structure', tag: 'Practice', subjectId: 'chemistry' },
  { weekday: 2, time: '9:00 AM – 10:30 AM', title: 'Physics — Motion & Forces', tag: 'Tutorial', subjectId: 'physics' },
  { weekday: 3, time: '7:00 PM – 8:30 PM', title: 'Mathematics — Algebra', tag: 'CBT', subjectId: 'mathematics' },
  { weekday: 4, time: '10:00 AM – 11:30 AM', title: 'English — Essay Writing', tag: 'Study', subjectId: 'english' },
  { weekday: 4, time: '2:00 PM – 3:00 PM', title: 'Biology — Food Tests', tag: 'Flashcards', subjectId: 'biology' },
  { weekday: 5, time: '9:00 AM – 10:00 AM', title: 'Chemistry — Acids & Bases', tag: 'Study', subjectId: 'chemistry' },
]

export const DEADLINES: Deadline[] = [
  { title: 'WAEC Biology Practical', date: '15 June', daysLeft: 6, icon: <Dna size={16} />, colorHex: '#16A34A' },
  { title: 'Chemistry Assignment Due', date: '12 June', daysLeft: 3, icon: <FlaskConical size={16} />, colorHex: '#D97706' },
  { title: 'Full Mock Exam', date: '20 June', daysLeft: 11, icon: <FileText size={16} />, colorHex: '#EF4444' },
]

export function topicsForSubject(subjectId: string): Topic[] {
  return TOPICS.filter(t => t.subjectId === subjectId)
}

export function findAnswer(query: string): string {
  const q = query.toLowerCase()
  for (const t of TOPICS) {
    for (const qq of t.questions) {
      if (qq.text.toLowerCase().includes(q) || q.includes(qq.text.toLowerCase().substring(0, 10))) return qq.explanation
    }
    if (t.tutorial.toLowerCase().includes(q.length > 8 ? q.substring(0, 8) : q)) return t.tutorial.substring(0, 300)
  }
  return `I couldn't find a direct syllabus reference for "${query}". Try rephrasing or check a subject page.`
}

export const STATS = { answered: 247, mastered: 12, streak: 5 }
export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']