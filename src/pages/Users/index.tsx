import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import { UsersDataType } from "../../types/Users.types";
import useUsers from "../../hooks/useUsers";
import AddUser from "../../components/Users/AddUser";
import ResetPassword from "../../components/Users/ResetPassword";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

const Users = () => {
  const headers: TableHeaderType<UsersDataType>[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: null,
      label: "Actions",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1">
              <CiMenuKebab className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => {
                setEditingUser(row); // Set selected brand for editing
                setIsAddUserOpen(true);
              }}
            >
              Edit User
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => {
                setEditingUser(row); // Set selected brand for editing
                setIsResetPasswordOpen(true);
              }}
            >
              Reset Password
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => {
                setEditingUser(row);
                setIsDeleteUserOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const {
    currentPage,
    usersPaginated,
    SearchInput,
    isAddUserOpen,
    setIsAddUserOpen,
    editingUser,
    setEditingUser,
    isDeleteUserOpen,
    setIsDeleteUserOpen,
    onSubmit,
    isResetPasswordOpen,
    setIsResetPasswordOpen,
    handleResetPassword,
    handleDeleteUser,
    deleteUserSuccess,
  } = useUsers();

  return (
    <div>
      <SubHeader
        topic="Users"
        subline="Add, view and edit your users in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Users"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingUser(undefined); // Reset for adding new brand
              setIsAddUserOpen(true);
            }}
          />
        </div>
        <TableNew<UsersDataType>
          headers={headers}
          data={usersPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={usersPaginated.loading}
          currentPage={currentPage}
          totalPages={usersPaginated.data?.totalPages}
          type="users"
        />
      </div>
      {isAddUserOpen && (
        <AddUser
          setIsAddUserOpen={setIsAddUserOpen}
          initialData={editingUser}
          onSubmit={onSubmit}
        />
      )}

      {isResetPasswordOpen && (
        <ResetPassword
          setIsResetPasswordOpen={setIsResetPasswordOpen}
          handleResetPassword={handleResetPassword}
          editingUser={editingUser}
        />
      )}

      {isDeleteUserOpen && editingUser && (
        <DeleteDialog
          title="User"
          setIsDialogOpen={setIsDeleteUserOpen}
          userToBeDelete={editingUser}
          buttonTitle="Delete User"
          handleDelete={handleDeleteUser}
          item="user"
          loading={deleteUserSuccess.loading}
        />
      )}
    </div>
  );
};

export default Users;
