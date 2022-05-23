import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import { Link } from 'react-router-dom';
import { Company } from './interfaces/company';

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`http://localhost:3000/companies`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderCompanies = useMemo(
    () =>
      companies.map((e) => {
        return (
          <tr key={e.id} data-testid="company">
            <td>
              <Link to={`company/${e.id}`} data-testid={e.id}>
                {e.name}
              </Link>
            </td>
            <td>{e.vatin}</td>
          </tr>
        );
      }),
    [companies]
  );

  if (error) {
    return (<div className='App'>
      <h1>An error occurr!</h1>
    </div>);
  }

  if(Loading){
    return <div className="loader"></div>
  }

  return (
    <div className='App'>
      <h1>Companies</h1>
      <table>
        <thead>
          <tr>
            <td>Company name</td>
            <td>vatin</td>
          </tr>
        </thead>
        <tbody>{renderCompanies}</tbody>
      </table>
    </div>
  );
}

export default App;
