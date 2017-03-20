import React from 'react';
import './logtable_head.scss';

class LogTableHead extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.transform = this.transform.bind(this);
  }

  click(event) {
    this.props.headClick(event.target.getAttribute('data-key'));
  }

  transform(key) {
    return key.replace('_', ' ').toUpperCase();
  }

  render() {
    return (
      <thead className='logtable-head' onClick={this.click}>
        <tr>
          {Object.keys(this.props.header).map((key, i) =>
            <th key={`header-${i}`} data-key={key}>{this.transform(key)} {this.props.sortedByKey(key)}</th>
          )}
        </tr>
      </thead>
    )
  }
}

export default LogTableHead;
