import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { Dropdown } from './..';
import './RoutineForm.module.css';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';
import { useNavigate } from 'react-router-dom';

interface RoutineFormProps {
  onClose: () => void;
  initialData: PracticeRoutineDTO;
  onSubmit: (updatedRoutine: any) => void;
  showDelete?: boolean; // New optional prop (defaults to false)
}

const RoutineForm: React.FC<RoutineFormProps> = ({ onClose, initialData, onSubmit, showDelete = false }) => {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { ...formData, createdDate: new Date().toISOString() };
    onSubmit(updatedData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(initialData);
    onClose();
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this routine? This action cannot be undone.')) {
      try {
        await execute('DELETE', `/routines/${initialData.id}`);
        onClose();
      } catch (error) {
        console.error('Error deleting routine:', error);
      } finally {
        navigate('/routines');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-resonGreen h-full space-y-4 p-4 font-silkscreen text-black">
      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="title" className="block text-lg font-medium">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-2 sm:text-3xl text-2xl text-bold bg-resonYellow font-handjet w-full"
        />
      </div>

      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="description" className="block text-lg font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 sm:text-3xl text-2xl text-bold bg-resonYellow font-handjet w-full"
        />
      </div>

      <div className="w-full md:w-2/3 mx-auto">
        <label htmlFor="category" className="block text-lg font-medium">Category</label>
        <Dropdown values={categories} onChange={handleCategoryChange} />
      </div>

      <div className="w-full md:w-2/3 mx-auto">
        <button
          type="button"
          onClick={() => setShowTargets(!showTargets)}
          className="bg-resonBlue w-full hover:bg-resonBlue-600 text-black p-2"
        >
          {showTargets ? 'Hide Targets' : 'Set Targets'}
        </button>
      </div>

      {showTargets && (
        <div className="flex flex-col md:flex-row md:w-2/3 mx-auto gap-4">
          <div className="w-full h-full">
            <label htmlFor="targetBPM" className="block">Target BPM</label>
            <input
              type="number"
              id="targetBPM"
              name="targetBPM"
              value={formData.targetBPM}
              onChange={handleChange}
              className="p-2 bg-resonYellow font-handjet w-full"
            />
          </div>
          <div className="h-full w-full">
            <label className="block">Practice Frequency</label>
            <div className="flex items-center space-x-2">
              <span className="font-handjet text-2xl">Every</span>
              <select
                id="targetFrequencyInterval"
                name="targetFrequencyInterval"
                value={formData.targetFrequencyInterval}
                onChange={handleChange}
                className="p-2 bg-resonYellow text-xl font-handjet"
              >
                {[...Array(11).keys()].slice(1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <select
                id="targetFrequencyUnit"
                name="targetFrequencyUnit"
                value={formData.targetFrequencyUnit}
                onChange={handleChange}
                className="p-2 bg-resonYellow text-xl font-handjet"
              >
                <option value="">Select unit</option>
                <option value="day">Day(s)</option>
                <option value="week">Week(s)</option>
                <option value="month">Month(s)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-2/3 mx-auto flex sm:flex-row flex-col gap-4">
        <button type="submit" className="bg-resonPurple md:w-2/3 text-black p-2 w-full hover:bg-resonPurple-600">
          Save Routine
        </button>
        <button type="button" onClick={handleCancel} className="bg-gray-500 md:w-2/3 text-white p-2 w-full hover:bg-gray-600">
          Cancel
        </button>
        {showDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 md:w-2/3 text-white p-2 w-full hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default RoutineForm;