import { createContext , useContext, useReducer} from "react";
import { createClient } from "@supabase/supabase-js";
import Login from "../pages/Login";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "USER/LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };    
    case "USER/LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case "USER/LOGIN_FAILURE":
      return { ...state, 
              isLoading: false,
              error: action.payload
             };  
    case "API/LOADING":
      return { ...state, isLoading: true };  
    case "API/ERROR":
      return { ...state,
              isLoading: false,
              error: action.payload 
             };  
    default:
      throw new Error("Unknown action type") ;     
    }
  }

// const USER = {
//     id: 1,
//     name: "John Doe",
//     email: "jack@example.com",
//     password: "qwerty",
//     avatar: "https://i.pravatar.cc/100?u=zz",
//   };

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function AuthProvider({ children }) {


  const [{user, isAuthenticated, isLoading, error}, dispatch] = useReducer(reducer, initialState);

  async function login(email, password) {
    // login logic here (e.g., API call)
    try{
        dispatch({type: "API/LOADING"});
        // const res = await fetch(`http://localhost:8000/users?email=${email}&password=${password}`);
        // const data = await res.json();
        
        const { data, error } = await supabase.from("User").select().match({email: email, password: password});
        if (error) throw error

        if (data.length === 0) {
            dispatch({type: "USER/LOGIN_FAILURE", payload: "Invalid email or password"});
            return;
        }

        console.log(data[0]);
        dispatch({type: "USER/LOGIN", payload: data[0]});

    }catch(error){
        console.error("Error logging in:", error);
        dispatch({type: "API/ERROR", payload: "Error fetching user data"});
    }
  }

  function logout() {
    // logout logic here (e.g., API call)
    dispatch({type: "API/LOADING"});
    
    //pretend delay
    setTimeout(() => {
       dispatch({type: "USER/LOGOUT"});
    }, 3000);
   
  }

  return <AuthContext.Provider value={{ 
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout }}>
            
            {children}
        </AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { useAuth, AuthProvider };