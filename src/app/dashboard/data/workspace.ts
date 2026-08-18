export const STUDY_ACTIVITY_MINUTES = [42, 0, 65, 30, 0, 50, 20]; // Mon–Sun, missed days show as 0

export const TIMETABLE = {
  Mon:[{time:"8:00", subj:"mathematics"},{time:"9:00", subj:"biology"},{time:"10:30", subj:"english"},{time:"12:00", subj:"physics"}],
  Tue:[{time:"8:00", subj:"chemistry"},{time:"9:00", subj:"economics"},{time:"10:30", subj:"mathematics"}],
  Wed:[{time:"8:00", subj:"biology"},{time:"9:00", subj:"physics"},{time:"11:00", subj:"english"}],
  Thu:[{time:"8:00", subj:"mathematics"},{time:"9:00", subj:"chemistry"},{time:"10:30", subj:"economics"}],
  Fri:[{time:"8:00", subj:"english"},{time:"9:00", subj:"biology"},{time:"10:00", subj:"mathematics"}],
  Sat:[{time:"10:00", subj:"biology"}],
  Sun:[]
};

export const TASKS = [
  {id:1, title:"Finish Photosynthesis worksheet", due:"Today", done:false, priority:"coral", recurrence:"none", notes:""},
  {id:2, title:"Practice 10 simultaneous equation problems", due:"Today", done:false, priority:"ember", recurrence:"daily", notes:"Keep the streak going before the mock"},
  {id:3, title:"Read Ch. 4 — Newton's Laws", due:"Tomorrow", done:false, priority:"thread", recurrence:"none", notes:""},
  {id:4, title:"Summarise comprehension passage", due:"Fri", done:true, priority:"thread", recurrence:"none", notes:""},
  {id:5, title:"Pack bag for school trip", due:"Tomorrow", done:false, priority:"ember", recurrence:"none", notes:""}
];

export const EXAMS = [
  {name:"Biology Paper 2", board:"WAEC", days:14, subject:"biology"},
  {name:"Mathematics Mock", board:"JAMB", days:21, subject:"mathematics"},
  {name:"Chemistry Objectives", board:"NECO", days:33, subject:"chemistry"}
];
