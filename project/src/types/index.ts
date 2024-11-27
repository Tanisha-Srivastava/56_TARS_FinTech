export type SmokingStatus = 'non-smoker' | 'occasional-smoker' | 'regular-smoker';

export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  healthCondition: string;
  smokingStatus: SmokingStatus;
  bmi: number;
  familyHistory: string;
  claims: number;
  policyType: string;
  income: number;
}

export interface Community {
  id: string;
  name: string;
  guidelines: string;
  claimLimits: number;
  adminCost: number;
  members: string[];
  creator: string;
}

export interface JoinRequest {
  id: string;
  userId: string;
  communityId: string;
  amount: number;
  documents: string[];
  votes: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}