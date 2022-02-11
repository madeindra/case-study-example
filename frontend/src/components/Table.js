import React from 'react';

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            ID
          </th>
          
          <th>
            Title
          </th>

          <th>
            Description
          </th>
        </tr>
      </thead>
      
      <tbody>
        { props.data.map((element, index) => {
          return (
            <tr>
              <td>
                { element.id }
              </td>
              <td>
                { element.title }
              </td>
              <td>
                { element.detail }
              </td>
            </tr>
          );
        }) }
      </tbody>

    </table>
  );
}

export default Table;