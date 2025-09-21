import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ResetPasswordType, UsersDataType } from "../../types/Users.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/Users.schema";
import { Input } from "../Reusable/Input";
import { Button } from "../Reusable/Button";

interface ResetPasswordProps {
  setIsResetPasswordOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetPassword: (data: ResetPasswordType, id: string) => Promise<void>;
  editingUser: UsersDataType | undefined;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  setIsResetPasswordOpen,
  handleResetPassword,
  editingUser,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "" },
  });

  const handleFormSubmit = (data: ResetPasswordType) => {
    handleResetPassword(data, editingUser?.id ?? ""); // update mode
    setIsResetPasswordOpen(false);
    reset();
  };

  const handleError = (errors: Record<string, unknown>) => {
    console.log("Validation Errors:", errors);
    console.log("Current Form Data:", getValues());
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => {
          setIsResetPasswordOpen(false);
        }}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => {
          setIsResetPasswordOpen(false);
        }}
      >
        <div
          className="w-[850px] h-[330px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                Reset Password
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit, handleError)}
              className="mt-5 space-y-8"
            >
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="New Password"
                    mandotary
                    placeholder="New password"
                    error={errors["newPassword"]?.message}
                    width="w-full"
                  />
                )}
              />

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Reset Password"
                  variant="primary"
                  size="small"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
