import React from "react";
import "./Table.css";

const Table = ({ data, onSort = () => {}, sortConfig }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th onClick={() => onSort("percentage.funded")}>
            Percentage Funded {getSortIndicator("percentage.funded")}
          </th>
          <th onClick={() => onSort("amt.pledged")}>
            Amount Pledged {getSortIndicator("amt.pledged")}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((project) => (
            <tr key={project["s.no"]}>
              <td>{project["s.no"]}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>
                {project.currency.toUpperCase()}{" "}
                {project["amt.pledged"].toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
