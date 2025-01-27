import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { Dropdown } from './..';
import './RoutineForm.module.css';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';

interface RoutineFormProps {
  onClose: () => void;
  initialData: PracticeRoutineDTO;
  onSubmit: (updatedRoutine: any) => void;
}

const RoutineForm: React.FC<RoutineFormProps> = ({ onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [showTargets, setShowTargets] = useState(false);
  const { data, execute } = useApi<string[]>();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await execute('GET', '/routines/categories');
    };
  
    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  // Dynamically updates form when inputting a value into an input/select element.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Updates the category value in form data via the dropdown.
  const handleCategoryChange = (selectedCategory: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  };

  // Adds the date to the form data and calls onSubmit (which should be provided by the parent component).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentDate = new Date().toISOString(); 
    const updatedData = { ...formData, createdDate: currentDate };

    onSubmit(updatedData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(initialData); 
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 mb-4 rounded bg-pastelPink text-black border"
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
        />
      </div>

      {/* Category */}
      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="category" className="block text-lg font-medium">
          Category
        </label>
        <Dropdown
          values={categories}
          onChange={handleCategoryChange} // Handle category selection
        />
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