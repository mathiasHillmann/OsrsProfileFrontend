export enum QuestStatus {
  Unknown = 'unknown',
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Complete = 'complete',
}

export interface Skill {
  realLevel: number;
  virtualLevel: number;
  experience: number;
}

export interface Quest {
  status: QuestStatus;
  text: string;
}

export interface Diary {
  easy: boolean;
  medium: boolean;
  hard: boolean;
  elite: boolean;
}

export interface Boss {
  text: string;
  kc: number;
  pb: number;
}

export interface Minigame {
  text: string;
  score: number;
}

export interface PlayerData {
  skills: Record<string, Skill>;
  quest: Record<string, Quest>;
  miniquest: Record<string, Quest>;
  summary: Record<string, any>;
  diaries: Record<string, Diary>;
  bosses: Record<string, Boss>;
  minigames: Record<string, Minigame>;
}
