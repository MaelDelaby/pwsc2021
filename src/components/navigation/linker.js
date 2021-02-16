import React from "react"
import * as ROUTES from "../../constants/routes"
import { NavLink } from "react-router-dom"

const Linker = () => (
    <nav>
        <ul className="flex text-white font-helvetica tracking-wide text-base xs:text-xs sm:text-sm md:text-sm justify-between xs:px-6">
            <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><NavLink to={ROUTES.GRAPH.link} activeClassName="cursor-pointer text-orange-400"> {ROUTES.GRAPH.name}</NavLink></li>
            <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><NavLink to={ROUTES.LIST.link} activeClassName="cursor-pointer text-orange-400" >{ROUTES.LIST.name}</NavLink></li>
            <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><NavLink to={ROUTES.MAP.link} activeClassName="cursor-pointer text-orange-400">{ROUTES.MAP.name}</NavLink></li>
        </ul>
    </nav>
)
export default Linker