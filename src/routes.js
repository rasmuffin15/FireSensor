import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Error from './Error'

import Data from './Data';
import Home from './index';


class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/tableData" component={Data} />    
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Routes;