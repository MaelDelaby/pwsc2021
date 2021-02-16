import React from "react"
import './main.css';
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./Header"
import { Switcher } from "./components/navigation"
import HeaderMobile from "./Header/mobile"

function App() {
  return (
    <div>
      <Router >
        <Header />
        <Switcher />
      </Router>
    </div>
  )
}

export default App;
