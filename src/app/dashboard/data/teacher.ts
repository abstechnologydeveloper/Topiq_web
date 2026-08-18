export const SCHOOLS = {
  "CORONA2026": {name: "Corona Secondary School", id: "corona"}
};

export const SCHOOL_TEACHERS = [
  {name:"Mrs. F. Adeyemi", classIds:["ss2bio"]},
  {name:"Mr. T. Balogun", classIds:["ss3math"]},
  {name:"Mrs. G. Nwachukwu", classIds:["ss2chem"]},
  {name:"Mr. K. Eze", classIds:["ss3phy"]},
  {name:"Mrs. A. Yusuf", classIds:["ss2eng"]}
];

export const SCHOOL_PENDING_STUDENTS = [];

export const CLASSES = [
  {id:"ss2bio", name:"SS2 Biology", subject:"biology", board:"WAEC", students:34, avgMastery:61},
  {id:"ss3math", name:"SS3 Mathematics", subject:"mathematics", board:"JAMB", students:28, avgMastery:74},
  {id:"ss2chem", name:"SS2 Chemistry", subject:"chemistry", board:"WAEC", students:30, avgMastery:42},
  {id:"ss3phy", name:"SS3 Physics", subject:"physics", board:"WAEC", students:26, avgMastery:56},
  {id:"ss2eng", name:"SS2 English", subject:"english", board:"WAEC", students:33, avgMastery:65}
];

export const ROSTERS = {
  ss2bio: [{name:"Chidinma O.", mastery:88},{name:"Tunde A.", mastery:70},{name:"Femi K.", mastery:55},{name:"Blessing E.", mastery:41},{name:"Ngozi P.", mastery:22}],
  ss3math: [{name:"Ifeoma N.", mastery:95},{name:"Segun O.", mastery:81},{name:"Amaka T.", mastery:76},{name:"David U.", mastery:60}],
  ss2chem: [{name:"Rasheed B.", mastery:68},{name:"Grace M.", mastery:45},{name:"Kelechi I.", mastery:30},{name:"Halima Y.", mastery:18}],
  ss3phy: [{name:"Musa A.", mastery:70},{name:"Peace O.", mastery:58},{name:"Ibrahim S.", mastery:41}],
  ss2eng: [{name:"Chiamaka N.", mastery:82},{name:"Wale F.", mastery:64},{name:"Ruth D.", mastery:49}]
};

export const ASSIGNMENTS = [
  {id:1, title:"Photosynthesis practice set", classId:"ss2bio", subject:"biology", due:"This week", complete:62},
  {id:2, title:"Simultaneous equations worksheet", classId:"ss3math", subject:"mathematics", due:"Today", complete:88},
  {id:3, title:"Mole concept quiz", classId:"ss2chem", subject:"chemistry", due:"Tomorrow", complete:24}
];

export const TEACHER_TODAY_SCHEDULE = [
  {time:"8:00", classId:"ss2eng"},
  {time:"9:00", classId:"ss2bio"},
  {time:"10:30", classId:"ss3math"},
  {time:"12:00", classId:"ss2chem"},
  {time:"1:30", classId:"ss3phy"}
];

export const LIVE_CLASS_LOG = [
  {id:'lc1', subject:'biology', instructor:'Mrs. Adeyemi', day:'Wed', time:'9:00am', status:'upcoming'},
  {id:'lc2', subject:'mathematics', instructor:'Mr. Balogun', day:'Thu', time:'10:30am', status:'upcoming'},
  {id:'lc3', subject:'english', instructor:'Mrs. Okafor', day:'Mon', time:'10:30am', status:'attended'},
  {id:'lc4', subject:'physics', instructor:'Mr. Chukwu', day:'Wed', time:'9:00am', status:'attended'},
  {id:'lc5', subject:'chemistry', instructor:'Mrs. Nwosu', day:'Tue', time:'8:00am', status:'missed'}
];

export const LP_TYPES = [
  {id:"note", icon:"📝", name:"Lesson note", color:"thread"},
  {id:"scheme", icon:"🗓️", name:"Scheme of work", color:"ember"},
  {id:"quiz", icon:"❓", name:"Quiz questions", color:"coral"},
  {id:"plan", icon:"📋", name:"Lesson plan", color:"violet"}
];

export const LP_DURATIONS = ["35 min", "40 min", "80 min (double period)"];

export const LP_HISTORY = [];

export const FREE_TEACHER_ASSIGNMENTS = 2;
