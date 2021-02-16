import React from "react"
import { Switch, Route } from "react-router-dom"
import { GraphPage, ListPage, MapPage } from "../../pages"

const Switcher = () => (
    <Switch>
        <Route path="/graph">
            <GraphPage />
        </Route>
        <Route path="/list">
            <ListPage />
        </Route>
        <Route path="/map">
            <MapPage />
        </Route>
    </Switch>)

export default Switcher