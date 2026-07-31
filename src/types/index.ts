export type Role = "member" | "leader";

export type User = {
  id: number;
  email: string;
  username: string;
  boat_class?: string;
  role: Role;
};

export type PracticeRecord = {
  id: number;
  user: User;

  practice_date: string;

  wind_direction: string | null;

  min_wind_speed: number | null;
  max_wind_speed: number | null;

  tide: string | null;

  mast_rake: number | null;
  mast_bend: number | null;
  mast_spreader_angle: number | null;
  mast_spreader_length: number | null;
  mast_tension: number | null;

  content: string | null;
  reflection: string | null;

  weather: string | null;
  temperature: number | null;
};

export type PracticeRecordCreateRequest = {
  practice_date: string;

  wind_direction?: string;

  min_wind_speed?: number;
  max_wind_speed?: number;

  tide?: string;

  mast_rake?: number;
  mast_bend?: number;

  mast_spreader_angle?: number;
  mast_spreader_length?: number;

  mast_tension?: number;

  content?: string;
  reflection?: string;

  weather: string;
  temperature: number;
};

export type Tournament = {
  id: number;

  name: string;
  start_date: string;
  end_date: string;
  boats_count: number | null;
  race_count: number | null;
};

export type TournamentRequest = {
  name: string;
  start_date: string;
  end_date: string;
  boats_count?: number;
  race_count?: number;
};

export type Tournament_Entries = {
  id: number;
  tournament_id: number;
  user_id: number;
  overall_ranking: number;
  reflection: string | null;
  race_results: RaceResult[];
};

export type RaceResult = {
  id: number;
  race_number: number;
  score: number;
};

export type Monthly_goals = {
  id: number;
  user_id: number;
  goal_date: string;
  content: string;
  achievement_rate: number;
};

export type MonthlyGoalsRequest = {
  goal_date: string;
  content: string;
  achievement_rate?: number;
};
