import { useState } from 'react';
import './RoutineForm.module.css';

const RoutineForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tabNotation: '',
    createdDate: '',
    category: '',
    targetBPM: '',
    targetFrequencyInterval: '',
    targetFrequencyUnit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send fromData to back-end here.
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white bg-pastelPink">
      <div>
        <label htmlFor="title" className="block text-lg font-medium">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-lg font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="tabNotation" className="block text-lg font-medium">Tab Notation</label>
        <textarea
          id="tabNotation"
          name="tabNotation"
          value={formData.tabNotation}
          onChange={handleChange}
          className="mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="createdDate" className="block text-lg font-medium">Created Date</label>
        <input
          type="date"
          id="createdDate"
          name="createdDate"
          value={formData.createdDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-lg font-medium">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 p-2 border rounded"
        >
          <option value="warmup">Warm Up</option>
          <option value="technique">Technique</option>
          <option value="performance">Performance</option>
        </select>
      </div>

      <p>Optional fields</p>
      

      <div>
        <label htmlFor="targetBPM" className="block text-lg font-medium">Target BPM</label>
        <input
          type="number"
          id="targetBPM"
          name="targetBPM"
          value={formData.targetBPM}
          onChange={handleChange}
          className="mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="targetFrequencyInterval" className="block text-lg font-medium">Target Frequency Interval</label>
        <input
          type="number"
          id="targetFrequencyInterval"
          name="targetFrequencyInterval"
          value={formData.targetFrequencyInterval}
          onChange={handleChange}
          className="mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="targetFrequencyUnit" className="block text-lg font-medium">Target Frequency Unit</label>
        <input
          type="text"
          id="targetFrequencyUnit"
          name="targetFrequencyUnit"
          value={formData.targetFrequencyUnit}
          onChange={handleChange}
          className="mt-1 p-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Routine</button>
    </form>
  );
};

export default RoutineForm;