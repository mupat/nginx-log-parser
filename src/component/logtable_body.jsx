import React from 'react';

class LogTableBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tbody>
        {this.props.rows.map((row, i) =>
          <tr key={`row-${i}`}>
            {Object.keys(row).map((key, j) =>
              <td key={`entry-${j}`}>{row[key]}</td>
            )}
          </tr>
        )}
      </tbody>
    )
  }
}

export default LogTableBody;
