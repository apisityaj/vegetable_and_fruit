"use client";

import React, { useEffect, useState } from "react";
import MemberListTable from "@/app/_component/member/member-list-table";
import Pagination from "@/app/_component/paginations/pagination";
import { User } from "@/app/_type/type";

const Member: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setUsers(data?.users || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const applyPagination = (
    products: User[],
    page: number,
    rowsPerPage: number
  ) => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const paginatedUsers = applyPagination(
    users,
    currentPage,
    rowsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="border rounded-md shadow-xl p-5">
      <div className="text-2xl font-bold mt-2 mb-5">Member List</div>
      <div className="relative overflow-x-auto">
        <MemberListTable paginatedUsers={paginatedUsers} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / rowsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Member;
