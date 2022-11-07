import React, {useEffect, useState} from "react";
import {useAppActions} from "../../store/store";
import Train from "../../domain/runningTrainContext/Train";
import RunningTrainModel from "./RunningTrainModel";
import {useNavigate, useNavigation, useParams} from "react-router-dom";
import RepositoryImpl from "../../domain/runningTrainContext/repository/RepositoryImpl";
import AppButton, {TEXT} from "../../components/button/AppButton";

function RunningTrain() {
    const dispatch = useAppActions()
    const [train, setTrain] = useState(new Train("", [], ""))
    const runningTrainModel = new RunningTrainModel()
    const {uuid} = useParams()
    const nav = useNavigate()

    function goToExercise(uuid: string) {
        nav(`exercises/${uuid}`)
    }

    useEffect(() => {
        runningTrainModel.getTrain(uuid!, new RepositoryImpl()).then(train => {
            setTrain(train)
            dispatch.setTitle(train.name)
        })
    }, [])
    return (
        <div className={"flex flex-column p-10"}>
            {
                train.exercises.map(exercise =>
                    <div key={exercise.uuid} className={"flex flex-row card mb-10 align-items-center justify-content-between"}>
                        <span>{exercise.name}</span>
                        <AppButton text={"качнуться"} type={TEXT} action={() => goToExercise(exercise.uuid)}/>
                    </div>
                )
            }
        </div>

    )
}

export default RunningTrain
