import { useNavigate, useSearchParams } from 'react-router';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap, useMapEvent } from 'react-leaflet/hooks';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useEffect, useState } from 'react';
import Button from './Button';
import { useURLPosition } from '../hooks/useURLPosition';

const Map = () => {
    const { cities } = useCities();
    const { position: geoPosition, isLoading: isGeoLoading, getPosition } = useGeolocation();
    const [mapPosition, setMapPosition] = useState([25.0351, 121.5624]); // default to Taipei
    const [lat, lng] = useURLPosition() || [];
    // const [searchParams, setSearchParams] = useSearchParams();
    // const lat = searchParams.get("lat");
    // const lng = searchParams.get("lng");
   
    useEffect(() => {
        if (lat && lng) {
            setMapPosition([lat, lng]);
        }
    }, [lat, lng]);

    useEffect(() => {        
        if (geoPosition) {
            setMapPosition([geoPosition.lat, geoPosition.lng]);
        }
    }, [geoPosition]);

    // useEffect(() => {     
    //     getPosition();
    //     }, []);
  
    return (
        // <div className={styles.mapContainer} onClick={() => navigate("form")}>
        <div className={styles.mapContainer}>
            {!geoPosition && <Button type="position" handleclick={getPosition} >
                {isGeoLoading ? "Loading..." : "Use my location"}
            </Button> }   
            <MapContainer center={mapPosition} zoom={8} scrollWheelZoom={true} className={styles.map}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"/>
                {cities.map(city => (
                    <Marker key={city.id} position={[city.lat, city.lng]}>
                        <Popup>
                            <span>{city.emoji}</span><span>{city.cityName}</span> 
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent('click', (e) => {
        console.log(e);
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    });
    return null;
}

export default Map;
