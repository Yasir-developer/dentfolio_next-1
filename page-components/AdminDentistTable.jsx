import BlueButtons from "@/components/Buttons/BlueButtons";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useTable } from "react-table";

const AdminDentistTable = ({ columns, data }) => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  const thankYouModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 ">
        <div className="bg-white p py-10 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative max-w-[600px]">
          {/* <button
            className="absolute right-[20px] top-[20px]  "
            onClick={() => setShowThankYouModal(false)}
          >
            <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
          </button> */}
          {/* <div className="flex items-center justify-center mt-[50px] ">
            <Image src={checkCircle} alt="logo" />
          </div> */}
          <div className="w-[100%] flex flex-col items-center justify-center">
            <h1 className="text-custom-blue text-center text-[39px] font-normal mt-2">
              Delete this Dentist?
            </h1>

            <p className="text-custom-black text-center text-[16px] font-normal mt-2 mb-[50px] w-[70%]">
              Are you sure you want to delete this client? It can't be undo
            </p>
          </div>

          <div className="flex flex-row items-center justify-center">
            <BlueButtons
              className={
                "border border-custom-blue bg-transparent !text-custom-blue mx-3 font-medium"
              }
              buttonText={"CANCEL"}
              onClick={() => setShowThankYouModal(false)}
            />
            <BlueButtons
              buttonText={"Delete"}
              onClick={() => setShowThankYouModal(false)}
            />
          </div>
          {/* Form fields and buttons */}
        </div>
      </div>
    );
  };
  return (
    <>
      {showThankYouModal && thankYouModal()}
      <div className="lg:max-w-full max-w-[375px] overflow-x-scroll">
        <table
          {...getTableProps()}
          className="mx-auto border-b-1 bordert-t-1 border-b-[#EFF2F7] w-[100%] items-center justify-center "
        >
          <thead className="">
            {headerGroups.map((headerGroup, i) => (
              <tr
                key={i}
                {...headerGroup.getHeaderGroupProps()}
                className="border-b border-t border-t-[#EFF2F7] border-b-[#EFF2F7]"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="p-3 font-semibold text-[13px] text-left"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  // className="p-3"
                  key={i}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className={`border-b border-b-[#EFF2F7] text-[13px] p-3 font-normal
                    ${cell.column.id === "action" ? "px-5" : "px-3"}
                    `}
                      >
                        {cell.column.id === "id" ? (
                          <span className="font-medium">
                            {cell.render("Cell")}
                          </span>
                        ) : cell.column.id === "subscription" ? (
                          <p
                            style={{
                              backgroundColor: getStatusColor(cell.value),
                              //   paddingRight: "35px",
                              //   paddingLeft: "35px",

                              color: getStatusTextColor(cell.value),
                              fontWeight: "500",
                              padding: "5px",
                              textAlign: "center",
                              // width: "40%",
                              //   padding: "15px",
                              borderRadius: "7px",
                            }}
                            className="lg:w-[40%] w-[90%]"
                          >
                            {cell.render("Cell")}
                          </p>
                        ) : cell.column.id === "action" ? (
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setShowThankYouModal(true);
                            }}
                          >
                            {cell.render("Cell")}
                          </div>
                        ) : cell.column.id === "status" ? (
                          <p
                            style={{
                              backgroundColor: getRevenueStatusColor(
                                cell.value
                              ),
                              //   paddingRight: "35px",
                              //   paddingLeft: "35px",

                              color: getRevenueStatusTextColor(cell.value),
                              fontWeight: "500",
                              // paddingLeft: "10px",
                              // paddingRight: "10px",

                              padding: "5px",
                              textAlign: "center",
                              // width: "60%",
                              //   padding: "15px",
                              borderRadius: "7px",
                            }}
                            className="lg:w-[60%] w-[100%]"
                          >
                            {cell.render("Cell")}
                          </p>
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
  // Table component logic and UI come here
};

const getStatusColor = (status) => {
  switch (status) {
    case "Trial":
      return "#0682FF2E";
    case "Premium":
      return "#34C38F2E";
  }
};

const getRevenueStatusColor = (status) => {
  switch (status) {
    case "Non Active":
      return "#0682FF2E";
    case "Active":
      return "#34C38F2E";
  }
};

const getRevenueStatusTextColor = (status) => {
  switch (status) {
    case "Non Active":
      return "#0372E2";
    case "Active":
      return "#34C38F";
  }
};
const getStatusTextColor = (status) => {
  switch (status) {
    case "Trial":
      return "#0372E2";
    case "Premium":
      return "#34C38F";
  }
};
export default AdminDentistTable;
