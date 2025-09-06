import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "../components/Reusable/Input";

type Props = {
  placeholder?: string;
  text?: string;
};

const useSearch = ({
  placeholder = "Search for products",
}: // text = "Search for products",
Props) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const SearchInput = (
    <div className="flex justify-center items-center gap-4">
      {/* <p>{text}</p>{" "} */}
      <Input
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder={placeholder}
        inputPrefix={<FaSearch className="text-black/30" />}
      />
    </div>
  );

  return { SearchInput, searchKey, setSearchKey };
};

export default useSearch;
