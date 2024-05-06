import React from "react";
import { User } from "@/app/_type/type";
import { MemberTableProps } from "@/app/_type/type";

const headCells = [
  { id: "1", label: "ID" },
  { id: "2", label: "First Name" },
  { id: "3", label: "Last Name" },
  { id: "4", label: "Email" },
  { id: "5", label: "Phone" },
  { id: "6", label: "Company" },
  { id: "7", label: "Lat/Long" },
];

const MemberListTable: React.FC<MemberTableProps> = ({ paginatedUsers }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headCells.map((item) => (
            <th
              key={item.id}
              scope="col"
              className="px-6 py-3 text-left border-b border-gray-200 dark:border-gray-700"
            >
              {item?.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {paginatedUsers.map((user) => (
          <tr key={user?.id}>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.firstName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.company?.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
              {user?.address?.coordinates?.lat}{" "}
              {user?.address?.coordinates?.lng}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberListTable;
