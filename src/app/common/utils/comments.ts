import { User } from './usert';

export interface	Comments {
    message: string;
    currentDate: number;
    resolveComment: boolean;
    user: User;
  };
