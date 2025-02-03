import { useState, useEffect } from "react";

interface BPMEntry {
  bpm: number;
  duration: number;
}

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [bpmHistory, setBpmHistory] = useState<BPMEntry[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentBpm, setCurrentBpm] = useState<number | null>(null);

  useEffect(() => {
    if (currentBpm !== null && currentBpm !== bpm) {
      const now = Date.now();
      if (startTime) {
        const duration = (now - startTime) / 1000; // Convert to seconds
        if (duration > 1) {
          setBpmHistory((prev) => [...prev, { bpm: currentBpm, duration }]);
        }
      }
      setStartTime(now);
      setCurrentBpm(bpm);
    }
  }, [bpm]);

  const calculateWeightedAverageBPM = () => {
    const totalDuration = bpmHistory.reduce((sum, entry) => sum + entry.duration, 0);
    if (totalDuration === 0) return 0;
    const weightedSum = bpmHistory.reduce((sum, entry) => sum + entry.bpm * entry.duration, 0);
    return Math.round(weightedSum / totalDuration);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Metronome</h2>
      <input
        type="range"
        min="40"
        max="240"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        className="w-full mt-2"
      />
      <p>Current BPM: {bpm}</p>
      <button
        onClick={() => alert(`Average BPM: ${calculateWeightedAverageBPM()}`)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Calculate Average BPM
      </button>
    </div>
  );
};

export default Metronome;
