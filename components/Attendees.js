import React, { useState } from "react";
import { BsSearch, BsDownload } from "react-icons/bs";
import { useTable } from "react-table";
import DisableReg from "./DisableReg";
import { parseJSON } from "../utils/functions";
import ExcelJS from 'exceljs';

const Attendees = ({
  attendees,
  id,
  click,
  setClick,
  disableRegModal,
  setDisableRegModal,
  event,
}) => {
  const [passcode, setPasscode] = useState("");
  const attendeesArray = attendees.map(parseJSON);
  const [attendeeState, setAttendees] = useState(
    attendeesArray.map(attendee => ({
      ...attendee,
      morningPresent: false,
      afternoonPresent: false
    }))
  );

  const data = React.useMemo(() => attendeeState);
  const columns = React.useMemo(
    () => {
      const baseColumns = [
        {
          Header: "Passcode",
          accessor: "id",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Email",
          accessor: "email",
        }
      ];

      if (event.duration === 'full') {
        return [
          {
            Header: "Morning",
            accessor: "morningPresent",
            Cell: ({ row }) => (
              <input
                type="checkbox"
                checked={row.original.morningPresent}
                onChange={() => {
                  const newAttendees = [...attendeeState];
                  newAttendees[row.index].morningPresent = !newAttendees[row.index].morningPresent;
                  setAttendees(newAttendees);
                }}
                className="w-4 h-4 text-[#C07F00] bg-gray-100 border-gray-300 rounded focus:ring-[#C07F00]"
              />
            ),
          },
          {
            Header: "Afternoon",
            accessor: "afternoonPresent",
            Cell: ({ row }) => (
              <input
                type="checkbox"
                checked={row.original.afternoonPresent}
                onChange={() => {
                  const newAttendees = [...attendeeState];
                  newAttendees[row.index].afternoonPresent = !newAttendees[row.index].afternoonPresent;
                  setAttendees(newAttendees);
                }}
                className="w-4 h-4 text-[#C07F00] bg-gray-100 border-gray-300 rounded focus:ring-[#C07F00]"
              />
            ),
          },
          ...baseColumns
        ];
      } else {
        return [
          {
            Header: "Present",
            accessor: "morningPresent",
            Cell: ({ row }) => (
              <input
                type="checkbox"
                checked={row.original.morningPresent}
                onChange={() => {
                  const newAttendees = [...attendeeState];
                  newAttendees[row.index].morningPresent = !newAttendees[row.index].morningPresent;
                  setAttendees(newAttendees);
                }}
                className="w-4 h-4 text-[#C07F00] bg-gray-100 border-gray-300 rounded focus:ring-[#C07F00]"
              />
            ),
          },
          ...baseColumns
        ];
      }
    },
    [attendeeState, event.duration]
  );

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = table;

  const handleSearch = () => {
    const result = attendeesArray.map(attendee => ({
      ...attendee,
      morningPresent: attendeeState.find(a => a.id === attendee.id)?.morningPresent || false,
      afternoonPresent: attendeeState.find(a => a.id === attendee.id)?.afternoonPresent || false
    })).filter((item) => item.id.startsWith(passcode));
    
    if (result.length > 0 && passcode !== "") {
      setAttendees(result);
    }
    if (passcode === "") {
      setAttendees(attendeesArray.map(attendee => ({
        ...attendee,
        morningPresent: attendeeState.find(a => a.id === attendee.id)?.morningPresent || false,
        afternoonPresent: attendeeState.find(a => a.id === attendee.id)?.afternoonPresent || false
      })));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    // Add headers based on event duration
    const columns = [
      { header: 'Passcode', key: 'passcode', width: 20 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 }
    ];

    if (event.duration === 'full') {
      columns.push(
        { header: 'Morning Attendance', key: 'morningAttendance', width: 20 },
        { header: 'Afternoon Attendance', key: 'afternoonAttendance', width: 20 }
      );
    } else {
      columns.push({ header: 'Attendance', key: 'attendance', width: 20 });
    }

    worksheet.columns = columns;

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD4D4D4' }
    };

    // Add data
    attendeeState.forEach(({ id, name, email, morningPresent, afternoonPresent }) => {
      const rowData = {
        passcode: id,
        name,
        email
      };

      if (event.duration === 'full') {
        rowData.morningAttendance = morningPresent ? 'Present' : 'Absent';
        rowData.afternoonAttendance = afternoonPresent ? 'Present' : 'Absent';
      } else {
        rowData.attendance = morningPresent ? 'Present' : 'Absent';
      }

      worksheet.addRow(rowData);
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Create blob and download
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white w-full p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-3xl font-bold md:mb-auto mb-4">List of Attendees</h2>
        <div className="flex gap-4">
          <button
            onClick={downloadExcel}
            className="p-4 text-white rounded-md bg-[#C07F00] flex items-center gap-2"
          >
            <BsDownload /> Download Attendance
          </button>
          {!click && (
            <button
              className={`p-4 ${
                click && "hidden"
              } text-white rounded-md bg-[#C07F00]`}
              onClick={() => setDisableRegModal(true)}
            >
              Disable Registration
            </button>
          )}
        </div>
      </div>
      {disableRegModal && (
        <DisableReg
          setDisableRegModal={setDisableRegModal}
          setClick={setClick}
          id={id}
        />
      )}

      <form
        className="w-full flex items-center justify-center mb-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border-[1px] w-[80%] rounded-lg py-2 px-4 mr-3"
          placeholder="Search via Passcode"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            handleSearch();
          }}
        />
        <button className="border-[1px] p-3 rounded-full">
          <BsSearch className="text-2xl" />
        </button>
      </form>
      <div className="overflow-y-scroll max-h-[450px]">
        <table className="relative" {...getTableProps()}>
          <thead className="sticky top-0 bg-white z-10">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendees;