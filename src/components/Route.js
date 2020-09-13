import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from './MainPage';
import Map from './Map';

class Route extends React.Component{
    render(){
        const { information } = this.props;
        return(
            <Router>
                <Switch>
                <Route 
                    exact path="/" 
                    render={() => <MainPage information={information} />} />
                <Route 
                    path="/maps/:id" 
                    render={(props) => <Map information={information}  {...props} />}/>     
                </Switch>
            </Router>
        )
    }
}

export default Route;
