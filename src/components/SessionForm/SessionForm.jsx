import { useState, useEffect } from 'react';
import axios from 'axios';

const SessionForm = () => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [bpm, setBpm] = useState(0);
  const [metronomeInterval, setMetronomeInterval] = useState(null);
  
  // Fetch available routines from the backend
  useEffect(() => {
    axios.get('/routines')
      .then(response => setRoutines(response.data))
      .catch(error => console.error("Error fetching routines", error));
  }, []);
  
  // Metronome logic
  const startMetronome = () => {
    const interval = 60000 / bpm; // milliseconds per beat
    const metronome = setInterval(() => {
      console.log("Tick");
      // You can trigger a sound or visual cue here
      playTickSound();
    }, interval);
    
    setMetronomeInterval(metronome);
  };
  
  const stopMetronome = () => {
    clearInterval(metronomeInterval);
    setMetronomeInterval(null);
  };
  
  const playTickSound = () => {
    // Create a simple beep sound using Web Audio API or load a sound file
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequency for the tick sound (A4)
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // 100ms beep
  };

  // Start the session
  const startSession = () => {
    setIsSessionActive(true);
    setSessionStartTime(Date.now());
    startMetronome();
  };

  // Stop the session and submit the data
  const stopSession = () => {
    const sessionEndTime = Date.now();
    const duration = Math.floor((sessionEndTime - sessionStartTime) / 1000); // in seconds

    // Send the session data to the backend
    axios.post('/api/sessions', {
      sessionDate: new Date().toISOString(),
      bpm: bpm,
      duration: duration,
      practiceRoutine: { id: selectedRoutine.id }
    })
      .then(response => {
        console.log("Session data submitted", response.data);
      })
      .catch(error => console.error("Error submitting session data", error));

    setIsSessionActive(false);
    stopMetronome();
  };

  return (
    <div className="session-form">
      <h2>Create a New Session</h2>

      {/* Routine Selection */}
      <select 
        value={selectedRoutine?.id || ''} 
        onChange={(e) => setSelectedRoutine(routines.find(r => r.id === e.target.value))}
      >
        <option value="" disabled>Select a Routine</option>
        {routines.map((routine) => (
          <option key={routine.id} value={routine.id}>
            {routine.title}
          </option>
        ))}
      </select>

      {/* Start/Stop Session */}
      {!isSessionActive ? (
        <button onClick={startSession}>Start Session</button>
      ) : (
        <button onClick={stopSession}>Stop Session</button>
      )}

      {/* Display session time */}
      {isSessionActive && <p>Session Time: {sessionDuration}s</p>}

      {/* Display BPM */}
      <input 
        type="number" 
        value={bpm} 
        onChange={(e) => setBpm(e.target.value)} 
        placeholder="Enter BPM" 
      />
      
      {/* Display metronome status */}
      {isSessionActive && <p>Metronome is active at {bpm} BPM</p>}
    </div>
  );
};

export default SessionForm;