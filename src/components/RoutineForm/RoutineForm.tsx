import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoutineForm.module.css';

interface RoutineFormProps {
  onClose: () => void;
  categories: string[];
  initialData: {
    title: string;
    description: string;
    category: string;
    targetBPM: string;
    targetFrequencyInterval: string;
    targetFrequencyUnit: string;
  };
  onSubmit: (updatedRoutine: any) => void;
}

interface CategoryDropdownProps {
  formData: {
    category: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ formData, handleChange, categories }) => (
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
    <option value="">Select a category</option>
    {categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ))}
  </select>
);

const RoutineForm: React.FC<RoutineFormProps> = ({ onClose, categories, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData); // Initialize with initialData

  const [showTargets, setShowTargets] = useState(false);
  const navigate = useNavigate(); // For navigation, but we won't use it for cancel
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentDate = new Date().toISOString(); // Get the current date in ISO format
    const updatedData = { ...formData, createdDate: currentDate };

    onSubmit(updatedData);
  };

  const handleCancel = () => {
    setFormData(initialData); // Reset the form to the initial data
    onClose(); // Close the form without navigation
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
        <CategoryDropdown formData={formData} handleChange={handleChange} categories={categories} />
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

      {/* Cancel Button */}
      <button
        type="button"
        onClick={handleCancel}
        className="bg-gray-500 md:w-2/3 text-white p-2 rounded w-full hover:bg-gray-600 mt-4"
      >
        Cancel
      </button>
    </form>
  );
};

export default RoutineForm;