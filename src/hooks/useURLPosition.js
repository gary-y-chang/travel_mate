import { useSearchParams } from "react-router";

export function useURLPosition() { 
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
    
  return lat && lng ? [lat, lng] : null;
}