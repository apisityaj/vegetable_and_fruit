import React from "react";
import Link from "next/link";
import { PaginationProps } from "@/app/_type/type";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => onPageChange(i)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              i === currentPage
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 bg-white"
            } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav className="mt-2 flex justify-end" aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
              currentPage === 1 ? "text-gray-500" : "text-gray-500"
            } bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === totalPages ? "text-gray-500" : "text-gray-500"
            } border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
