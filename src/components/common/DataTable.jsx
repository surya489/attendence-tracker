export const DataTable = ({ columns = [], rows = [], emptyText = 'No records found.' }) => {
  return (
    <div className="dataTableWrap">
      <table className="dataTable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="dataTableEmptyCell">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={row.id || idx}>
                {columns.map((column) => (
                  <td key={`${column.key}-${row.id || idx}`}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
