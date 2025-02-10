import { useState, useEffect } from "react";
import styles from "./Metronome.module.css";

const Metronome = ({ onBpmUpdate }: { onBpmUpdate: (bpm: number) => void }) => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subdivision, setSubdivision] = useState(1);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [tickBuffer, setTickBuffer] = useState<AudioBuffer | null>(null);
  const [bpmHistory, setBpmHistory] = useState<{ bpm: number; duration: number }[]>([]); // Store BPM and its duration

  useEffect(() => {
    if (!audioContext) return;

    const loadSound = async () => {
      try {
        const response = await fetch("/tick.mp3");
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await audioContext.decodeAudioData(arrayBuffer);
        setTickBuffer(buffer);
      } catch (error) {
        console.error("Error loading tick sound:", error);
      }
    };

    loadSound();
  }, [audioContext]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let lastTickTime: number | null = null; // Track the time of the last tick

    if (isPlaying && bpm > 0 && tickBuffer) {
      const tickInterval = (60 / bpm) * 1000;

      interval = setInterval(() => {
        if (audioContext) {
          const now = Date.now();

          // Calculate the duration of the current BPM
          if (lastTickTime !== null) {
            const duration = (now - lastTickTime) / 1000; // in seconds
            setBpmHistory((prev) => [
              ...prev,
              { bpm: bpm, duration: duration },
            ]);
          }

          // Play the tick sound
          const source = audioContext.createBufferSource();
          source.buffer = tickBuffer;

          const gainNode = audioContext.createGain();
          gainNode.gain.value = 0.8 + Math.random() * 0.2; // Random volume between 0.8 and 1.0

          source.connect(gainNode);
          gainNode.connect(audioContext.destination);
          source.start();

          lastTickTime = now;
        }
      }, tickInterval / subdivision);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, bpm, subdivision, audioContext, tickBuffer]);

  const calculateWeightedAverageBPM = () => {
    const totalDuration = bpmHistory.reduce((sum, entry) => sum + entry.duration, 0);
    if (totalDuration === 0) return 0;

    const weightedSum = bpmHistory.reduce(
      (sum, entry) => sum + entry.bpm * entry.duration,
      0
    );

    return Math.round(weightedSum / totalDuration);
  };

  const handleStart = () => {
    if (!audioContext) {
      const newAudioContext = new AudioContext();
      setAudioContext(newAudioContext);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Notify the parent component (SessionPage) about the current average BPM
    onBpmUpdate(calculateWeightedAverageBPM());
  }, [bpmHistory, onBpmUpdate]);

  return (
    <div className="p-4 flex text-center flex-col items-center gap-4 w-full">
      {/* Metronome bar */}
      <div className="flex flex-col items-center gap-4 w-full">
        <span className="text-6xl font-micro5 text-resonPurple">metronome</span>
        <input
          type="range"
          min="0"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className={styles.slider}
        />
        <p className="font-micro5 text-3xl">{bpm} bpm</p>
      </div>

      <div className="mt-4 flex items-center flex-col">
        <div>
          <span className="text-2xl font-micro5">subdivision</span>
        </div>
        <div className="flex space-x-2 w-full">
          {[1, 2, 4].map((value) => (
            <div
              key={value}
              onClick={() => setSubdivision(value)}
              className={`flex px-1 w-20 py-2 justify-center items-center cursor-pointer text-xl font-micro5 transition-colors text-black ${
                subdivision === value
                  ? "bg-resonPurple border-4 border-black"
                  : "bg-gray-300"
              }`}
            >
              {value === 1 ? "1" : `1/${value}`}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className={`mt-4 p-2 w-2/3 font-pixelify text-2xl sm:w-1/4 text-black ${isPlaying ? "bg-red-500" : "bg-resonGreen-900"}`}
      >
        {isPlaying ? "stop" : "start"}
      </button>
    </div>
  );
};

export default Metronome;