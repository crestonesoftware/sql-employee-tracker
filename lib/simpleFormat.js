const FORM = {
  writeHeader: (row) => {
    const header = [];
    const horizontalLineArray = [];
    let rowLength = -2;
    for (const prop in row) {
      rowLength += Number(prop.length + 2);
      header.push(prop);
      horizontalLineArray.push("-".repeat(prop.length));
    }

    const headerLine = header.join("  ");
    console.log(headerLine);
    const horizontalLine = horizontalLineArray.join("  ");
    console.log(horizontalLine);
  },

  // TODO: write a function that determines column widths
  // - queries the DB table for MAX(length(value))
  // - pushes the max lengths into an array of integers
  // - uses the integers to set the position width of each column by
  // padding the hyphen row with additional hyphens and the values rows with spaces

  formatRow: (row) => {
    let rowLength = 0;
    const valuesArray = [];
    for (const prop in row) {
      rowLength += Number(prop.length);
      valuesArray.push(row[prop]);
    }
    console.log(valuesArray.join("  "));
  },
};
module.exports = { FORM };
