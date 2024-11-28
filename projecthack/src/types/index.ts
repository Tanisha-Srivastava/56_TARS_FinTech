export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  disease: string;
  smoking: 'non_smoker' | 'moderate_smoker' | 'regular_smoker';
  bmi: number;
  familyHistory: string[];
  claims: 0 | 1;
  policyType: 'individual' | 'family' | 'corporate';
  income: number;
}

export interface Community {
  id: string;
  name: string;
  guidelines: string;
  members: string[];
  claims: Claim[];
}

export interface Claim {
  id: string;
  userId: string;
  amount: number;
  description: string;
  votes: { userId: string; approved: boolean }[];
  status: 'pending' | 'approved' | 'rejected';
}