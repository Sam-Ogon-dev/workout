import React, {useEffect, useState} from 'react';
import AppButton, {CONTAINED, TEXT} from "../../components/button/AppButton";
import "./Main.scss"
import {useNavigate} from "react-router-dom";
import {useAppActions} from "../../store/store";
import TrainProgram from "../../domain/homeContext/TrainProgram";
import MainModel from "./MainModel";
import RepositoryImpl from "../../domain/homeContext/repository/RepositoryImpl";

function Main() {
    const [trainProgram, setTrainProgram] = useState(new TrainProgram("", "", []))
    const nav = useNavigate()
    const mainModel = new MainModel()

    function goToTrain(uuid: string) {
        nav(`/trains/${uuid}/running`)
    }

    const dispatch = useAppActions()

    useEffect(() => {
        dispatch.setTitle("Главная")
        mainModel.getTrainProgram(new RepositoryImpl()).then(trainProgram => {
            if(!trainProgram.uuid) {
                return
            }
            setTrainProgram(trainProgram)
        })

    }, [])

    return (
        <div className="main-page">
            {
                trainProgram.uuid ?
                    <span className={"mb-10"}>{trainProgram.name}</span>
                    :
                    <span>Нет активной программы тренировок</span>
            }

            {
                trainProgram.trains.map(train =>
                    <div key={train.uuid} className={"card flex flex-row align-items-center justify-content-between w-100 mt-10"}>
                        <span>{ train.name }</span>
                        <AppButton text="Начать тренировку" action={() => goToTrain(train.uuid)} type={TEXT}/>
                    </div>
                )
            }
        </div>
    )
}

export default Main
