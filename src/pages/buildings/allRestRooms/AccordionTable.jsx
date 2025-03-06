import React from "react";
import DataTable from "react-data-table-component";

const columns = (modalOpenHandler, navigate) => [
  {
    name: "Sensors",
    selector: (row) => (
      <div className="flex items-center">
        {row.icon} {/* This could be an image or icon component */}
        <span className="ml-2">{row.sensor}</span> {/* Sensor name or value */}
      </div>
    ),
  },
  {
    name: "Good",
    selector: (row) => (
      <div>
        <input type="checkbox" className="w-6 h-6" />
      </div>
    ),
  },
  {
    name: "Bad",
    selector: (row) => (
      <div>
        <input type="checkbox" className="w-6 h-6" />
      </div>
    ),
  },
  {
    name: "Excellent",
    selector: (row) => (
      <div>
        <input type="checkbox" className="w-6 h-6" />
      </div>
    ),
  },
  {
    name: "Malfunctioned",
    selector: (row) => (
      <div>
        <input type="checkbox" className="w-6 h-6" />
      </div>
    ),
  },

  {
    name: "",
    selector: (row) => row.progress,
  },
];

const AccordionTable = ({ usersData }) => {
  return (
    <div>
      <div className="mt-5">
        <DataTable
          columns={columns()}
          data={usersData}
          selectableRowsHighlight
          customStyles={tableStyles}
          fixedHeader
        />
      </div>
    </div>
  );
};

export default AccordionTable;

const tableStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 400,
      color: "#696969",
    },
  },
  rows: {
    style: {
      background: "#A449EB0F",
      borderRadius: "6px",
      padding: "35px 0",
      height: "0",
      margin: "10px 0",
      borderBottomWidth: "0 !important",
    },
    highlightOnHoverStyle: {
      padding: "20px", // Padding for newly added rows
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
