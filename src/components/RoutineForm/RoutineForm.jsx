import { useState, useEffect } from 'react';
import './RoutineForm.module.css';

const RoutineForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetBPM: '',
    targetFrequencyInterval: '',
    targetFrequencyUnit: '',
  });

  const [showTargets, setShowTargets] = useState(false); // Toggle state for target fields
  const [theme, setTheme] = useState('light'); // Dynamic theme support

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded"
      style={{
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
      }}
    >
      {/* Title */}
      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="title" className="block text-lg font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
          style={{
            backgroundColor: 'var(--input-bg-color)',
            color: 'var(--input-text-color)',
          }}
        />
      </div>

      {/* Description */}
      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="description" className="block text-lg font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          style={{
            backgroundColor: 'var(--input-bg-color)',
            color: 'var(--input-text-color)',
          }}
        />
      </div>

      {/* Category */}
      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="category" className="block text-lg font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          style={{
            backgroundColor: 'var(--input-bg-color)',
            color: 'var(--input-text-color)',
          }}
        >
          <option value="">None</option>
          <option value="warmup">Warm Up</option>
          <option value="technique">Technique</option>
          <option value="performance">Performance</option>
        </select>
      </div>

      {/* Set Targets Button */}
      <div className="w-full md:w-2/3 mx-auto">
        <button
          type="button"
          onClick={() => setShowTargets(!showTargets)}
          className="bg-pink-500 text-white p-2 rounded mb-4 hover:bg-pink-600"
        >
          {showTargets ? 'Hide Targets' : 'Set Targets'}
        </button>
      </div>

      {/* Targets in Grid (Toggleable) */}
      {showTargets && (
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="targetBPM" className="block text-sm font-medium mb-1">
              Target BPM
            </label>
            <input
              type="number"
              id="targetBPM"
              name="targetBPM"
              value={formData.targetBPM}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              style={{
                backgroundColor: 'var(--input-bg-color)',
                color: 'var(--input-text-color)',
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="targetFrequencyInterval" className="block text-sm font-medium mb-1">
              Target Interval
            </label>
            <input
              type="number"
              id="targetFrequencyInterval"
              name="targetFrequencyInterval"
              value={formData.targetFrequencyInterval}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              style={{
                backgroundColor: 'var(--input-bg-color)',
                color: 'var(--input-text-color)',
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="targetFrequencyUnit" className="block text-sm font-medium mb-1">
              Target Unit
            </label>
            <select
              id="targetFrequencyUnit"
              name="targetFrequencyUnit"
              value={formData.targetFrequencyUnit}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              style={{
                backgroundColor: 'var(--input-bg-color)',
                color: 'var(--input-text-color)',
              }}
            >
              <option value="">Select unit</option>
              <option value="day">Day(s)</option>
              <option value="week">Week(s)</option>
              <option value="month">Month(s)</option>
            </select>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-pink-500 md:w-2/3 text-white p-2 rounded w-full hover:bg-pink-600"
      >
        Save Routine
      </button>
    </form>
  );
};

export default RoutineForm;