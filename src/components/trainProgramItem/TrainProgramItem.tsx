import React from "react";
import AppButton, {TEXT, WARNING} from "../button/AppButton";
import TrainProgram from "../../domain/trainProgramListContext/TrainProgram";
import {useNavigate} from "react-router-dom";
import TrainProgramItemModel from "./TrainProgramItemModel";
import RepositoryImpl from "../../domain/trainProgramListContext/repository/RepositoryImpl";

export function TrainProgramItem(props: {trainProgram: TrainProgram, onDelete: (uuid: string) => void, onSetActive: () => void}) {
    const nav = useNavigate()
    const trainProgramItemModel = new TrainProgramItemModel()

    function onItemClick(uuid: string) {
        nav(`/train-programs/${uuid}/edit`)
    }

    function setActive() {
        trainProgramItemModel.setActive(props.trainProgram.uuid, new RepositoryImpl()).then(ok => {
            props.onSetActive()
        })
    }

    return (
        <div onClick={() => onItemClick(props.trainProgram.uuid)} className={"card w-100 mb-10 flex flex-column align-items-center"}>
            <div className={"flex flex-row justify-content-between mb-10 w-100"}>
                <span key={props.trainProgram.uuid}>{props.trainProgram.name}</span>
                <AppButton stopPropagation={true} action={() => props.onDelete(props.trainProgram.uuid)} style={{padding: 0}} text={"удалить"} type={TEXT} actionType={WARNING}/>
            </div>

            <span className={"w-100"}>Тренировки:</span>
            {
                props.trainProgram.trains.map(train =>
                    <span className={"ml-10 w-100"} key={train.uuid}>{train.name}</span>
                )
            }

            <AppButton action={setActive} stopPropagation={true} type={TEXT} text={props.trainProgram.isActive ? "активна" : "не активна"}/>
        </div>
    )
}

export default TrainProgramItem
