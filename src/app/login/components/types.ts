export type OnboardingStep = "auth" | "role" | "details" | "details2";

export interface OnboardingForm {
  role: "student" | "teacher" | "school" | null;
  username: string;
  firstName: string;
  lastName: string;
  age: string;
  dob: string;
  phone: string;
  curriculum: "ng" | "intl";
  grade: string;
  gender: string;
  track: string;
  schoolCode: string;
  subjectsTaught: string[];
  instName: string;
  contactName: string;
  instPhone: string;
  instSize: string;
  avatar: string | null;
}
