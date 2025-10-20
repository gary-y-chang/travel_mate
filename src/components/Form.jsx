// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router";

 function convertToEmoji(countryCode) {
   const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0)); // 127397 is the offset for regional indicator symbols
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLPosition() || [];
  const [emoji, setEmoji] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const {createCityData, isLoading: isAPILoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (lat && lng) {
      async function fetchCityData() {
        try{
          setIsLoading(true);
          setLocationError("");
          const res =await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          console.log(data);

          if( !data.countryCode){
            console.log("Country Code: ", data.countryCode, "<<");
            throw new Error('No country found for the provided coordinates. Please select a different location.');
          }

          setCityName(data.city || data.locality || '');
          setCountry(data.countryName || '');
          setEmoji(convertToEmoji(data.countryCode));
          } catch (error) {
             setLocationError(error.message);        
          } finally {
            setIsLoading(false);
          }
      }
      fetchCityData();
    }
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date || !lat || !lng) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      lat: +lat,
      lng: +lng
    };
    console.log(newCity);
    
    await createCityData(newCity);
    navigate('/app/cities');
  };

  if (isLoading || isAPILoading) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;
  if (locationError) return <Message message={locationError} />;  
  
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="yyyy-MM-dd"
        />
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">&#x2713; Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
