import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    throw new Error('No countries found');
                }
                data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(data);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setCountries([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-4">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-slate-100 shadow p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Country List</h2>
            {countries.length === 0 ? (
                <p className="text-center">No countries found.</p>
            ) : (
                <ul className="space-y-2">
                    {countries.map(country => (
                        <li key={country.cca3} className="hover:bg-gray-200 rounded">
                            <Link to={`/country/${country.name.common}`} className="block p-2">
                                {country.name.common}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CountryList;
