import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Homepage from "./pages/Homepage"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import City from "./components/City"
import CountryList from "./components/CountryList"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext"   
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Change to false to test redirection to login page
  
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
            {/* { !isAuthenticated && <Route index element={<Navigate to="login" replace />} /> } */}
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
          
            <Route path="app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
              }>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList/>} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList/>} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  )
}

export default App
