import { useEffect } from "react";
import styles from "./City.module.css";
import { useParams, useSearchParams } from "react-router";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams(); // id is from the route /app/cities/:id
  console.log("ciry id: ", id);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { getCityData, currentCity, isLoading } = useCities();

  // const [isLoading, setIsLoading] = useState(false);
  // const [cityData, setCityData] = useState({});
  // const [error, setError] = useState(null);


  const { cityName, emoji, date, notes } = currentCity;


  useEffect(() => {
    async function fetchCityData() {
      await getCityData(id);
    }

    fetchCityData();
    
    // if (cityName){
    //   document.title = `City: ${cityName}`;
    // }

   }, [id]);

  if (isLoading) {
    return <Spinner />;
  } else {
    // change document title
    document.title = `City: ${cityName}`;
  }
  // if (error) return <Message message={`${error}`} />; 
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      <div className={styles.row}>
        <h6>Position: {lat}, {lng}</h6>
      </div>   
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
