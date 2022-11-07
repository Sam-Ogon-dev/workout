import React, {CSSProperties} from 'react';
import "./AppButton.scss"
import AppButtonModel from "./AppButtonModel";

export const CONTAINED = "button"
// export const OUTLINED = "OUTLINED"
export const TEXT = "text-button"
export const ROUNDED = "round"
export const WARNING = "color-warning"

function AppButton(props: { text?: string, icon?: string, action?: () => void, type: string, style?: CSSProperties, actionType?: string, stopPropagation?: boolean }) {
    const ripple = React.createRef<HTMLElement>()
    const appButtonModel = new AppButtonModel()

    function onClick(e: React.MouseEvent) {
        if(props.stopPropagation) {
            e.stopPropagation()
        }

        if(props.action) {
            appButtonModel.click(e.nativeEvent, ripple.current!, props.action)
        }
    }

    return (
        <button style={props.style} onClick={e => onClick(e)}
                className={props.type}>
            {
                props.text ?
                    <span className={props.actionType}>{props.text}</span>
                    :
                    <img src={props.icon}/>
            }

            <span ref={ripple} className="ripple"/>
        </button>
    )
}

export default AppButton
