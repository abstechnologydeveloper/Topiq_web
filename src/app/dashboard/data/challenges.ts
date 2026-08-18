export const CHALLENGE_TEMPLATES = [
  {id:"streak7", icon:"🔥", title:"7-Day Streak", desc:"Practise at least one question every day for 7 days straight.", type:"streak", target:7, unit:"days"},
  {id:"q10week", icon:"⚡", title:"10 Questions This Week", desc:"Answer 10 practice questions correctly before the week ends.", type:"count", target:10, unit:"questions"},
  {id:"speedround", icon:"⏱", title:"Speed Round", desc:"Get 5 correct answers in a row without missing one.", type:"accuracy", target:5, unit:"in a row"},
  {id:"weakspot", icon:"🎯", title:"Weak Spot Comeback", desc:"Take your lowest-mastery subject and push it 15 points higher.", type:"mastery", target:15, unit:"points"}
];

export const COMPETITIONS = [
  {icon:"🌍", name:"International Mathematical Olympiad (IMO)", level:"Global", subject:"mathematics", months:"Selection: Jan–Jun · Final: Jul", desc:"The oldest and most prestigious global maths olympiad — six problems, two days, for pre-university students."},
  {icon:"🧪", name:"International Chemistry Olympiad (IChO)", level:"Global", subject:"chemistry", months:"Jul", desc:"A theory and practical lab exam pitting top chemistry students from over 80 countries against each other."},
  {icon:"🧬", name:"International Biology Olympiad (IBO)", level:"Global", subject:"biology", months:"Jul", desc:"Practical and theoretical biology challenges for secondary school students, hosted by a different country each year."},
  {icon:"🌍", name:"Pan-African Mathematics Olympiad (PAMO)", level:"Regional", subject:"mathematics", months:"Sep", desc:"The continental maths olympiad for African nations — a stepping stone toward IMO selection."},
  {icon:"📺", name:"Cowbellpedia Mathematics TV Quiz", level:"National · Nigeria", subject:"mathematics", months:"Term-based heats", desc:"Nigeria's televised secondary-school maths competition, from local heats through to the national final."}
];
