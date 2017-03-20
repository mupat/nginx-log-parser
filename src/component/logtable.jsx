import React from 'react';
import LogTableHead from './logtable_head';
import LogTableBody from './logtable_body';

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      sort: undefined
    }

    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
    this.sortedByKey = this.sortedByKey.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ content: nextProps.file_content });
  }

  filter(event) {
    const content = this.props.file_content.filter((line) => {
      return Object.keys(line)
        .map(key => line[key].includes(event.target.value))
        .reduce((prev, current) => { return prev ? prev : current }, false);
    });
    this.setState({ content : content });
  }

  sort(key) {
    const ascending = this.state.sort && this.state.sort.key === key ? !this.state.sort.ascending : true
    this.setState({ sort: { key: key, ascending: ascending } });
    this._sort(key, ascending);
  }

  sortedByKey(key) {
    return this.state.sort && this.state.sort.key === key ? this.state.sort.ascending ? 'asc' : 'desc' : '';
  }

  render() {
    return this.state.content.length === 0 ? null : (
      <div>
        <input type='search' onChange={this.filter} placeholder='Filter Rows'/>
        <span>{this.state.content.length} entries</span>
        <table>
          <LogTableHead header={this.state.content[0]} headClick={this.sort} sortedByKey={this.sortedByKey} />
          <LogTableBody rows={this.state.content} />
        </table>
      </div>
    )
  }

  _sort(key, ascending) {
    const content = this.state.content.sort((a, b) => {
      if(a[key] < b[key]) { return ascending ? -1 : 1 };
      if(a[key] > b[key]) { return ascending ? 1 : -1 };
      return 0;
    });
    this.setState({ content : content });
  }
}

export default LogTable;
