import React from "react";
import "./Filter.css";
import Button from "../Button";

const Filter = ({
  percentageFilter,
  amountFilter,
  setPercentageFilter = () => {},
  setAmountFilter = () => {},
  handleExport = () => {},
}) => {
  return (
    <>
      <p>Filters:</p>
      <div className="filters">
        <select
          className="filter"
          value={percentageFilter}
          onChange={(e) => setPercentageFilter(e.target.value)}
        >
          <option value="all">All Percentages</option>
          <option value="low">Below 50%</option>
          <option value="medium">50% - 100%</option>
          <option value="high">Above 100%</option>
        </select>
        <select
          className="filter"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
        >
          <option value="all">All Amounts</option>
          <option value="low">Below 10,000</option>
          <option value="medium">10,000 - $50,000</option>
          <option value="high">Above 50,000</option>
        </select>
        <Button
          label="Export"
          onClick={handleExport}
          className="export-button"
          aria-label="Export filtered data as a CSV file"
        />
      </div>
    </>
  );
};

export default Filter;
