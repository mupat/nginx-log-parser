import React from 'react';
import './style.scss';

class LogTableBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tbody className='logtable-body'>
        {this.props.rows.map((row, i) =>
          <tr key={`row-${i}`}>
            {Object.keys(row).map((key, j) =>
              <td title={row[key]} key={`entry-${j}`}>{row[key]}</td>
            )}
          </tr>
        )}
      </tbody>
    )
  }
}

export default LogTableBody;
