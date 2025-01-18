import React, { useState, useEffect } from "react";

import Table from "../Table";
import Pagination from "../Pagination";
import Filter from "../Filter";
import { exportToCSV } from "../../utils/exportAsCsv";
import Loader from "../Loader";
import "./DataTable.css";

const RECORDS_PER_PAGE = 5;

const DataTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [percentageFilter, setPercentageFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setData(sortedData);
  };

  const filteredData = data.filter((project) => {
    const matchesSearch =
      project["percentage.funded"].toString().includes(searchQuery) ||
      project["amt.pledged"].toString().includes(searchQuery) ||
      project.currency.toString().includes(searchQuery.toLowerCase());

    const matchesPercentage =
      percentageFilter === "all" ||
      (percentageFilter === "low" && project["percentage.funded"] < 50) ||
      (percentageFilter === "medium" &&
        project["percentage.funded"] >= 50 &&
        project["percentage.funded"] <= 100) ||
      (percentageFilter === "high" && project["percentage.funded"] > 100);

    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "low" && project["amt.pledged"] < 10000) ||
      (amountFilter === "medium" &&
        project["amt.pledged"] >= 10000 &&
        project["amt.pledged"] <= 50000) ||
      (amountFilter === "high" && project["amt.pledged"] > 50000);

    return matchesSearch && matchesPercentage && matchesAmount;
  });

  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    if (filteredData.length === 0) {
      alert("No data to export!");
      return;
    }
    exportToCSV(filteredData, "filtered_data");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h1 className="title">Kickstarter Projects</h1>
      <div className="query">
        <input
          type="text"
          placeholder="Search by Percentage or Amoun or by currency"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search projects by percentage funded or amount pledged"
        />
      </div>
      <Filter
        percentageFilter={percentageFilter}
        amountFilter={amountFilter}
        setPercentageFilter={setPercentageFilter}
        setAmountFilter={setAmountFilter}
        handleExport={handleExport}
      />
      <Table
        data={currentRecords}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        data={currentRecords}
      />
    </div>
  );
};

export default DataTable;
