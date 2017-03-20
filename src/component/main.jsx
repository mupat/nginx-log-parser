import React from 'react';

class NginxParser extends React.Component {
  constructor(props) {
    super(props);
    this.worker = this.props.worker;
    this.file = this.file.bind(this);
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
    this.state = {
      content: [],
      sort: undefined
    }

    this.worker.addEventListener('message', this.message.bind(this), false);
  }

  message(event) {
    if(event.data.success) {
      this.setState({ content: event.data.content });
    } else {
      console.error(event.data.content);
    }
  }

  file(event) {
    this.worker.postMessage({ action: 'read', file: event.target.files[0] });
  }

  search(event) {
    this.worker.postMessage({ action: 'filter', criteria: event.target.value });
  }

  sort(key) {
    let sort = {}
    sort[key] = this.state.sort ? !this.state.sort[key] : true
    this.setState({ sort: sort });
    this.worker.postMessage({ action: 'sort', key: key, ascending: sort[key] });
  }

  render() {
    const self = this;
    return (
      <div>
        <h1> Nginx Log Parser </h1>
        <input type='file' onChange={this.file} />
        <input type='search' onChange={this.search} />
        <table>
          <thead>
            <tr>
              {this.state.content[0] ? Object.keys(this.state.content[0]).map((key, i) =>
                <th key={`header-${i}`} onClick={() => self.sort(key)}>{key}</th>
              ) : ''}
            </tr>
          </thead>
          <tbody>
            {this.state.content.map((line, i) =>
              <tr key={`line-${i}`}>
                {Object.keys(line).map((key, j) =>
                  <td key={`entry-${j}`}>{line[key]}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default NginxParser;
