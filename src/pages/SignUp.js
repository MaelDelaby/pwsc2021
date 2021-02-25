import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © Polamis '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}
function countryToFlag(isoCode) {
	return typeof String.fromCodePoint !== 'undefined'
		? isoCode
				.toUpperCase()
				.replace(/./g, (char) =>
					String.fromCodePoint(char.charCodeAt(0) + 127397),
				)
		: isoCode
}
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
		city: Yup.string()
            .required('Required'),
		country: Yup.string()
            .required('Required'),
		nationality: Yup.string()
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
			city: '',
			country: '',
			nationality: '',
		},
        validationSchema: SignupSchema,
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const {
				firstName,
				lastName,
				email,
				passWord,
				birthDay,
				gender,
				city,
				country,
				nationality,
			} = values
			axios
				.post('link', {
					firstName,
					lastName,
					email,
					passWord,
					birthDay,
					gender,
					city,
					country,
					nationality,
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
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								id="birthDay"
								label="Birthday*"
								name="birthDay"
								type="date"
								defaultValue="2017-05-24"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={formik.handleChange}
								value={formik.values.birthDay}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Autocomplete
								id="country-select"
								options={countries}
								classes={{
									option: classes.option,
								}}
								autoHighlight
								getOptionLabel={(option) => option.label}
								renderOption={(option) => (
									<React.Fragment>
										<span>{countryToFlag(option.code)}</span>
										{option.label}
									</React.Fragment>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Nationality*"
										variant="outlined"
										inputProps={{
											...params.inputProps,
											autoComplete: 'new-password', // disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="city"
								label="city"
								name="city"
								autoComplete="city"
								onChange={formik.handleChange}
								value={formik.values.city}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Autocomplete
								id="country-select"
								options={countries}
								classes={{
									option: classes.option,
								}}
								autoHighlight
								getOptionLabel={(option) => option.label}
								renderOption={(option) => (
									<React.Fragment>
										<span>{countryToFlag(option.code)}</span>
										{option.label}
									</React.Fragment>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Country*"
										variant="outlined"
										inputProps={{
											...params.inputProps,
											autoComplete: 'new-password', // disable autocomplete and autofill
										}}
									/>
								)}
							/>
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
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	)
}
const countries = [
	{ code: 'AD', label: 'Andorra', phone: '376' },
	{ code: 'AE', label: 'United Arab Emirates', phone: '971' },
	{ code: 'AF', label: 'Afghanistan', phone: '93' },
	{ code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
	{ code: 'AI', label: 'Anguilla', phone: '1-264' },
	{ code: 'AL', label: 'Albania', phone: '355' },
	{ code: 'AM', label: 'Armenia', phone: '374' },
	{ code: 'AO', label: 'Angola', phone: '244' },
	{ code: 'AQ', label: 'Antarctica', phone: '672' },
	{ code: 'AR', label: 'Argentina', phone: '54' },
	{ code: 'AS', label: 'American Samoa', phone: '1-684' },
	{ code: 'AT', label: 'Austria', phone: '43' },
	{ code: 'AU', label: 'Australia', phone: '61', suggested: true },
	{ code: 'AW', label: 'Aruba', phone: '297' },
	{ code: 'AX', label: 'Alland Islands', phone: '358' },
	{ code: 'AZ', label: 'Azerbaijan', phone: '994' },
	{ code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
	{ code: 'BB', label: 'Barbados', phone: '1-246' },
	{ code: 'BD', label: 'Bangladesh', phone: '880' },
	{ code: 'BE', label: 'Belgium', phone: '32' },
	{ code: 'BF', label: 'Burkina Faso', phone: '226' },
	{ code: 'BG', label: 'Bulgaria', phone: '359' },
	{ code: 'BH', label: 'Bahrain', phone: '973' },
	{ code: 'BI', label: 'Burundi', phone: '257' },
	{ code: 'BJ', label: 'Benin', phone: '229' },
	{ code: 'BL', label: 'Saint Barthelemy', phone: '590' },
	{ code: 'BM', label: 'Bermuda', phone: '1-441' },
	{ code: 'BN', label: 'Brunei Darussalam', phone: '673' },
	{ code: 'BO', label: 'Bolivia', phone: '591' },
	{ code: 'BR', label: 'Brazil', phone: '55' },
	{ code: 'BS', label: 'Bahamas', phone: '1-242' },
	{ code: 'BT', label: 'Bhutan', phone: '975' },
	{ code: 'BV', label: 'Bouvet Island', phone: '47' },
	{ code: 'BW', label: 'Botswana', phone: '267' },
	{ code: 'BY', label: 'Belarus', phone: '375' },
	{ code: 'BZ', label: 'Belize', phone: '501' },
	{ code: 'CA', label: 'Canada', phone: '1', suggested: true },
	{ code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
	{ code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
	{ code: 'CF', label: 'Central African Republic', phone: '236' },
	{ code: 'CG', label: 'Congo, Republic of the', phone: '242' },
	{ code: 'CH', label: 'Switzerland', phone: '41' },
	{ code: 'CI', label: "Cote d'Ivoire", phone: '225' },
	{ code: 'CK', label: 'Cook Islands', phone: '682' },
	{ code: 'CL', label: 'Chile', phone: '56' },
	{ code: 'CM', label: 'Cameroon', phone: '237' },
	{ code: 'CN', label: 'China', phone: '86' },
	{ code: 'CO', label: 'Colombia', phone: '57' },
	{ code: 'CR', label: 'Costa Rica', phone: '506' },
	{ code: 'CU', label: 'Cuba', phone: '53' },
	{ code: 'CV', label: 'Cape Verde', phone: '238' },
	{ code: 'CW', label: 'Curacao', phone: '599' },
	{ code: 'CX', label: 'Christmas Island', phone: '61' },
	{ code: 'CY', label: 'Cyprus', phone: '357' },
	{ code: 'CZ', label: 'Czech Republic', phone: '420' },
	{ code: 'DE', label: 'Germany', phone: '49', suggested: true },
	{ code: 'DJ', label: 'Djibouti', phone: '253' },
	{ code: 'DK', label: 'Denmark', phone: '45' },
	{ code: 'DM', label: 'Dominica', phone: '1-767' },
	{ code: 'DO', label: 'Dominican Republic', phone: '1-809' },
	{ code: 'DZ', label: 'Algeria', phone: '213' },
	{ code: 'EC', label: 'Ecuador', phone: '593' },
	{ code: 'EE', label: 'Estonia', phone: '372' },
	{ code: 'EG', label: 'Egypt', phone: '20' },
	{ code: 'EH', label: 'Western Sahara', phone: '212' },
	{ code: 'ER', label: 'Eritrea', phone: '291' },
	{ code: 'ES', label: 'Spain', phone: '34' },
	{ code: 'ET', label: 'Ethiopia', phone: '251' },
	{ code: 'FI', label: 'Finland', phone: '358' },
	{ code: 'FJ', label: 'Fiji', phone: '679' },
	{ code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
	{ code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
	{ code: 'FO', label: 'Faroe Islands', phone: '298' },
	{ code: 'FR', label: 'France', phone: '33', suggested: true },
	{ code: 'GA', label: 'Gabon', phone: '241' },
	{ code: 'GB', label: 'United Kingdom', phone: '44' },
	{ code: 'GD', label: 'Grenada', phone: '1-473' },
	{ code: 'GE', label: 'Georgia', phone: '995' },
	{ code: 'GF', label: 'French Guiana', phone: '594' },
	{ code: 'GG', label: 'Guernsey', phone: '44' },
	{ code: 'GH', label: 'Ghana', phone: '233' },
	{ code: 'GI', label: 'Gibraltar', phone: '350' },
	{ code: 'GL', label: 'Greenland', phone: '299' },
	{ code: 'GM', label: 'Gambia', phone: '220' },
	{ code: 'GN', label: 'Guinea', phone: '224' },
	{ code: 'GP', label: 'Guadeloupe', phone: '590' },
	{ code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
	{ code: 'GR', label: 'Greece', phone: '30' },
	{
		code: 'GS',
		label: 'South Georgia and the South Sandwich Islands',
		phone: '500',
	},
	{ code: 'GT', label: 'Guatemala', phone: '502' },
	{ code: 'GU', label: 'Guam', phone: '1-671' },
	{ code: 'GW', label: 'Guinea-Bissau', phone: '245' },
	{ code: 'GY', label: 'Guyana', phone: '592' },
	{ code: 'HK', label: 'Hong Kong', phone: '852' },
	{ code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
	{ code: 'HN', label: 'Honduras', phone: '504' },
	{ code: 'HR', label: 'Croatia', phone: '385' },
	{ code: 'HT', label: 'Haiti', phone: '509' },
	{ code: 'HU', label: 'Hungary', phone: '36' },
	{ code: 'ID', label: 'Indonesia', phone: '62' },
	{ code: 'IE', label: 'Ireland', phone: '353' },
	{ code: 'IL', label: 'Israel', phone: '972' },
	{ code: 'IM', label: 'Isle of Man', phone: '44' },
	{ code: 'IN', label: 'India', phone: '91' },
	{ code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
	{ code: 'IQ', label: 'Iraq', phone: '964' },
	{ code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
	{ code: 'IS', label: 'Iceland', phone: '354' },
	{ code: 'IT', label: 'Italy', phone: '39' },
	{ code: 'JE', label: 'Jersey', phone: '44' },
	{ code: 'JM', label: 'Jamaica', phone: '1-876' },
	{ code: 'JO', label: 'Jordan', phone: '962' },
	{ code: 'JP', label: 'Japan', phone: '81', suggested: true },
	{ code: 'KE', label: 'Kenya', phone: '254' },
	{ code: 'KG', label: 'Kyrgyzstan', phone: '996' },
	{ code: 'KH', label: 'Cambodia', phone: '855' },
	{ code: 'KI', label: 'Kiribati', phone: '686' },
	{ code: 'KM', label: 'Comoros', phone: '269' },
	{ code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
	{ code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
	{ code: 'KR', label: 'Korea, Republic of', phone: '82' },
	{ code: 'KW', label: 'Kuwait', phone: '965' },
	{ code: 'KY', label: 'Cayman Islands', phone: '1-345' },
	{ code: 'KZ', label: 'Kazakhstan', phone: '7' },
	{ code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
	{ code: 'LB', label: 'Lebanon', phone: '961' },
	{ code: 'LC', label: 'Saint Lucia', phone: '1-758' },
	{ code: 'LI', label: 'Liechtenstein', phone: '423' },
	{ code: 'LK', label: 'Sri Lanka', phone: '94' },
	{ code: 'LR', label: 'Liberia', phone: '231' },
	{ code: 'LS', label: 'Lesotho', phone: '266' },
	{ code: 'LT', label: 'Lithuania', phone: '370' },
	{ code: 'LU', label: 'Luxembourg', phone: '352' },
	{ code: 'LV', label: 'Latvia', phone: '371' },
	{ code: 'LY', label: 'Libya', phone: '218' },
	{ code: 'MA', label: 'Morocco', phone: '212' },
	{ code: 'MC', label: 'Monaco', phone: '377' },
	{ code: 'MD', label: 'Moldova, Republic of', phone: '373' },
	{ code: 'ME', label: 'Montenegro', phone: '382' },
	{ code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
	{ code: 'MG', label: 'Madagascar', phone: '261' },
	{ code: 'MH', label: 'Marshall Islands', phone: '692' },
	{
		code: 'MK',
		label: 'Macedonia, the Former Yugoslav Republic of',
		phone: '389',
	},
	{ code: 'ML', label: 'Mali' },
	{ code: 'MM', label: 'Myanmar' },
	{ code: 'MN', label: 'Mongolia' },
	{ code: 'MO', label: 'Macao' },
	{ code: 'MP', label: 'Northern Mariana Islands' },
	{ code: 'MQ', label: 'Martinique' },
	{ code: 'MR', label: 'Mauritania' },
	{ code: 'MS', label: 'Montserrat' },
	{ code: 'MT', label: 'Malta' },
	{ code: 'MU', label: 'Mauritius' },
	{ code: 'MV', label: 'Maldives' },
	{ code: 'MW', label: 'Malawi' },
	{ code: 'MX', label: 'Mexico' },
	{ code: 'MY', label: 'Malaysia' },
	{ code: 'MZ', label: 'Mozambique' },
	{ code: 'NA', label: 'Namibia' },
	{ code: 'NC', label: 'New Caledonia' },
	{ code: 'NE', label: 'Niger' },
	{ code: 'NF', label: 'Norfolk Island' },
	{ code: 'NG', label: 'Nigeria' },
	{ code: 'NI', label: 'Nicaragua' },
	{ code: 'NL', label: 'Netherlands' },
	{ code: 'NO', label: 'Norway' },
	{ code: 'NP', label: 'Nepal' },
	{ code: 'NR', label: 'Nauru' },
	{ code: 'NU', label: 'Niue' },
	{ code: 'NZ', label: 'New Zealand' },
	{ code: 'OM', label: 'Oman' },
	{ code: 'PA', label: 'Panama' },
	{ code: 'PE', label: 'Peru' },
	{ code: 'PF', label: 'French Polynesia' },
	{ code: 'PG', label: 'Papua New Guinea' },
	{ code: 'PH', label: 'Philippines' },
	{ code: 'PK', label: 'Pakistan' },
	{ code: 'PL', label: 'Poland' },
	{ code: 'PM', label: 'Saint Pierre and Miquelon' },
	{ code: 'PN', label: 'Pitcairn' },
	{ code: 'PR', label: 'Puerto Rico' },
	{ code: 'PS', label: 'Palestine, State of' },
	{ code: 'PT', label: 'Portugal' },
	{ code: 'PW', label: 'Palau' },
	{ code: 'PY', label: 'Paraguay' },
	{ code: 'QA', label: 'Qatar' },
	{ code: 'RE', label: 'Reunion' },
	{ code: 'RO', label: 'Romania' },
	{ code: 'RS', label: 'Serbia' },
	{ code: 'RU', label: 'Russian Federation' },
	{ code: 'RW', label: 'Rwanda' },
	{ code: 'SA', label: 'Saudi Arabia' },
	{ code: 'SB', label: 'Solomon Islands' },
	{ code: 'SC', label: 'Seychelles' },
	{ code: 'SD', label: 'Sudan' },
	{ code: 'SE', label: 'Sweden' },
	{ code: 'SG', label: 'Singapore' },
	{ code: 'SH', label: 'Saint Helena' },
	{ code: 'SI', label: 'Slovenia' },
	{ code: 'SJ', label: 'Svalbard and Jan Mayen' },
	{ code: 'SK', label: 'Slovakia' },
	{ code: 'SL', label: 'Sierra Leone' },
	{ code: 'SM', label: 'San Marino' },
	{ code: 'SN', label: 'Senegal' },
	{ code: 'SO', label: 'Somalia' },
	{ code: 'SR', label: 'Suriname' },
	{ code: 'SS', label: 'South Sudan' },
	{ code: 'ST', label: 'Sao Tome and Principe' },
	{ code: 'SV', label: 'El Salvador' },
	{ code: 'SX', label: 'Sint Maarten (Dutch part)' },
	{ code: 'SY', label: 'Syrian Arab Republic' },
	{ code: 'SZ', label: 'Swaziland' },
	{ code: 'TC', label: 'Turks and Caicos Islands' },
	{ code: 'TD', label: 'Chad' },
	{ code: 'TF', label: 'French Southern Territories' },
	{ code: 'TG', label: 'Togo' },
	{ code: 'TH', label: 'Thailand' },
	{ code: 'TJ', label: 'Tajikistan' },
	{ code: 'TK', label: 'Tokelau' },
	{ code: 'TL', label: 'Timor-Leste' },
	{ code: 'TM', label: 'Turkmenistan' },
	{ code: 'TN', label: 'Tunisia' },
	{ code: 'TO', label: 'Tonga' },
	{ code: 'TR', label: 'Turkey' },
	{ code: 'TT', label: 'Trinidad and Tobago' },
	{ code: 'TV', label: 'Tuvalu' },
	{ code: 'TW', label: 'Taiwan, Province of China' },
	{ code: 'TZ', label: 'United Republic of Tanzania' },
	{ code: 'UA', label: 'Ukraine' },
	{ code: 'UG', label: 'Uganda' },
	{ code: 'US', label: 'United States', suggested: true },
	{ code: 'UY', label: 'Uruguay' },
	{ code: 'UZ', label: 'Uzbekistan' },
	{ code: 'VA', label: 'Holy See (Vatican City State)' },
	{ code: 'VC', label: 'Saint Vincent and the Grenadines' },
	{ code: 'VE', label: 'Venezuela' },
	{ code: 'VG', label: 'British Virgin Islands' },
	{ code: 'VI', label: 'US Virgin Islands' },
	{ code: 'VN', label: 'Vietnam' },
	{ code: 'VU', label: 'Vanuatu' },
	{ code: 'WF', label: 'Wallis and Futuna' },
	{ code: 'WS', label: 'Samoa' },
	{ code: 'XK', label: 'Kosovo' },
	{ code: 'YE', label: 'Yemen' },
	{ code: 'YT', label: 'Mayotte' },
	{ code: 'ZA', label: 'South Africa' },
	{ code: 'ZM', label: 'Zambia' },
	{ code: 'ZW', label: 'Zimbabwe' },
]
