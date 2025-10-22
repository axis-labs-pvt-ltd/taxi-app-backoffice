// GoogleProvider.tsx
import React from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

const GoogleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY, // or process.env.REACT_APP_GOOGLE_MAPS_KEY
    libraries,
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return <>{children}</>;
};

export default GoogleProvider;
