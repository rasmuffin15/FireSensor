import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Route from './routes'

class Home extends React.Component {

  constructor() {
    super();
    this.state = {color: "red"}
  }

  render() {
    return (
      <Router>
            <div>
                <p>Click the link to go to next page</p>
                <ul>
                    <li><Link to="/sensors" onClick={() => window.location.href = "/sensors"}>Sensor Data</Link></li>
                </ul>
            </div>
        </Router> 
    );
  }
}

export default Home;

ReactDOM.render(<Route />, document.getElementById('root'));
