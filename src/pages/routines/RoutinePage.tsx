import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';
import apiClient from '../../api/apiClient';

const RoutinePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState<PracticeRoutineDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRoutine = async () => {
      try {
        const response = await apiClient.get<PracticeRoutineDTO>(`/routines/${id}`);
        setRoutine(response.data);
      } catch (err) {
        setError('Failed to load routine. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800">{routine?.title}</h1>
      <p className="text-gray-600 mt-2">{routine?.description}</p>
      <p className="text-sm text-gray-500 mt-4">Category: {routine?.category}</p>
      <button
        className="mt-6 text-gray-500 hover:text-pink-700 text-sm no-underline"
        onClick={() => navigate(`/routines/edit/${id}`)}
      >
        Edit
      </button>
    </div>
  );
};

export default RoutinePage;