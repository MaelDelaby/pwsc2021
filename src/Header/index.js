import React, { Fragment } from "react"
import Navigation from "../components/navigation"

const Header = () => (
    <Fragment>
        <header className="xs:px-2 sm:py-2
                           sm:px-6 sm:py-3
                           md:px-8 sm:py-4
                           flex justify-start bg-brand-dark py-4 px-10 items-center ">
            <div className="flex flex-grow items-center">
                <div className="xs:hidden sm:hidden md:hidden">
                <Navigation/>
                </div>
            </div>
        </header>
    </Fragment>)

export default Header