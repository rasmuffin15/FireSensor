import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Error from './Error';
import uniqueData from './uniqueData';
import Home from './index';



class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/sensors" component={uniqueData} />    
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Routes;