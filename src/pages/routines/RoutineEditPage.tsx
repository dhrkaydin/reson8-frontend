import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient'; // Assuming apiClient is already set up for axios
import { RoutineForm } from '../../components'; // Import the RoutineForm component
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO'; // Adjust the DTO import as needed

const RoutineEditPage: React.FC = () => {
  const { id } = useParams(); // Getting the routine ID from the URL
  const navigate = useNavigate();
  const [routineData, setRoutineData] = useState<PracticeRoutineDTO | null>(null); // State to store the routine data
  const [categories, setCategories] = useState<string[]>([]); // Categories for dropdown

  // Fetch routine data and categories when component mounts or id changes
  useEffect(() => {
    if (id) {
      // Fetch routine data based on the ID
      apiClient
        .get<PracticeRoutineDTO>(`/routines/${id}`)
        .then((response) => {
          setRoutineData(response.data); // Set the fetched routine data
        })
        .catch((error) => {
          console.error('Error fetching routine:', error);
        });

      // Fetch available categories
      apiClient
        .get<string[]>('/routines/categories')
        .then((response) => {
          setCategories(response.data); // Set the categories for dropdown
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [id]);

  // Handle form submission to update the routine
  const handleFormSubmit = (updatedRoutine: PracticeRoutineDTO) => {
    if (id) {
      apiClient
        .put(`/routines/${id}`, updatedRoutine) // Send PUT request with updated data
        .then(() => {
          navigate(`/routines/${id}`); // Redirect to the updated routine page
        })
        .catch((error) => {
          console.error('Error updating routine:', error);
        });
    }
  };

  // Handle cancel action (navigate back to the routines list)
  const handleCancel = () => {
    if (id) {
      navigate(`/routines/${id}`); // Navigate back to the specific routine page
    } else {
      navigate('/routines'); // Fallback in case ID is missing
    }
  };

  if (!routineData || categories.length === 0) {
    return <div>Loading...</div>; // Loading state while waiting for data
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold font-silkscreen bg-resonGreen text-center text-resonPurple">Edit Routine</h1>
      <RoutineForm
        onClose={handleCancel} // Navigate back to routines list
        categories={categories}
        initialData={routineData} // Pass initial data to the form
        onSubmit={handleFormSubmit} // Handle form submission
        showDelete={true} // Show delete button
      />
    </div>
  );
};

export default RoutineEditPage;