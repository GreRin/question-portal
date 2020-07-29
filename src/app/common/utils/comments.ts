import { User } from './user';

export interface	Comments {
    message: string;
    currentDate: number;
    resolveComment: boolean;
    user: User;
  };
