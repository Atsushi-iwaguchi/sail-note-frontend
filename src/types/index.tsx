export type Role = 'member' | 'leader'

export type User = {
    id: number
    email: string
    username: string
    boat_class? : string
    role: Role
}

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

type PracticeRecordCreateRequest = {
  practice_date: string;

  wind_direction?: string;

  min_wind_speed?: number;
  max_wind_speed?: number;

  content?: string;
  reflection?: string;
};