import React from 'react'
import {Route, Switch,BrowserRouter } from 'react-router-dom'
import Map from './pages/Map'
import Graph from './pages/Graph'
import List from './pages/List'




const Router=()=>{

    return(
    <>
        <BrowserRouter>
        
        <Switch>
            <Route exact path="/map" component={Map} />
            <Route exact path="/graph" component={Graph} />
            <Route exact path="/list" component={List} />
        </Switch>
        
        </BrowserRouter>
    
    </>
    
    
    
    )
}

export default Router