import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

async function fetchCountry(name) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('Country not found');
        }
        return data[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

function CountryDetails() {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCountry = async () => {
            try {
                const data = await fetchCountry(name);
                setCountry(data);
                setError(null);
            } catch (error) {
                setError(error.message);
                setCountry(null);
            } finally {
                setLoading(false);
            }
        };

        getCountry();
    }, [name]);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-600 mt-4">
                <p>{error}</p>
                <Link to="/" className="text-blue-500 underline text-sm">Back to Country List</Link>
            </div>
        );
    }

    if (!country) {
        return (
            <div className="text-center mt-4">Country data not available.</div>
        );
    }

    const {
        name: { common },
        flags: { png },
        capital = [],
        region,
        subregion,
        population,
        languages = {},
        currencies = {},
        maps: { googleMaps } = {}
    } = country;

    return (
        <div className="max-w-2xl mx-auto bg-slate-100 shadow p-6 rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4 gap-3">
                <h2 className="text-3xl font-semibold">{common}</h2>
                <img src={png} alt={`Flag of ${common}`} className="w-32 h-20" />
            </div>
            <p className="mb-2"><strong>Capital:</strong> {capital[0] || "N/A"}</p>
            <p className="mb-2"><strong>Region:</strong> {region}</p>
            <p className="mb-2"><strong>Subregion:</strong> {subregion}</p>
            <p className="mb-2"><strong>Population:</strong> {population.toLocaleString()}</p>
            <p className="mb-2"><strong>Languages:</strong> {Object.values(languages).join(', ')}</p>
            <p className="mb-2"><strong>Currencies:</strong> {Object.values(currencies).map(curr => curr.name).join(', ')}</p>
            <p className="flex justify-between gap-3">
                {googleMaps && (
                    <a href={googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View on Google Maps</a>
                )}
                <Link to="/" className="text-blue-500 underline text-sm">Back to Country List</Link>
            </p>
        </div>
    );
}

export default CountryDetails;
