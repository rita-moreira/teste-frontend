import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import { Link, useParams } from 'react-router-dom';
import { PhoneNumber } from './interfaces/phoneNumber';

function NumberPage() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
    const [error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);

  const { numberId } = useParams();
  const phoneNumber = useMemo(() => phoneNumbers?.find((e) => e.id === numberId),[numberId, phoneNumbers]);

  useEffect(() => {
    fetch(`http://localhost:3000/phone_numbers`)
      .then((response) => response.json())
      .then((data) => setPhoneNumbers(data)).catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className='App'>
        <Link  to={`/`} data-testid="back" >
          <input type='button' value='Go Back' />
        </Link>
        <h1>An error occurr!</h1>
      </div>
    );
  }

  if (!phoneNumber) {
    return (
      <div className='App'>
        <Link to={`/`}data-testid="back" >
          <input type='button' value='Go Back' />
        </Link>
        <h3>This number does not exist</h3>
      </div>
    );
  }
    if(Loading){
   return  <div className="loader"></div>
  }
  return (
    <div className='App'>
      <Link to={`/company/${phoneNumber?.company_id}`} data-testid="back">
        <input type='button' value='Go Back' />
      </Link>
      <h3>{phoneNumber && phoneNumber.id}</h3>
      <h3>{phoneNumber && phoneNumber.type}</h3>
    </div>
  );
}

export default NumberPage;
