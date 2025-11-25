export enum Gender {
  MALE = '男命',
  FEMALE = '女命'
}

export interface UserInput {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthTime: string; // 00:00 to 23:59
  birthPlace: string;
  gender: Gender;
}

export interface BaziPillars {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  isThinking?: boolean;
  thinkingTexts?: string[];
}

export interface CalculationResult {
  bazi: BaziPillars;
  daYunString: string;
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}
