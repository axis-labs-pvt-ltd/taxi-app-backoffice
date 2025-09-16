import { ThunkDispatch } from "redux-thunk";
import { AuthActions } from "../../redux/Auth/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../redux/Auth/AuthAction";
import { ReduxActiontypes } from "../../types/Common.types";
import { MainRoutes } from "../../data/route.data";
import { Input } from "../../components/Reusable/Input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import GoogleIcon from "../../assets/Google.png";
import TaxiBgImg from "../../assets/taxi-app_login_bg.avif";

interface IFormInput {
  username: string;
  password: string;
}

type AppDispatch = ThunkDispatch<unknown, unknown, AuthActions>;

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const [isVisible, setIsVisible] = useState(false);

  const [, setAttempts] = useState<number>(() =>
    Number(localStorage.getItem("attempts") || 0)
  );
  const [isLocked, setIsLocked] = useState<boolean>(
    () => localStorage.getItem("isLocked") === "true"
  );
  const [lockCountdown, setLockCountdown] = useState<number>(() =>
    Number(localStorage.getItem("lockCountdown") || 0)
  );

  const onSubmit: SubmitHandler<IFormInput> = (data: {
    username: string;
    password: string;
  }) => {
    toast.info("Logging in...");

    // Add tenantName to data object
    const loginData = { ...data };

    dispatch(login(loginData))
      .then((result) => {
        if (result.type === ReduxActiontypes.ERROR) {
          setAttempts((prevAttempts) => {
            const newAttempts = prevAttempts + 1;
            localStorage.setItem("attempts", newAttempts.toString());
            if (newAttempts >= 5) {
              // Lock the account
              setIsLocked(true);
              setLockCountdown(60);
              localStorage.setItem("isLocked", "true");
              localStorage.setItem("lockCountdown", "60");
              toast.error(
                "Account locked due to too many failed attempts. Please try again later."
              );
            } else {
              toast.error(
                result.error || "Login failed. Please check your credentials."
              );
            }
            return newAttempts;
          });
        } else {
          // Reset attempts on successful login
          setAttempts(0);
          localStorage.setItem("attempts", "0");
          toast.success("Login successful");
        }
      })
      .catch((error) => {
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      });

    reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(MainRoutes.dashboard);
      // Reset attempts on successful login
      setAttempts(0);
      localStorage.setItem("attempts", "0");
    } else {
      navigate(MainRoutes.login);
    }

    if (isLocked) {
      // If account is locked, start countdown
      const countdown = setInterval(() => {
        setLockCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            // Reset after countdown finishes
            setAttempts(0);
            setIsLocked(false);
            localStorage.setItem("attempts", "0");
            localStorage.setItem("isLocked", "false");
            localStorage.setItem("lockCountdown", "0");
            return 0;
          } else {
            const newCountdown = prev - 1;
            localStorage.setItem("lockCountdown", newCountdown.toString());
            return newCountdown;
          }
        });
      }, 1000);

      return () => clearInterval(countdown); // Cleanup on unmount
    }
  }, [isAuthenticated, isLocked, navigate]);

  return (
    <div className="flex justify-between h-full min-h-screen max-sm:flex-col max-sm:px-4 max-sm:py-8">
      {/* Left Column */}
      <div className="flex flex-col justify-center flex-1 py-16">
        <div className="flex flex-col items-center justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="items-center justify-center w-64 max-sm:w-28 object-fill"
          />
          <div className="items-center mt-2">
            <p className="text-sm text-[#494B49] text-center font-medium max-sm:text-xs">
              Welcome to the Bound Bond. Sign in to <br /> access your account.
            </p>
          </div>
          {/* {errorMessage && (
          <div className="text-sm text-red-500 max-sm:text-xs">
            {errorMessage}
          </div>
        )} */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-[60%] mt-4 max-sm:w-full"
          >
            <div className="mt-1">
              <Controller
                name="username"
                disabled={isLocked}
                control={control}
                render={({ field }) => (
                  <Input
                    id="username"
                    type="username"
                    placeholder="User name"
                    required
                    width="w-full"
                    borderColor="border-[#D7D9D0]"
                    error={errors.username?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="relative mt-2">
              <Controller
                name="password"
                disabled={isLocked}
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                    required
                    width="w-full"
                    borderColor="border-[#D7D9D0]"
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
              <div
                className=" absolute right-4 bottom-3 max-sm:bottom-[9px]"
                onClick={() => setIsVisible((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {isVisible ? (
                  <FaRegEye color="#737373" />
                ) : (
                  <FaRegEyeSlash color="#737373" />
                )}
              </div>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                disabled={loading || isLocked}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-[#EB1F25] shadow-sm text-sm font-bold text-white bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-sm:text-xs"
              >
                {loading ? (
                  <>
                    <div v-if="isLoading" className="custom-spinner"></div>
                  </>
                ) : (
                  <p className="text-sm font-bold">
                    {isLocked ? `Locked (${lockCountdown}s)` : "Sign in"}
                  </p>
                )}
              </button>
              {isLocked && (
                <p className="text-red-500 text-xs mt-[5px]">
                  Your account is locked. Try again in {lockCountdown} seconds.
                </p>
              )}
            </div>
          </form>
          <div className="flex items-center justify-between mt-2 w-[60%] max-sm:w-full">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-placeholderColor"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-[#545454] max-sm:text-xs"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm max-sm:text-xs">
              <a href="#" className="font-medium text-[#545454]">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 justify-center mt-6 w-[60%] max-sm:w-full">
            <div className="flex items-center gap-3">
              <div className="border-b-[1px] w-32"></div>
              <p className="text-sm text-[#494B49] font-semibold">
                Or sign in using
              </p>
              <div className="border-b-[1px] w-32"></div>
            </div>
            <button
              type="button"
              className="w-1/2  inline-flex items-center justify-center py-3 px-4 border border-gray-200 rounded-full bg-[#ffffff] shadow-sm text-sm font-medium text-black  hover:bg-gray-50 hover:text-black relative max-sm:w-full max-sm:text-xs"
            >
              Continue with Google
              <div className="absolute p-2 bg-white rounded-full left-2">
                <img src={GoogleIcon} alt="google" className="w-3" />
              </div>
            </button>

            <p className=" text-center text-xs text-[#B6B7B5]">
              Copyright © 2024. All rights reserved. terms & privacy policy.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-center flex-1 max-lg:hidden">
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative md:w-[400px] lg:w-[600px]  items-center justify-center">
              <img
                src={TaxiBgImg}
                alt="signup"
                className="object-fill w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
