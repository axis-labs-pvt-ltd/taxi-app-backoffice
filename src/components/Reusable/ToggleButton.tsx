import React, { useEffect, useState } from "react";

interface ToggleButtonProps {
  isButtonActive: boolean;
  onToggle: (newState: boolean) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isButtonActive,
  onToggle,
  disabled = false,
  type = "button",
}) => {
  const [isActive, setIsActive] = useState(isButtonActive);

  useEffect(() => {
    setIsActive(isButtonActive);
  }, [isButtonActive]);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <button
      type={type}
      onClick={handleToggle}
      disabled={disabled}
      className={`transition-colors duration-300 ease-in-out w-12 p-1 rounded-full text-white relative
        ${isActive ? "bg-[#F30E0A]" : "bg-[#D4D4DE]"}
        ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      <div
        className={`flex w-4 h-4 rounded-full bg-white transition-transform duration-300
          ${isActive ? "translate-x-[25px]" : ""}
          `}
      ></div>
    </button>
  );
};

export { ToggleButton };
