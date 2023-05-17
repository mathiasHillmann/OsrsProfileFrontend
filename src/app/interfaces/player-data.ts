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

export interface PlayerData {
  skills: Record<string, Skill>;
  quests: Record<string, QuestStatus>;
  summary: Record<string, any>;
}
