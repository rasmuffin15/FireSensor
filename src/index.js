import React from 'react';
import ReactDOM from 'react-dom';
import Data from './Data'

class Table extends React.Component {

  constructor() {
    super();
    this.state = {color: "red"}
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Dev ID</th>
            <th>Serial Number</th>
            <th>Port</th>
            <th>Counter</th>
            <th>Payload Raw</th>
            <th>Metadata</th>
            <th>Link</th>
          </tr>
        </thead>
        <Data />
      </table>
    )
  }
}

ReactDOM.render(<Table />, document.getElementById('root'));