export const LINKED_ACCOUNTS = [
  {mode:'student', icon:'🎓', label:'Chidinma Okafor', role:'Student'},
  {mode:'teacher', icon:'🧑‍🏫', label:'Mrs. F. Adeyemi', role:'Teacher'},
  {mode:'school', icon:'🏫', label:'Corona Secondary School', role:'School Admin'}
];

export const OB_GRADES = {
  ng: ["JSS1","JSS2","JSS3","SS1","SS2","SS3"],
  intl: ["Grade 9","Grade 10","Grade 11","Grade 12"]
};

export const OB_TRACK_GRADES = ["SS1","SS2","SS3","Grade 11","Grade 12"];

export const FREE_AI_DAILY = 3;

export const studentProfile = {firstName:"Chidinma", lastName:"Okafor", age:"16", dob:"2010-03-14", phone:"0803 XXX XX21", grade:"SS2", gender:"Female", track:"Science", username:"chidinma_o", avatar:null, participatedSubjects:[]};

export type EarnedBadge = { subject: string; topic: string; date: string };
export type EarnedCertificate = { subject: string; date: string };

export const earnedBadges: EarnedBadge[] = [
  {subject:'biology', topic:'Cell Structure and Function', date:'3 days ago'},
  {subject:'mathematics', topic:'Indices and Logarithms', date:'Yesterday'}
];

export const earnedCertificates: EarnedCertificate[] = [];
