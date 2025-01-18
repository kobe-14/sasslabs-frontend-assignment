export const exportToCSV = (data, filename) => {
  const csvRows = [];

  // Extract headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // Extract rows
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '""'); // Escape quotes
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  // Create a Blob and trigger download
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
