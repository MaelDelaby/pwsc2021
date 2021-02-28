import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18,
		},
	},
	radioGrp: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}))

export default function SignUp() {
	const classes = useStyles()
	// const [gender, setGender] = useState('female')
	// const handleChange = (event) => {
	// 	setGender(event.target.value)
	// }
    const SignupSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		lastName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		email: Yup.string()
            .email('Invalid email')
            .required('Required'),
		passWord: Yup.string()
			.required('No password provided.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		birthDay: Yup.string()
            .required('Required'),
		gender: Yup.string()
            .required('Required'),
		
    })
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			passWord: '',
			birthDay: '',
			gender: '',
			
		},
        validationSchema: SignupSchema,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			console.log('submitted')
			const {
				firstName,
				lastName,
				email,
				passWord,
				birthDay,
				gender,
				
			} = values
			axios
				.post('http://localhost:4001/auth/signup', {
					firstName,
					lastName,
					email,
					passWord,
					birthDay,
					gender,
					
				})
				.then(() => {
					console.log('Post successful!')
				})
				.catch((err) => {
					console.log(err)
				})
			resetForm()
			setSubmitting(false)
		},
	})
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form
					className={classes.form}
					onSubmit={formik.handleSubmit}
					noValidate
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Gender</FormLabel>
								<RadioGroup
									className={classes.radioGrp}
									aria-label="gender"
									name="gender"
									onChange={formik.handleChange}
									value={formik.values.gender}
								>
									<FormControlLabel
										value="female"
										control={<Radio />}
										label="Female"
									/>
									<FormControlLabel
										value="male"
										control={<Radio />}
										label="Male"
									/>
								</RadioGroup>
							</FormControl>
							{formik.errors.gender && formik.touched.gender ? (
            					<div style={{color:'red'}}>{formik.errors.gender}</div>
          						 ) : null}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								onChange={formik.handleChange}
								value={formik.values.firstName}
								autoFocus
							/>
							{formik.errors.firstName && formik.touched.firstName ? (
            					<div style={{color:'red'}}>{formik.errors.firstName}</div>
          						 ) : null}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={formik.handleChange}
								value={formik.values.lastName}
							/>
							{formik.errors.lastName && formik.touched.lastName ? (
            					<div style={{color:'red'}}>{formik.errors.lastName}</div>
          						 ) : null}
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								id="birthDay"
								label="Birthday*"
								name="birthDay"
								type="date"
								
								InputLabelProps={{
									shrink: true,
								}}
								onChange={formik.handleChange}
								value={formik.values.birthDay}
							/>
							{formik.errors.birthDay && formik.touched.birthDay ? (
            					<div style={{color:'red'}}>{formik.errors.birthDay}</div>
          						 ) : null}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							{formik.errors.email && formik.touched.email ? (
            					<div style={{color:'red'}}>{formik.errors.email}</div>
          						 ) : null}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="passWord"
								label="Password"
								type="password"
								id="passWord"
								autoComplete="current-password"
								onChange={formik.handleChange}
								value={formik.values.passWord}
							/>
							 {formik.errors.passWord && formik.touched.passWord ? (
            					<div style={{color:'red'}}>{formik.errors.passWord}</div>
          						 ) : null}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={()=>formik.onSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			
		</Container>
	)
}

