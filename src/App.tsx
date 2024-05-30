import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

interface ApodData {
  url: string;
  title: string;
  explanation: string;
  date: string;
}

const API_KEY = 'eLbQp9xFPHjoabWPz37sgsgsozVUbn8wtUN2Soez';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const formattedDate = formatDate(selectedDate);
        const response = await axios.get<ApodData>(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`
        );
        setApodData(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data from NASA APOD API');
      }
    };

    

    fetchApodData();
  }, [selectedDate]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="App">
      <h1>NASA Astronomy Picture of the Day</h1>
      <div className="search-container">
        <h3>Filter Image By Date
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        /></h3>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {apodData && (
        <>
          <img src={apodData.url} alt={apodData.title} />
          <h2>{apodData.title}</h2>
          <p>{apodData.explanation}</p>
          <p>Date: {apodData.date}</p>
        </>
      )}
    </div>   
  );
};

export default App;
