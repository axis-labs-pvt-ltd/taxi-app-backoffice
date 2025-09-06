import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { FiArrowRight } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icons?: "none" | "left" | "right"; // Custom icons prop
  url?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  icons,
  children,
  url,
  onClick,
  disabled,
  width,
  ...props
}) => {
  const navigation = useNavigate();
  return (
    <button
      className={`${buttonVariants({
        variant,
        size,
        icons,
        isDisabled: disabled,
      })} ${width} flex justify-center items-center`}
      onClick={(e) => {
        if (url) {
          navigation(url);
        }
        if (onClick) {
          onClick(e);
        }
      }}
      disabled={disabled}
      {...props}
    >
      {icons === "left" && <LuPlus size={18} />} {/* Icon on the left */}
      {children}
      {icons === "right" && <FiArrowRight size={18} />}{" "}
      {/* Icon on the right */}
    </button>
  );
};

const buttonVariants = cva("flex gap-3 items-center py-2 px-6 rounded-md", {
  variants: {
    variant: {
      primary: "bg-[#EB1F25] text-white hover:bg-red-600",
      secondary: "bg-[#222222] text-white hover:bg-[#181818]",
      line: "bg-white border text-[#222222] hover:bg-[#FCFCFC]",
    },
    size: {
      large: "h-[64px] text-xl font-semibold",
      normal: "h-[56px] text-xl font-semibold",
      medium: "h-[48px] text-md font-semibold",
      small: "h-[40px] text-sm font-semibold",
      extraSmall: "h-[32px] text-sm font-semibold",
    },
    icons: {
      none: "",
      left: "",
      right: "",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "normal",
    icons: "none",
    isDisabled: false,
  },
});

export { Button };
