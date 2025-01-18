import React from "react";

import Button from "../Button";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange = () => {},
  data = [],
}) => {
  return (
    <div className="pagination">
      <Button
        label="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || data.length === 0}
        aria-label="Click here to move to previous page"
      />
      {data.length !== 0 && (
        <span>
          Page {currentPage} of {totalPages}
        </span>
      )}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || data.length === 0}
        label="Next"
        aria-label="Click here to move to next page"
      />
    </div>
  );
};

export default Pagination;
