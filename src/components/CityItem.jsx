import React from 'react';
import { Link } from 'react-router';
import styles from './CityItem.module.css';
import Button from './Button';
import Spinner from './Spinner';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({city}) => {
    // console.log(city);
    const { currentCity, deleteCityData, isLoading } = useCities();
    const { cityName, emoji, date, id, lat, lng } = city;

    function handleClick(e) {
        e.preventDefault();
        console.log(`click to delete city id ${id}`);
        deleteCityData(id);
      }

    if (isLoading) return <Spinner />;
      
    return (
      <> 
        <Link className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ''}`} 
          to={`${id}?lat=${lat}&lng=${lng}`}> {/* this would attach city it to current url, which is /app/cities/{id} */}
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3> 
            <time className={styles.date}>{formatDate(date || null)}</time>
            <button className={styles.deleteBtn} title="Delete" onClick={handleClick}>&times;</button>
            {/* <Button onclick={() => console.log('delete') } type={'back'}>&times;Delete</Button>  */}
        </Link>
      </>
    );
}

export default CityItem;
