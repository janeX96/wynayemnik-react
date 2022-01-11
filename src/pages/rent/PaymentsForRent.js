import { useState, useEffect } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import { admin, client, general, owner } from "../../resources/urls";
import { GET } from "../../utilities/Request";
import LoadData from "../LoadData";
import PaymentForm from "./PaymentForm";

const PaymentsForRent = (props) => {
  const [payments, setPayments] = useState(
    props.payments !== undefined && props.payments
  );
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // const getPayments = () => {
  //   let urlByRole =
  //     props.roles[0] === "owner"
  //       ? owner.rent.payments
  //       : props.roles[0] === "admin"
  //       ? admin.rent.payments
  //       : props.roles[0] === "client"
  //       ? client.rent.payments
  //       : "";
  //   GET(`${urlByRole}${props.rentId}${general.rent.paymentsSuffix}`).then(
  //     (res) => {
  //       setPayments(res);
  //     }
  //   );
  // };

  const handleReturn = () => {
    setShowPaymentForm(false);
    props.reloadPayments();
  };

  const columns = [
    {
      Header: "Id",
      accessor: "paymentId",
    },
    {
      Header: "numberPayment",
      accessor: "numberPayment",
    },
    {
      Header: "status",
      accessor: "ISSUED",
    },
    {
      Header: "paymentType",
      accessor: "paymentType.name",
    },
    {
      Header: "startDate",
      accessor: "startDate",
    },
    {
      Header: "paymentDate",
      accessor: "paymentDate",
    },
    {
      Header: "paidDate",
      accessor: "paidDate",
    },
    {
      Header: "income",
      accessor: "income",
    },
    {
      Header: "Akcja",
      accessor: "action",
      //   Cell: ({ cell }) => (
      //     <button
      //       className="content-container__button"
      //       value={cell.row.values.actions}
      //       onClick={() => handleAction(cell.row.values.premisesId)}
      //     >
      //       Szczegóły
      //     </button>
      //   ),
    },
  ];
  const initialState = { pageSize: 5, hiddenColumns: "paymentId" };

  return (
    <>
      {showPaymentForm ? (
        <PaymentForm
          handleReturn={handleReturn}
          rentId={props.rentId}
          roles={props.roles}
        />
      ) : (
        <>
          <h1 className="content-container__title">Płatności</h1>
          <div>
            <div className="icon-container">
              <BsPlusSquareFill
                className="icon-container__new-icon"
                onClick={() => setShowPaymentForm(true)}
              />
            </div>
          </div>
          {props.payments !== null &&
          props.payments !== undefined &&
          props.payments.length > 0 ? (
            <LoadData
              data={payments}
              columns={columns}
              initialState={initialState}
            />
          ) : (
            "brak"
          )}
          <div>
            <button
              className="content-container__button"
              onClick={() => props.handleReturn()}
            >
              Powrót
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentsForRent;
