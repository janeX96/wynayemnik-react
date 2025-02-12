import React, { useState } from "react";
import { ReactTabulator as Tabulator } from "react-tabulator";
import { GET, PATCH } from "../../utilities/Request";
import { owner, user } from "../../resources/urls";
import { toast } from "react-toastify";

const AdministratorAdd = (props) => {
  const [premises, setPremises] = useState([]);
  const [idAdministrator, setIdAdministrator] = useState(-1);
  const [administratorEmail, setAdministratorEmail] = useState("");

  const getData = (id) => {
    const adminId = idAdministrator === -1 ? id : idAdministrator;
    GET(`${owner.administrators.ownAndNot}${adminId}`)
      .then((data) => {
        if (data.error !== undefined) {
          toast.error(data.error);
        } else {
          data.map(
            (e) =>
              (e.administratorActive = e.administratorActive
                ? "Aktywny"
                : "Nieaktywny")
          );
          setPremises(data);
        }
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  };

  const handleAction = async (id) => {
    await PATCH(`${owner.administrators.set}${administratorEmail}/${id}`)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  };

  const handleSubmitAdministrator = (e) => {
    e.preventDefault();

    GET(`${user.userAccountGetByEmail}${administratorEmail}`)
      .then((data) => {
        if (data.error !== undefined) {
          toast.error(data.error);
        } else {
          setIdAdministrator(data);
          getData(data);
        }
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  };

  const columnsPremises = [
    {
      title: "Id",
      field: "premises.premisesId",
    },
    {
      title: "Adres",
      field: "premises.location.locationName",
      headerFilter: "input",
    },
    {
      title: "Numer",
      field: "premises.premisesNumber",
    },
    {
      title: "m2",
      field: "premises.area",
    },
    {
      title: "Poziom",
      field: "premises.premisesLevel",
    },
    {
      title: "Ustaw uprawnienie",
      field: "administratorActive",
      formatter: function (cell, formatterParams) {
        var value = cell.getValue();
        if (value === "Aktywny") {
          return (
            "<span style='color:green; font-weight:bold;'>" + value + "</span>"
          );
        } else
          return (
            "<span style='color:red; font-weight:bold;'>" + value + "</span>"
          );
      },
      cellClick: function (e, cell) {
        handleAction(cell.getRow().getData().premises.premisesId);
      },
    },
  ];

  const renderTableSet = () => {
    return (
      <Tabulator
        className="custom-tabulator"
        columns={columnsPremises}
        data={premises}
        options={{
          debugInvalidOptions: false,
          movableColumns: true,
          movableRows: true,
          pagination: "local",
          paginationSizeSelector: [5, 10, 20, 50],
          paginationSize: 5,
          setFilter: true,
          langs: {
            default: {
              pagination: {
                page_size: "Wyniki na stronie",
                first: "Pierwsza",
                first_title: "Pierwsza",
                last: "Ostatnia",
                last_title: "Ostatnia",
                prev: "Poprzednia",
                prev_title: "Poprzednia",
                next: "Następna",
                next_title: "Następna",
              },
            },
          },
        }}
        layout="fitColumns"
        responsiveLayout="hide"
        tooltips="true"
        addRowPos="top"
        history="true"
        movableColumns="true"
        resizableRows="true"
        initialSort={[
          //set the initial sort order of the data
          { column: "premises.location.locationName", dir: "asc" },
        ]}
      />
    );
  };

  const handleChange = (e) => {
    setAdministratorEmail(e.target.value);
  };

  return (
    <div>
      <h1 className="content-container__title">Dodawanie administratora</h1>

      <div className="form-container">
        <form onSubmit={handleSubmitAdministrator}>
          <div className="form-container__row">
            <div className="row__col-25">
              <label htmlFor="email">Podaj email</label>
            </div>
            <div className="row__col-75">
              <input
                className="form-container__input"
                type="email"
                name="email"
                id="email"
                value={administratorEmail}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-container__buttons">
            {idAdministrator === -1 && (
              <button
                className="details-container__button--return"
                onClick={props.return}
              >
                Powrót
              </button>
            )}
            <button type="submit">Akceptuj</button>
          </div>
        </form>
      </div>
      {idAdministrator > 0 && (
        <>
          <div
            className="table-container"
            style={{ marginTop: "50px", margin: "50px auto" }}
          >
            {renderTableSet()}
            <div className="details-container__buttons">
              <button
                className="details-container__button--return"
                onClick={props.return}
              >
                Powrót
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdministratorAdd;
