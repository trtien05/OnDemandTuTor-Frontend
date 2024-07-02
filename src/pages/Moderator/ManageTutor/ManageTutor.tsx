import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import TutorTable from './DisplayComponents/TutorTable';
import { getListTutor } from '../../../utils/tutorAPI';
import { Tutor, Education } from './Tutor.type';
import { getTutorByStatus } from '../../../utils/moderatorAPI';

const ManageTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const fetchApi = async () => {
    const response = await getTutorByStatus('PROCESSING');
    setTutors(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  console.log(tutors);
  return (
    <div style={{ 'height': '100vh' }}>
      <h2>Processing Tutor</h2>

      {tutors && (
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageTutor;