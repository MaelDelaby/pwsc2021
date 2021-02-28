import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import AppDrawer from './components/AppDrawer'
import ProtectedRoute from './ProtectedRoutes'


const Router = () => {
	return (
		
			<BrowserRouter>
				<Switch>
					<Route exact path="/signin" component={SignIn} />

					<Route exact path="/signup" component={SignUp} />
					<ProtectedRoute exact path="/" component={AppDrawer} />
					
				</Switch>
			</BrowserRouter>
		
	)
}

export default Router
