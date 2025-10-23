import { Autocomplete } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

interface LocationSearchProps {
  placeholder: string;
  icon: React.ReactNode;
  value?: string; // <-- add this
  onSelect: (coords: { lat: number; lng: number; name: string }) => void;
}

const LocationSearch = ({
  placeholder,
  icon,
  value,
  onSelect,
}: LocationSearchProps) => {
  const autoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value || ""); // controlled input

  // Keep input in sync when value changes externally (edit mode)
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autoRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autoRef.current) {
      const place = autoRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();
        const name = place.formatted_address || place.name || placeholder;

        if (lat && lng) {
          setInputValue(name); // update displayed text
          onSelect({ lat, lng, name });
        }
      }
    }
  };

  return (
    <div className="flex-1 flex gap-2 items-center justify-between border border-[#A6A6A6] p-2 rounded-md relative w-fit max-md:w-full">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue} // controlled input value
          onChange={(e) => setInputValue(e.target.value)} // allow manual typing
          className="w-fit max-md:w-full outline-none text-sm"
        />
      </Autocomplete>
      {icon}
    </div>
  );
};

export default LocationSearch;
