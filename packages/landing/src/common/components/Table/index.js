import { useMemo } from 'react';
import { useTable } from 'react-table';

const Table = function ({ tests }) {
  const data = useMemo(
    () =>
      tests.map((result) => ({
        createdAt: result.createdAt.seconds,
        fullName: result.fullName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        ssn: result.ssn,
        birthday: result.birthday
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Ajouté le',
        accessor: 'createdAt'
      },
      {
        Header: 'Nom complet',
        accessor: 'fullName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Téléphone',
        accessor: 'phoneNumber'
      },
      {
        Header: 'N° sécurité sociale',
        accessor: 'ssn'
      },
      {
        Header: 'Date de naissance',
        accessor: 'birthday'
      }
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip'
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
