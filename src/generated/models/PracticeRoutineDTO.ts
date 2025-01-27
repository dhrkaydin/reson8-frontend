export interface PracticeRoutineDTO {
  id: number | null;
  title: string;
  description: string;
  createdDate: string;
  category: string;
  targetBPM: number | null;
  targetFrequencyInterval: number | null;
  targetFrequencyUnit: string | null;
}
