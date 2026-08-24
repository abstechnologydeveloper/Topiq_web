export const SUBJECTS = {
  biology: {
    name:"Biology", icon:"🧬", color:"thread", mastery:72, level:"SS2", boards:["WAEC","NECO","GCE","IGCSE"],
    topics:[
      {t:"Cell structure & organisation", pct:90, status:"thread",
        article:[
          {heading:"What is a cell?", text:"A cell is the smallest unit that can carry out life's basic jobs — taking in nutrients, releasing energy, and reproducing. Every living thing is made of one cell or trillions of them working together."},
          {heading:"Plant cells vs. animal cells", text:"Plant cells have three things animal cells don't: a rigid cell wall for support, a large central vacuole for storage, and chloroplasts for photosynthesis. Animal cells are usually smaller and more flexible in shape."},
          {heading:"Why organisation matters", text:"Cells don't work alone. Similar cells group into tissues, tissues form organs, and organs form systems — this step-by-step organisation is why a whole organism can do far more than a single cell ever could."}
        ],
        takeaway:"Every organism, however complex, is built from cells organised into tissues, organs and systems — start there and everything else in biology connects back to it."},
      {t:"Photosynthesis", pct:64, status:"thread",
        article:[
          {heading:"The basic idea", text:"Photosynthesis is how green plants make their own food. Using light energy, they combine carbon dioxide from the air and water from the soil to produce glucose (sugar) and oxygen."},
          {heading:"Where it happens", text:"It takes place inside chloroplasts, tiny green structures packed with chlorophyll — the pigment that traps light energy. Most chloroplasts are found in the leaf, which is shaped and positioned to catch as much light as possible."},
          {heading:"What can slow it down", text:"At any moment, one factor limits the rate: not enough light, not enough CO₂, or too cold a temperature. Change that one factor and the rate of photosynthesis changes with it."}
        ],
        takeaway:"Photosynthesis turns light energy into stored chemical energy — and whichever ingredient (light, CO₂, or warmth) is scarcest is what controls how fast it happens."},
      {t:"Respiration in organisms", pct:38, status:"ember",
        article:[
          {heading:"Releasing energy from food", text:"Respiration is how living cells release the energy stored in glucose so they can move, grow and repair themselves. It happens in every living cell, all the time — not just in lungs."},
          {heading:"Aerobic vs. anaerobic", text:"With enough oxygen, aerobic respiration breaks glucose down completely, releasing a lot of energy plus CO₂ and water. Without enough oxygen, anaerobic respiration only partly breaks it down, releasing far less energy and producing lactic acid in muscles."},
          {heading:"Why it matters during exercise", text:"During hard exercise, your muscles may need energy faster than oxygen can arrive, so they switch some cells to anaerobic respiration — which is why muscles feel tired and sore afterward."}
        ],
        takeaway:"Respiration releases energy from glucose in every cell — aerobic respiration is efficient, anaerobic is a fast but costly backup when oxygen runs short."},
      {t:"Ecological relationships", pct:12, status:"coral"},
      {t:"Reproduction in plants", pct:0, status:"ash-line"}
    ],
    tutorials:[
      {title:"How photosynthesis actually works", format:"Video", mins:"9 min", icon:"🎬", content:"Photosynthesis converts light energy into chemical energy stored in glucose. It happens in two linked stages: the light reactions, which capture energy and split water, and the Calvin cycle, which uses that energy to build sugar from carbon dioxide. The rate depends on whichever of light, CO₂ or temperature is scarcest at that moment.", ref:"§ WAEC Biology — Photosynthesis, pg. 40"},
      {title:"Light vs. dark reactions, explained simply", format:"Read", mins:"5 min", icon:"📖", content:"Light reactions happen in the thylakoid membrane and need direct light to split water and release oxygen. The Calvin cycle (often called the 'dark' reactions) can run without light as long as the products of the light reactions are still available, using CO₂ to build glucose.", ref:"§ WAEC Biology — Photosynthesis, pg. 41"},
      {title:"Limiting factors: light, CO₂ and temperature", format:"Video", mins:"7 min", icon:"🎬", content:"At any moment, one factor caps the rate of photosynthesis. Early morning, low light usually limits the rate. At midday, partly closed stomata reduce CO₂ supply instead. On a cold day, low temperature can limit the enzymes driving the Calvin cycle, even with plenty of light and CO₂.", ref:"§ WAEC Biology — Limiting Factors, pg. 45"}
    ],
    flashcards:[
      {front:"Chlorophyll", back:"The green pigment in chloroplasts that absorbs light energy for photosynthesis."},
      {front:"Stomata", back:"Small pores, mainly on leaf undersides, that allow gas exchange and water loss."},
      {front:"Limiting factor", back:"Whichever factor (light, CO₂, temperature) is in shortest supply and so controls the rate of a reaction."},
      {front:"Mitochondria", back:"The organelle where aerobic respiration takes place, releasing energy from glucose."}
    ],
    papers:[
      {year:"2023", board:"WAEC", q:"Explain the process of gaseous exchange in green plants during the day.", explain:"During the day, photosynthesis usually outpaces respiration, so plants take in CO₂ for photosynthesis and release the excess O₂ produced, mainly through the stomata.", ref:"§ WAEC Biology — Gas Exchange, pg. 38"},
      {year:"2021", board:"WAEC", q:"Describe an experiment to show that light is necessary for photosynthesis.", explain:"Cover part of a leaf with foil for 24 hours, then test both the covered and uncovered sections with iodine. Only the uncovered part turns blue-black, showing starch was only produced where light reached the leaf.", ref:"§ WAEC Biology — Photosynthesis, pg. 43"},
      {year:"2020", board:"NECO", q:"State three differences between aerobic and anaerobic respiration.", explain:"Aerobic respiration needs oxygen, releases far more energy, and produces CO₂ and water. Anaerobic respiration needs no oxygen, releases much less energy, and produces lactic acid (in animals) or ethanol and CO₂ (in yeast).", ref:"§ NECO Biology — Respiration, pg. 60"}
    ],
    questions:[
      {tag:"WAEC 2019, Paper 2, Q7", text:"Which of the following best explains why anaerobic respiration in muscle cells produces less energy than aerobic respiration?",
      options:["It produces carbon dioxide instead of lactic acid","Glucose is only partially broken down, releasing less stored energy","It requires oxygen that muscle cells cannot absorb quickly enough","Muscle cells cannot perform anaerobic respiration at all"],
      correct:1, explain:"Anaerobic respiration only partially breaks down glucose into lactic acid, releasing far less of the energy stored in the molecule than the complete breakdown in aerobic respiration.", ref:"§ WAEC Biology — Respiration, pg. 58"},
      {tag:"WAEC 2021, Paper 1, Q11", text:"Which gas is released by green plants as a by-product of photosynthesis?",
      options:["Carbon dioxide","Nitrogen","Oxygen","Hydrogen"], correct:2,
      explain:"Water is split during the light reactions to supply electrons, releasing oxygen as a by-product.", ref:"§ WAEC Biology — Photosynthesis, pg. 40"},
      {tag:"NECO 2022, Q9", text:"A leaf kept in the dark for 48 hours before an iodine test would most likely show:",
      options:["A strong blue-black colour","No colour change","A bright green colour","A red colour"], correct:1,
      explain:"With no light, no new starch is made, and existing starch is used up, so the iodine test shows no blue-black colour change.", ref:"§ NECO Biology — Photosynthesis, pg. 44"}
    ]
  },
  physics: {
    name:"Physics", icon:"⚡", color:"ember", mastery:33, level:"SS3", boards:["WAEC","JAMB","GCE","IGCSE"],
    topics:[
      {t:"Newton's laws of motion", pct:55, status:"thread"},
      {t:"Work, energy & power", pct:40, status:"ember"},
      {t:"Waves & optics", pct:20, status:"coral"},
      {t:"Electric circuits", pct:10, status:"coral"}
    ],
    tutorials:[
      {title:"Newton's 3 laws with real examples", format:"Video", mins:"11 min", icon:"🎬", content:"Newton's first law says objects keep doing what they're doing unless a force interferes. The second law, F=ma, links force, mass and acceleration. The third law says every force has an equal and opposite reaction — think of walking, where you push the ground back and it pushes you forward.", ref:"§ WAEC Physics — Newton's Laws, pg. 18"},
      {title:"Why momentum is conserved", format:"Read", mins:"6 min", icon:"📖", content:"In any closed system with no external forces, total momentum before a collision equals total momentum after it. This is why a stationary snooker ball shoots forward when struck — the momentum lost by the moving ball is gained by the one it hits.", ref:"§ WAEC Physics — Momentum, pg. 24"},
      {title:"Solving F=ma problems step by step", format:"Video", mins:"8 min", icon:"🎬", content:"Start by listing what you know: mass, and either force or acceleration. Rearrange F=ma for whichever variable is missing, keep units consistent (kg, m/s², N), then substitute and solve.", ref:"§ JAMB Physics — Newton's Laws, pg. 21"}
    ],
    flashcards:[
      {front:"Newton's First Law", back:"An object stays at rest or in uniform motion unless acted on by a net external force."},
      {front:"Momentum", back:"Mass × velocity — always conserved in a closed system during collisions."},
      {front:"Work done", back:"Force applied × distance moved in the direction of the force."},
      {front:"Power", back:"The rate at which work is done, measured in watts."}
    ],
    papers:[
      {year:"2022", board:"WAEC", q:"State Newton's three laws of motion and give one everyday example of each.", explain:"First law: a stationary bus keeps you jerked back when it accelerates. Second law: pushing a shopping trolley harder speeds it up faster. Third law: swimming — you push water backward and it pushes you forward.", ref:"§ WAEC Physics — Newton's Laws, pg. 18"},
      {year:"2021", board:"JAMB", q:"A 2kg object accelerates at 3m/s². Calculate the net force acting on it.", explain:"F = ma = 2 × 3 = 6N.", ref:"§ JAMB Physics — Newton's Laws, pg. 20"}
    ],
    questions:[
      {tag:"JAMB 2022, Q14", text:"A resultant force of 10N acts on a 2kg mass initially at rest. What is its velocity after 4 seconds?",
      options:["5 m/s","10 m/s","20 m/s","40 m/s"], correct:2,
      explain:"a = F/m = 10/2 = 5 m/s². v = u + at = 0 + 5×4 = 20 m/s.", ref:"§ JAMB Physics — Newton's Laws, pg. 21"},
      {tag:"WAEC 2020, Paper 1, Q9", text:"Which quantity is conserved in an elastic collision between two objects, assuming no external forces act?",
      options:["Only kinetic energy","Only momentum","Both momentum and kinetic energy","Neither"], correct:2,
      explain:"An elastic collision conserves both momentum and total kinetic energy; only momentum is conserved in an inelastic collision.", ref:"§ WAEC Physics — Momentum, pg. 25"}
    ]
  },
  chemistry: {
    name:"Chemistry", icon:"🧪", color:"coral", mastery:15, level:"SS2", boards:["WAEC","NECO","GCE","IGCSE"],
    topics:[
      {t:"The mole concept", pct:22, status:"ember"},
      {t:"Acids, bases & salts", pct:18, status:"coral"},
      {t:"Periodic table trends", pct:8, status:"coral"},
      {t:"Chemical bonding", pct:0, status:"ash-line"}
    ],
    tutorials:[
      {title:"The mole concept, without the confusion", format:"Video", mins:"10 min", icon:"🎬"},
      {title:"Balancing equations using moles", format:"Read", mins:"6 min", icon:"📖"}
    ],
    flashcards:[
      {front:"Mole", back:"The amount of substance containing as many particles as there are atoms in 12g of carbon-12 (6.02×10²³)."},
      {front:"Avogadro's constant", back:"6.02 × 10²³ particles per mole."},
      {front:"Molar mass", back:"The mass of one mole of a substance, in grams per mole."}
    ],
    papers:[{year:"2023", board:"NECO", q:"Calculate the number of moles in 22g of carbon dioxide (CO₂ = 44g/mol).", explain:"Moles = mass ÷ molar mass = 22 ÷ 44 = 0.5 mol.", ref:"§ NECO Chemistry — Mole Concept, pg. 15"}],
    questions:[
      {tag:"NECO 2023, Q9", text:"How many moles are present in 22g of CO₂? (Molar mass of CO₂ = 44g/mol)",
      options:["0.25 mol","0.5 mol","1.0 mol","2.0 mol"], correct:1,
      explain:"Moles = mass ÷ molar mass = 22 ÷ 44 = 0.5 mol.", ref:"§ NECO Chemistry — Mole Concept, pg. 15"},
      {tag:"WAEC 2022, Q6", text:"What is the mass of 2 moles of water, H₂O? (H=1, O=16)",
      options:["9g","18g","36g","44g"], correct:2,
      explain:"Molar mass of H₂O = (1×2)+16 = 18g/mol. Mass = moles × molar mass = 2 × 18 = 36g.", ref:"§ WAEC Chemistry — Mole Concept, pg. 16"}
    ]
  },
  mathematics: {
    name:"Mathematics", icon:"📐", color:"thread", mastery:90, level:"SS3", boards:["WAEC","JAMB","NECO","IGCSE","SAT"],
    topics:[
      {t:"Simultaneous equations", pct:95, status:"thread"},
      {t:"Quadratic equations", pct:88, status:"thread"},
      {t:"Trigonometry", pct:80, status:"thread"}
    ],
    tutorials:[
      {title:"Solving simultaneous equations by substitution", format:"Video", mins:"8 min", icon:"🎬"},
      {title:"When to use elimination instead", format:"Read", mins:"4 min", icon:"📖"}
    ],
    flashcards:[
      {front:"Simultaneous equations", back:"Two or more equations solved together to find values that satisfy all of them at once."},
      {front:"Substitution method", back:"Solve one equation for a variable, then substitute it into the other equation."}
    ],
    papers:[{year:"2022", board:"JAMB", q:"Solve for x and y: 2x + y = 7, x − y = 2.", explain:"Adding both equations: 3x = 9, so x=3. Substituting back: y = 7−2(3) = 1.", ref:"§ JAMB Mathematics — Simultaneous Equations, pg. 9"}],
    questions:[
      {tag:"JAMB 2022, Q3", text:"Solve for x and y: 2x + y = 7 and x − y = 2.",
      options:["x=3, y=1","x=2, y=3","x=1, y=5","x=4, y=-1"], correct:0,
      explain:"Adding both equations: 3x = 9, so x=3. Substituting back: y = 7−2(3) = 1.", ref:"§ JAMB Mathematics — Simultaneous Equations, pg. 9"},
      {tag:"WAEC 2021, Q8", text:"If 3x − y = 5 and x + y = 3, what is the value of x?",
      options:["1","2","3","4"], correct:1,
      explain:"Adding both equations: 4x = 8, so x = 2.", ref:"§ WAEC Mathematics — Simultaneous Equations, pg. 12"}
    ]
  },
  english: {
    name:"English Language", icon:"📝", color:"violet", mastery:58, level:"SS2", boards:["WAEC","JAMB","IGCSE","SAT"],
    mandatory:true,
    topics:[{t:"Comprehension & summary", pct:70, status:"thread"},{t:"Lexis & structure", pct:52, status:"ember"},{t:"Essay writing", pct:40, status:"ember"}],
    tutorials:[{title:"How to answer summary questions", format:"Video", mins:"7 min", icon:"🎬"}],
    flashcards:[{front:"Synonym", back:"A word with the same or nearly the same meaning as another word."}],
    papers:[{year:"2023", board:"WAEC", q:"Read the passage and summarise the writer's main points in not more than 100 words.", explain:"A strong summary states each main point in your own words, in the same order as the passage, without adding opinions or examples not in the text.", ref:"§ WAEC English — Comprehension, pg. 8"}],
    passage:{
      title:"Comprehension passage",
      ref:"§ WAEC/JAMB English — Comprehension, pg. 8",
      body:[
        "Every year, thousands of young people leave their villages for the city, drawn by the promise of work and a better life. What they often find instead is a crowded room shared with six strangers, a job that pays little, and a longing for the quiet they once complained about.",
        "This is not to say the city offers nothing. For many, it is the only place where a determined young person, however poor, can retrain, restart, and eventually rise. The difference between those who merely survive the city and those who are transformed by it often comes down to one thing: whether they arrived with a plan or with only a hope.",
        "A plan can be revised. A hope, once disappointed, is far harder to repair."
      ]
    },
    questions:[
      {tag:"WAEC 2021, Q2", text:"Choose the option nearest in meaning to the underlined word: The manager was very 'meticulous' about the report.",
      options:["Careless","Careful","Angry","Fast"], correct:1,
      explain:"'Meticulous' means showing great attention to detail — closest in meaning to 'careful'.", ref:"§ WAEC English — Lexis & Structure, pg. 11"},
      {tag:"JAMB 2020, Q5", text:"Choose the option opposite in meaning to the underlined word: The witness gave a 'coherent' account of events.",
      options:["Clear","Confusing","Long","Honest"], correct:1,
      explain:"'Coherent' means logical and clear, so its opposite is 'confusing'.", ref:"§ JAMB English — Lexis & Structure, pg. 9"},
      {tag:"Comprehension, Q1", text:"Based on the passage, what mainly separates those who merely survive the city from those transformed by it?",
      options:["How much money they arrive with","Whether they arrived with a plan or only a hope","How many relatives they know in the city","The number of jobs available that year"], correct:1,
      explain:"The passage states the difference \u2018often comes down to one thing: whether they arrived with a plan or with only a hope.\u2019", ref:"§ Comprehension passage, para. 2"}
    ]
  },
  economics: {
    name:"Economics", icon:"📊", color:"ember", mastery:44, level:"SS3", boards:["WAEC","JAMB"],
    topics:[{t:"Supply and demand", pct:60, status:"thread"},{t:"Market structures", pct:35, status:"ember"},{t:"National income", pct:20, status:"coral"}],
    tutorials:[{title:"Supply and demand, with real markets", format:"Video", mins:"9 min", icon:"🎬"}],
    flashcards:[{front:"Demand", back:"The quantity of a good consumers are willing and able to buy at a given price."}],
    papers:[{year:"2022", board:"WAEC", q:"With the aid of a diagram, explain how a shift in demand affects equilibrium price.", explain:"An increase in demand shifts the demand curve right, raising both equilibrium price and quantity, assuming supply is unchanged.", ref:"§ WAEC Economics — Demand, pg. 6"}],
    questions:[
      {tag:"WAEC 2022, Q5", text:"If the price of a good rises and demand falls, holding other factors constant, this illustrates:",
      options:["The law of supply","The law of demand","Diminishing returns","Price elasticity"], correct:1,
      explain:"The law of demand states that as price rises, quantity demanded falls, all else being equal.", ref:"§ WAEC Economics — Demand, pg. 7"},
      {tag:"JAMB 2021, Q11", text:"A market where a single seller controls the entire supply of a good is called:",
      options:["Perfect competition","Oligopoly","Monopoly","Monopsony"], correct:2,
      explain:"A monopoly exists when one firm is the sole supplier of a good with no close substitutes.", ref:"§ JAMB Economics — Market Structures, pg. 14"}
    ]
  }
};

export const SUBJECT_DIAGRAMS = {
  biology: `<svg viewBox="0 0 240 140" width="100%" style="max-width:280px;">
    <circle cx="34" cy="30" r="16" fill="var(--ember)"/>
    <g stroke="var(--ember)" stroke-width="2"><path d="M34 6v-6M34 66v-6M10 30H4M64 30h-6M15 11l-4-4M53 11l4-4M15 49l-4 4M53 49l4 4"/></g>
    <path d="M80 120 C80 60 140 40 190 45 C170 90 130 120 80 120Z" fill="var(--thread-soft)" stroke="var(--thread)" stroke-width="2"/>
    <path d="M85 118 C95 90 130 65 185 48" fill="none" stroke="var(--thread)" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="150" y="30" font-family="IBM Plex Mono" font-size="10" fill="var(--ink)" font-weight="600">CO₂ in →</text>
    <text x="150" y="132" font-family="IBM Plex Mono" font-size="10" fill="var(--ink)" font-weight="600">← O₂ out</text>
    <path d="M110 45l10 8-10 8" fill="none" stroke="var(--ink)" stroke-width="2"/>
  </svg>`,
  physics: `<svg viewBox="0 0 240 140" width="100%" style="max-width:280px;">
    <rect x="90" y="70" width="60" height="40" rx="6" fill="var(--ember-soft)" stroke="var(--ember)" stroke-width="2"/>
    <line x1="20" y1="110" x2="220" y2="110" stroke="var(--ink)" stroke-width="2"/>
    <path d="M20 60l50 0" stroke="var(--thread)" stroke-width="3" marker-end="url(#arrow)"/>
    <path d="M220 60l-50 0" stroke="var(--coral)" stroke-width="3" marker-end="url(#arrow2)"/>
    <text x="20" y="50" font-family="IBM Plex Mono" font-size="10" fill="var(--thread)" font-weight="700">Push (F)</text>
    <text x="160" y="50" font-family="IBM Plex Mono" font-size="10" fill="var(--coral)" font-weight="700">Reaction</text>
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--thread)"/></marker>
      <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--coral)"/></marker>
    </defs>
  </svg>`,
  chemistry: `<svg viewBox="0 0 240 140" width="100%" style="max-width:280px;">
    <circle cx="120" cy="70" r="14" fill="var(--coral)"/>
    <circle cx="80" cy="40" r="10" fill="var(--ember)"/>
    <circle cx="160" cy="40" r="10" fill="var(--ember)"/>
    <circle cx="80" cy="100" r="10" fill="var(--thread)"/>
    <circle cx="160" cy="100" r="10" fill="var(--thread)"/>
    <line x1="120" y1="70" x2="80" y2="40" stroke="var(--ink)" stroke-width="2"/>
    <line x1="120" y1="70" x2="160" y2="40" stroke="var(--ink)" stroke-width="2"/>
    <line x1="120" y1="70" x2="80" y2="100" stroke="var(--ink)" stroke-width="2"/>
    <line x1="120" y1="70" x2="160" y2="100" stroke="var(--ink)" stroke-width="2"/>
    <text x="95" y="130" font-family="IBM Plex Mono" font-size="10" fill="var(--ink)" font-weight="600">6.02 × 10²³ / mol</text>
  </svg>`,
  mathematics: `<svg viewBox="0 0 240 140" width="100%" style="max-width:280px;">
    <rect x="20" y="55" width="90" height="30" rx="6" fill="var(--thread-soft)" stroke="var(--thread)" stroke-width="2"/>
    <rect x="130" y="55" width="90" height="30" rx="6" fill="var(--ember-soft)" stroke="var(--ember)" stroke-width="2"/>
    <text x="65" y="75" text-anchor="middle" font-family="IBM Plex Mono" font-size="13" fill="var(--ink)" font-weight="700">2x + y</text>
    <text x="175" y="75" text-anchor="middle" font-family="IBM Plex Mono" font-size="13" fill="var(--ink)" font-weight="700">= 7</text>
    <line x1="30" y1="100" x2="200" y2="100" stroke="var(--ink)" stroke-width="2"/>
    <line x1="30" y1="93" x2="30" y2="107" stroke="var(--ink)" stroke-width="2"/>
    <line x1="200" y1="93" x2="200" y2="107" stroke="var(--ink)" stroke-width="2"/>
    <text x="115" y="122" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="var(--ash)">balanced, like a scale</text>
  </svg>`,
  english: `<svg viewBox="0 0 240 140" width="100%" style="max-width:280px;">
    <path d="M30 30h130a14 14 0 0 1 14 14v30a14 14 0 0 1-14 14H70l-20 20v-20H30a14 14 0 0 1-14-14V44a14 14 0 0 1 14-14Z" fill="var(--violet-soft)" stroke="var(--violet)" stroke-width="2"/>
    <text x="45" y="66" font-family="Fraunces" font-size="14" fill="var(--ink)" font-weight="600">careful</text>
    <path d="M180 70h30" stroke="var(--ink)" stroke-width="2" marker-end="url(#arrow3)"/>
    <text x="200" y="105" font-family="Fraunces" font-size="14" fill="var(--ink)" font-weight="600">= meticulous</text>
    <defs><marker id="arrow3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--ink)"/></marker></defs>
  </svg>`,
  economics: `<svg viewBox="0 0 240 140" width="100%" style="max-width:280px;">
    <line x1="30" y1="20" x2="30" y2="120" stroke="var(--ink)" stroke-width="2"/>
    <line x1="30" y1="120" x2="220" y2="120" stroke="var(--ink)" stroke-width="2"/>
    <path d="M40 30 L210 110" stroke="var(--coral)" stroke-width="2.5" fill="none"/>
    <path d="M40 110 L210 30" stroke="var(--thread)" stroke-width="2.5" fill="none"/>
    <text x="212" y="108" font-family="IBM Plex Mono" font-size="9" fill="var(--coral)" font-weight="700">Demand</text>
    <text x="150" y="26" font-family="IBM Plex Mono" font-size="9" fill="var(--thread)" font-weight="700">Supply</text>
    <circle cx="125" cy="70" r="4" fill="var(--ink)"/>
    <text x="128" y="65" font-family="IBM Plex Mono" font-size="9" fill="var(--ink)" font-weight="700">Equilibrium</text>
  </svg>`
};
