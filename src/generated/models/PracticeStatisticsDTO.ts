export interface PracticeStatisticsDTO {
  id: number | null;
  totalPracticeTime: number;
  totalSessions: number;
  highestBPM: number;
  totalBPMIncrease: number;
  practiceRoutineId: number;
}
