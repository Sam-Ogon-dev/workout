import React from "react";
import "./Modal.scss"
import AppButton, {TEXT, WARNING} from "../button/AppButton";

function Modal(props: {children: React.ReactNode, isHeaderShow?: boolean, fullMode?: boolean, onDone?: () => void, onClose?: () => void}) {
    return (
        <div className={"modal-bg"}>
            <div className={"modal" + (props.fullMode ? " modal_full" : "")}>
                {
                    props.isHeaderShow ?
                        <div className="modal__header">
                            <AppButton stopPropagation={true} text={"отмена"} type={TEXT} action={props.onClose} actionType={WARNING}/>
                            <AppButton stopPropagation={true} text={"готово"} type={TEXT} action={props.onDone}/>
                        </div>
                        :
                        ""
                }

                {props.children}
            </div>
        </div>
    )
}

export default Modal
