// import { useFieldArray, Controller } from "react-hook-form";
// import { IoIosRemoveCircle } from "react-icons/io";
// import { FaPlus } from "react-icons/fa";
// import LocationSearch from "../Reusable/LocationSearch";
// import GoogleProvider from "../Reusable/GoogleProvider";

// const DropPointsSection = ({
//   control,
//   dayIndex,
// }: {
//   control: any;
//   dayIndex: number;
// }) => {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `itinerary.${dayIndex}.dropPoints`,
//   });

//   return (
//     <div className="mt-4">
//       <div className="flex justify-between items-center mb-2">
//         <p className="font-medium">Locations to Visit</p>
//         <button
//           type="button"
//           onClick={() =>
//             append({
//               id: Date.now(),
//               index: fields.length,
//               name: "",
//               lat: 0,
//               lng: 0,
//             })
//           }
//           className="flex items-center gap-1 text-blue-600 text-sm"
//         >
//           <FaPlus className="w-4 h-4" /> Add Location
//         </button>
//       </div>

//       {fields.map((point, pointIndex) => (
//         <div key={point.id} className="flex items-center gap-2 mb-3">
//           <Controller
//             control={control}
//             name={`itinerary.${dayIndex}.dropPoints.${pointIndex}.name`}
//             render={({ field }) => (
//               <GoogleProvider>
//                 <LocationSearch
//                   placeholder={`Location ${pointIndex + 1}`}
//                   value={field.value} // <-- add this line
//                   icon={
//                     <IoIosRemoveCircle
//                       className="w-5 h-5 text-red-600 cursor-pointer"
//                       onClick={() => remove(pointIndex)}
//                     />
//                   }
//                   onSelect={(coords) => {
//                     field.onChange(coords.name);
//                     control.setValue(
//                       `itinerary.${dayIndex}.dropPoints.${pointIndex}.lat`,
//                       coords.lat
//                     );
//                     control.setValue(
//                       `itinerary.${dayIndex}.dropPoints.${pointIndex}.lng`,
//                       coords.lng
//                     );
//                   }}
//                 />
//               </GoogleProvider>
//             )}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DropPointsSection;

import { useFieldArray, Controller } from "react-hook-form";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import LocationSearch from "../Reusable/LocationSearch";
import GoogleProvider from "../Reusable/GoogleProvider";

const DropPointsSection = ({
  control,
  dayIndex,
}: {
  control: any;
  dayIndex: number;
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `itinerary.${dayIndex}.dropPoints`,
  });

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium">Locations to Visit</p>
        <button
          type="button"
          onClick={() =>
            append({
              id: Date.now(),
              index: fields.length,
              name: "",
              lat: 0,
              lng: 0,
            })
          }
          className="flex items-center gap-1 text-blue-600 text-sm"
        >
          <FaPlus className="w-4 h-4" /> Add Location
        </button>
      </div>

      {fields.map((point, pointIndex) => (
        <div key={point.id} className="flex items-center gap-2 mb-3">
          <Controller
            control={control}
            name={`itinerary.${dayIndex}.dropPoints.${pointIndex}.name`}
            render={({ field }) => (
              <GoogleProvider>
                <LocationSearch
                  placeholder={`Location ${pointIndex + 1}`}
                  value={field.value}
                  icon={
                    <IoIosRemoveCircle
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={() => remove(pointIndex)}
                    />
                  }
                  onSelect={(coords) => {
                    update(pointIndex, {
                      ...point,
                      id: typeof point.id === "number" ? point.id : Date.now(), // force number
                      name: coords.name,
                      lat: coords.lat,
                      lng: coords.lng,
                    });
                  }}
                />
              </GoogleProvider>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default DropPointsSection;
