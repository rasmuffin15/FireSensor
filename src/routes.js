import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './index';
import uniqueData from './uniqueData';
import tempGraph from './tempGraph'
import Error from './Error';


class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/sensors" component={uniqueData} />  
                        <Route path="/sensors/:hweui" component={tempGraph} />  
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Routes;