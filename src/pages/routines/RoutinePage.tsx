import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

interface PracticeRoutineDTO {
  id: number;
  title: string;
  description: string;
  createdDate: string;
  category: string;
  targetBPM: number;
  targetFrequencyInterval: number;
  targetFrequencyUnit: string;
}

const RoutinePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState<PracticeRoutineDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PracticeRoutineDTO | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRoutine = async () => {
      try {
        const response = await apiClient.get<PracticeRoutineDTO>(`/routines/${id}`);
        setRoutine(response.data);
        setEditData(response.data); // Initialize the edit form data
      } catch (err) {
        setError('Failed to load routine. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    try {
      if (!id || !editData) return;
      await apiClient.put(`/routines/${id}`, editData);
      setRoutine(editData); // Update the view with the edited data
      setIsEditing(false);
    } catch (err) {
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this routine?');
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/routines/${id}`);
      navigate('/routines'); // Navigate back to the overview page
    } catch (err) {
      alert('Failed to delete the routine. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {isEditing ? (
        <div>
          <h1>Edit Routine</h1>
          <form>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editData?.title || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editData?.description || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Target BPM:
              <input
                type="number"
                name="targetBPM"
                value={editData?.targetBPM || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Target Frequency Interval:
              <input
                type="number"
                name="targetFrequencyInterval"
                value={editData?.targetFrequencyInterval || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Target Frequency Unit:
              <select
                name="targetFrequencyUnit"
                value={editData?.targetFrequencyUnit || ''}
                onChange={handleInputChange}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </label>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleEditToggle}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{routine?.title}</h1>
          <p>{routine?.description}</p>
          <p>
            Created on: {new Date(routine?.createdDate ?? '').toLocaleDateString()}
          </p>
          <p>Category: {routine?.category.name}</p>
          <p>Target BPM: {routine?.targetBPM}</p>
          <p>
            Practice Frequency: {routine?.targetFrequencyInterval}{' '}
            {routine?.targetFrequencyUnit}
          </p>
          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RoutinePage;