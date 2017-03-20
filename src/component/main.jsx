import React from 'react';

class NginxParser extends React.Component {
  constructor(props) {
    super(props);
    this.worker = this.props.worker;
    this.file = this.file.bind(this);
    this.state = {
      content: []
    }

    this.worker.addEventListener('message', this.message.bind(this), false);
  }

  message(event) {
    this.setState({ content: event.data });
  }

  file(event) {
    this.worker.postMessage({action: 'read', file: event.target.files[0]});
  }

  render() {
    return (
      <div>
        <h1> Nginx Log Parser </h1>
        <input type='file' onChange={this.file} />
        <table>
          <thead>
            <tr>
              {this.state.content[0] ? Object.keys(this.state.content[0]).map((key, i) =>
                <th key={`header-${i}`}>{key}</th>
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
