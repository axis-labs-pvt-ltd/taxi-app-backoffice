import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import { UsersDataType } from "../../types/Users.types";
import { Button } from "../Reusable/Button";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, editUserSchema } from "../../schemas/Users.schema";

const roles = ["admin"];

interface AddUserProps {
  setIsAddUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: UsersDataType | undefined;
  onSubmit: (data: UsersDataType, id?: string) => void;
}

const AddUser: React.FC<AddUserProps> = ({
  setIsAddUserOpen,
  initialData,
  onSubmit,
}) => {
  // pick schema depending on add vs edit
  const schema = initialData ? editUserSchema : createUserSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UsersDataType>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: UsersDataType) => {
    const payload = {
      ...data,
    };
    if (initialData?.id) {
      onSubmit(payload, initialData.id); // update mode
    } else {
      onSubmit(data); // add mode
    }
    setIsAddUserOpen(false);
    reset();
  };

  const roleOptions =
    roles?.map((role) => ({
      value: role,
      label: role,
    })) ?? [];

  const handleError = (errors: Record<string, unknown>) => {
    console.log("Validation Errors:", errors);
    console.log("Current Form Data:", getValues());
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => {
          setIsAddUserOpen(false);
        }}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => {
          setIsAddUserOpen(false);
        }}
      >
        <div
          className="w-[850px] h-[630px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                {initialData ? "Edit User" : "Add User"}
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit, handleError)}
              className="mt-5 space-y-8"
            >
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="First Name"
                    mandotary
                    placeholder="First name"
                    error={errors["firstName"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    mandotary
                    placeholder="Last name"
                    error={errors["lastName"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Username"
                    mandotary
                    placeholder="Username"
                    error={errors["username"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    mandotary
                    placeholder="Email"
                    error={errors["email"]?.message}
                    width="w-full"
                  />
                )}
              />

              {/* Password field — still rendered, but validation depends on schema */}
              {!initialData && (
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Password"
                      mandotary={!initialData} // visually show required only in add mode
                      placeholder="Password"
                      error={errors["password"]?.message}
                      width="w-full"
                    />
                  )}
                />
              )}

              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Role
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={roleOptions}
                          placeholder="Select the role"
                          value={
                            roleOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          }
                          isClearable
                          className="capitalize"
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children={initialData ? "Update User" : "Add User"}
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

export default AddUser;
