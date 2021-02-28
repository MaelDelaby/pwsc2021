# Web Project

## Launch the project

To launch the project :
1. yarn install at the root
2. yarn install in the server folder
3. Copy the file .env.example into .env
4. npm run start:both to launch both front and back

## Login / Password
Login :admin@admin.com
Password: 123456789
and you can also create a new account on localhost:3000/signup
## Architecture

Our project is based on the MaterialUI default theme.
We planned our project like that : index->app->Router->pages and components
In our architecture we have five pages : Graph, Lists, Map, SignIn and SignUp.
To go to these pages:
    -Graph: localhost:3000/graph
    -Lists: localhost:3000/list
    -Map: localhost:3000/map
    -Sign In: localhost:3000/signin
    -Sign Up : localhost:3000/signup 
We also have three components : AppDrawer which provide a navigation bar with a vertical menu, ShowHowManyCase to show on every page of the application the number of confirmed cases and ThemeModal which is the switch in the app bar to change the theme mode.
