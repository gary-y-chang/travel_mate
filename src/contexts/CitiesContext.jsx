/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "./AuthContext";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "API/LOADING":
      return { ...state, isLoading: true };
    case "CITIES/LOADED":
      return { ...state, 
              cities: action.payload, 
              isLoading: false 
             };
    case "CITY/LOADED":
      return { ...state, 
              currentCity: action.payload, 
              isLoading: false 
             };         
    case "CITY/ADDED":
      return {...state, 
              cities: [...state.cities, action.payload], 
              currentCity: action.payload,
              isLoading: false
            };

      case "CITY/DELETED":
      return {...state,
              cities: state.cities.filter((city) => city.id !== action.payload),
              isLoading: false,
              currentCity: state.currentCity.id === action.payload ? {} : state.currentCity
             };
    case "API/ERROR":
      return { ...state,
              isLoading: false,
              error: action.payload 
             };
    default:
      throw new Error("Unknown action type");
  }
}

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function CitiesProvider({ children}) {
  const { user } = useAuth();
  const [{cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({type: "API/LOADING"});
       
        // const response = await fetch('http://localhost:8000/cities');
        // const data = await response.json();
        const { data, error } = await supabase.from("City").select().eq("userId", user.id);
        if (error) throw error
        console.log(data);
        
        dispatch({type: "CITIES/LOADED", payload: data});
        // setCities(data);
        // setIsLoading(false);
        // console.log("isAuthenticated: ", isAuthenticated);
      } catch (error) {
        console.error("Error fetching cities:", error);
        dispatch({type: "API/ERROR", payload: "Error fetching cities."});
      }
    }

    if (!user) return; // if user is not logged in, do nothing. Otherwise, fetchCities();

    fetchCities();
  }, [user]);

  async function getCityData(id) {
    // fetch city data from backend
    if (Number(id) === currentCity.id) return; // if the city is already the current city, do nothing
    try{
    dispatch({type: "API/LOADING"});
    // const res = await fetch(`http://localhost:8000/cities/${id}`);
    // const data = await res.json();
    // console.log(data);
    const { data, error } = await supabase.from('City').select().eq('id', id)
    if (error) throw error
    
    console.log(data[0])
    dispatch({type: "CITY/LOADED", payload: data[0]});
    // setCurrentCity(data);
    } catch (error) {
    console.error("Error fetching city data:", error);
    dispatch({type: "API/ERROR", payload: "Error fetching city data"});
    }
  }

  async function createCityData(newCity) {
    try{
      dispatch({type: "API/LOADING"});
      // const res = await fetch(`http://localhost:8000/cities`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newCity),
      // });
      // const data = await res.json();
      const { data, error } = await supabase.from('City').insert({...newCity, userId: user.id}).select();
      if (error) throw error

      console.log(data);
      dispatch({type: "CITY/ADDED", payload: data[0]});
    } catch (error) {
      console.error("Error creating city data:", error);
      dispatch({type: "API/ERROR", payload: "Error creating city data"});
    } 
  }

  async function deleteCityData(id) {
    try{
      dispatch({type: "API/LOADING"});
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: 'DELETE'
      });
   
      dispatch({type: "CITY/DELETED", payload: id});

    } catch (error) {
      console.error("Error deleting city data:", error);
      dispatch({type: "API/ERROR", payload: "Error deleting city data"});
    } 
  }

  return (
    <CitiesContext.Provider value={{ 
        cities, 
        isLoading, 
        currentCity,
        error,
        getCityData,
        createCityData, 
        deleteCityData
        }}>
      
        {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext); 
    if (context === undefined) {
      throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}

export { useCities, CitiesProvider };