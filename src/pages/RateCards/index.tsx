import SubHeader from "../../components/SubHeader";
import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import { RateCardsType } from "../../types/RateCards.types";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import useRateCards from "../../hooks/useRateCards";
import AddRateCard from "../../components/RateCards/AddRateCard";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

const RateCards = () => {
  const headers: TableHeaderType<RateCardsType>[] = [
    { key: "name", label: "Name" },
    { key: "includedKmPerDay", label: "Kms Per Day" },
    {
      key: "currency",
      label: "Currency",
    },
    {
      key: "dailyRate",
      label: "Daily Rate",
      render: (row) => <p>Rs. {row.dailyRate}</p>,
    },
    {
      key: "extraKmRate",
      label: "Rate Per Extra Km",
      render: (row) => <p>Rs. {row.extraKmRate}</p>,
    },
    {
      key: null,
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-5">
          <FaRegEdit
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingRateCard(row); // Set selected brand for editing
              setIsAddRateCardOpen(true); // Open modal
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingRateCard(row);
              setIsDeleteRateCardOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const {
    rateCardsPaginated,
    SearchInput,
    currentPage,
    isAddRateCardOpen,
    setIsAddRateCardOpen,
    editingRateCard,
    setEditingRateCard,
    onSubmit,
    isDeleteRateCardOpen,
    setIsDeleteRateCardOpen,
    handleDeleteRateCard,
    deleteRateCardSuccess,
  } = useRateCards();

  return (
    <div>
      <SubHeader
        topic="Rate Cards"
        subline="Add, view and edit your rate cards in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Rate Card"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingRateCard(undefined); // Reset for adding new brand
              setIsAddRateCardOpen(true);
            }}
          />
        </div>
        <TableNew<RateCardsType>
          headers={headers}
          data={rateCardsPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={rateCardsPaginated.loading}
          currentPage={currentPage}
          totalPages={rateCardsPaginated.data?.totalPages}
          type="rateCards"
        />
      </div>
      {isAddRateCardOpen && (
        <AddRateCard
          setIsAddRateCardOpen={setIsAddRateCardOpen}
          initialData={editingRateCard}
          onSubmit={onSubmit}
        />
      )}

      {isDeleteRateCardOpen && editingRateCard && (
        <DeleteDialog
          title="Rate Card"
          setIsDialogOpen={setIsDeleteRateCardOpen}
          rateCardToBeDelete={editingRateCard}
          buttonTitle="Delete Rate Card"
          handleDelete={handleDeleteRateCard}
          item="rate card"
          loading={deleteRateCardSuccess.loading}
        />
      )}
    </div>
  );
};

export default RateCards;
