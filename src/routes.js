import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './index';
import Graph from './graph'
import Error from './Error';


class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/sensors" component={Graph} />
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Routes;