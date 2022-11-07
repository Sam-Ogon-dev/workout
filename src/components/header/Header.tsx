import React from "react"
import {useAppState} from "../../store/store";

function Header() {
    const state = useAppState(st => st.headerTitle)

    return (
        <div className="header">
            <span>{state.title}</span>
        </div>
    )
}

export default Header
