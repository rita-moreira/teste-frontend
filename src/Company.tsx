import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import { Link, useParams } from 'react-router-dom';
import { Company } from './interfaces/company';
import { PhoneNumber } from './interfaces/phoneNumber';


function CompanyPage() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);

  const { companyId } = useParams();
    const filterPhoneNumbers =  useMemo(() => phoneNumbers.filter((e) => e.company_id === Number(companyId)),[companyId, phoneNumbers])
  const company = companies.find((e) => e.id === Number(companyId));

  useEffect(() => {
    fetch(`  http://localhost:3000/companies`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
    fetch(`  http://localhost:3000/phone_numbers`)
      .then((response) => response.json())
      .then((data) => setPhoneNumbers(data))
            .catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const renderPhoneNumbers = useMemo(
    () =>
     filterPhoneNumbers
        .map((e) => {
          return (
            <tr key={e.id} data-testid="number">
              <td>
                <Link to={`/numbers/${e.id}`} data-testid={e.id}>
                  {e.id}
                </Link>
              </td>
              <td>{e.type}</td>
            </tr>
          );
        }),
    [filterPhoneNumbers]
  );

  if (error) {
    return (
      <div className='App'>
        <Link to="/" data-testid="back"><input type='button' value='Go Back' /></Link>
        <h1>An error occurr!</h1>
      </div>
    );
  }

  if (!company) {
    return (
      <div className='App'>
        <Link to="/" data-testid="back"><input type='button' value='Go Back' /></Link>
        <h1>Company does not exist!</h1>
      </div>
    );
  }
  if (!phoneNumbers || filterPhoneNumbers.length === 0) {
    return (
      <div className='App'>
        <Link to="/" data-testid="back"><input type='button' value='Go Back' /></Link>
        <h1>{company && company.name}</h1>
        <h3>This company does not have phone numbers associated</h3>
      </div>
    );
  }
    if(Loading){
    return <div className="loader"></div>
  }
  return (
    <div className='App'>
        <Link to="/" data-testid="back"><input type='button' value='Go Back' /></Link>
      <h1>{company && company.name}</h1>
      <table>
        <thead>
          <tr>
            <td>Number</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>{renderPhoneNumbers}</tbody>
      </table>
    </div>
  );
}

export default CompanyPage;
