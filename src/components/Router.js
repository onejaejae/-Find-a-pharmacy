import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from './MainPage';
import Map from './Map';

class Router extends React.Component{
    render(){
        const { information } = this.props;
        return(
            <BrowserRouter>
                <Switch>
                <Route 
                    exact path="/" 
                    render={() => <MainPage information={information} />} />
                <Route 
                    path="/:id" 
                    render={(props) => <Map information={information}  {...props} />}/>     
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;