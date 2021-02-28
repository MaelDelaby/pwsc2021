import React from 'react'
import {
	Route,
	Redirect,
	
	useLocation,
} from 'react-router-dom'
import decode from 'jwt-decode'


const ProtectedRoute = ({ component: Component, ...rest }) => {
	const user = JSON.parse(localStorage.getItem('user') || '{}')
	const location = useLocation()
	const isAuthenticated = () => {
		if (!user || !user.token) {
			return false
		}

		try {
			const { exp } = decode(user.token)
			if (exp < new Date().getTime() / 1000) {
				return false
			}
		} catch {
			return false
		}

		return true
	}

	if (!isAuthenticated()) {
		return (
			<Redirect
				to={{
					pathname: '/signin',
					state: {
						from: location.pathname,
					},
				}}
			/>
		)
	}
	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...rest} {...props} />
			}}
		/>
	)
}

export default ProtectedRoute