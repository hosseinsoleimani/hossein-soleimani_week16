import { useState } from "react";

/* eslint-disable react/prop-types */
const Input = ({ hint }) => {
  const cities = [
    "Tehran",
    "Shiraz",
    "Isfahan",
    "Kermanshah",
    "Ahwaz",
    "Arak",
    "Mashhad",
    "Tabriz",
    "Karaj",
    "Tafresh",
    "Sanandaj",
  ];
  const [suggestion, setSuggestion] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setSuggestion([]);
      return;
    }
    const searchedCity = cities.filter((city) =>
      city.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
    setSuggestion(searchedCity);
  };

  return (
    <div className="input">
      <label htmlFor="input">{hint}</label>
      <input type="text" id="input" onChange={handleChange} />
      {suggestion.length > 0 && (
        <ul>
          {suggestion.map((city, index) => (
            <li key={index}>{city}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Input;
