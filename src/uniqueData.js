import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

import graph from './graph'

class uniqueData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://1tmpf2bpja.execute-api.us-west-2.amazonaws.com/default/sensor")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.rows)
          this.setState({
            isLoaded: true,
            items: result.rows
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <>Error: {error.message}</>;
    } else if (!isLoaded) {
      return <>Loading...</>;
    } else {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>HWEUI</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr>
                  <Router>
                    <td key = {item.hweui}>
                      <Link to={{pathname: `/sensors/${item.hweui}`, query: {hweui: 'abc123'}}} onClick={() => window.location.href = "/sensors/" + item.hweui}>{item.hweui}</Link>
                    </td>
                  </Router>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default uniqueData;