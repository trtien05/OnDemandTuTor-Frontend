import { useEffect, useState } from 'react';
import TutorTable from './TutorTable';
import { getAccountByRole } from '../../../utils/accountAPI';

interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
  verified?: boolean;
};

interface Tutor {
  id: number;
  fullName?: string;
  avatarUrl?: string;
  teachingPricePerHour: number;
  educations?: Education;
  subjects: string[],
  averageRating?: number;
  loading: boolean;
  status: string;
  gender: string;
};

const ManageTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const fetchApi = async () => {
    const response = await getAccountByRole('TUTOR');
    setTutors(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  return (
    <div style={{ 'height': '85vh' }}>
      <h2>Manage Tutor</h2>

      {tutors && (
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageTutor;