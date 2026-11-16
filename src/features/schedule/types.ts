export type ShiftType = 'morning' | 'afternoon' | 'night';

export type Shift = {
  id: string;
  type: ShiftType;
  title: string;
  start: string; // HH:mm
  end: string; // HH:mm
  location: string;
};

export type ScheduleDay = {
  date: Date;
  weekday: string; // T2..CN
  isToday: boolean;
  shifts: Shift[];
};
