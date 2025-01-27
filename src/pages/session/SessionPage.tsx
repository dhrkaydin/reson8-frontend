import { PracticeRoutineTitleDTO } from "../../generated/models/PracticeRoutineTitleDTO";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";


const SessionPage: React.FC = () => {
    const [titles, setTitles] = useState<PracticeRoutineTitleDTO[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {    
        const fetchTitles = async () => {
          try {
            const response = await apiClient.get<PracticeRoutineTitleDTO[]>(`/routines/titles`);
            setTitles(response.data);
          } catch (err) {
            setError('Failed to load titles. Please try again later.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchTitles();
      }, []);

      if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
      if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    
    return (
        <div>
            
        </div>
    );


}

export default SessionPage;