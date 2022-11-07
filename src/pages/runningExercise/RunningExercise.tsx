import React, {useEffect, useState} from "react";
import RunningExerciseModel from "./RunningExerciseModel";
import {useParams} from "react-router-dom";
import RepositoryImpl from "../../domain/runningExerciseContext/repository/RepositoryImpl";
import Exercise from "../../domain/runningExerciseContext/Exercise";
import {useAppActions} from "../../store/store";
import AppButton, {TEXT} from "../../components/button/AppButton";
import Modal from "../../components/modal/Modal";
import "./RunningExercise.scss"
import ProgressBar from "../../components/progressBar/ProgressBar";
import ExerciseSet from "../../domain/runningExerciseContext/ExerciseSet";

function RunningExercise() {
    const runningExerciseModel = new RunningExerciseModel()
    const {exerciseUuid} = useParams()
    const [exercise, setExercise] = useState(new Exercise("", "", []))
    const dispatch = useAppActions()
    const [isShowModal, setIsShowModal] = useState(false)
    const [currentSet, setCurrentSet] = useState(new ExerciseSet("", 0, 0, 0, 0, 0))
    const [isTimeOut, setIsTimeOut] = useState(false)

    function onTimeOutEnd() {
        setIsShowModal(false)
    }

    function startExerciseSet(exerciseSet: ExerciseSet) {
        setCurrentSet(exerciseSet)
        setIsShowModal(true)
    }

    function onExerciseSetEnd(index: number) {
        setIsTimeOut(true)
    }

    useEffect(() => {
        runningExerciseModel.getExercise(exerciseUuid!, new RepositoryImpl()).then(exercise => {
            setExercise(exercise)
            dispatch.setTitle(exercise.name)
        })
    }, [])
    return (
        <div className={"flex flex-column p-10"}>
            {
                exercise.sets.map((set, index) =>
                    <div key={set.uuid} className={"card flex flex-column align-items-center mb-10"}>
                        <span className={"mb-10"}>Подход {index + 1}</span>
                        <span className={"w-100"}>Повторения - {set.repetitions}</span>
                        <span className={"w-100"}>Длительность - {set.duration}</span>
                        <span className={"w-100"}>Отдых - {set.timeout}</span>
                        <span className={"w-100"}>Рабочий вес - {set.weight}</span>

                        {
                            set.isPassed ?
                                <span className={"mt-10"}>Подход завершен</span>
                                :
                                <AppButton type={TEXT} text={"старт"} action={() => startExerciseSet(set)}/>
                        }
                    </div>
                )
            }

            {
                isShowModal ?
                    <Modal>
                        {
                            !isTimeOut ?
                                <div className={"flex flex-column align-items-center w-100"}>
                                    {
                                        currentSet.duration ?
                                            <ProgressBar color={"red"} duration={currentSet.duration}
                                                         onFinish={() => setIsTimeOut(true)}/>
                                            :
                                            <>
                                                <span className={"text-align-center"}>Нажмите кнопку, когда закончите выполнение подхода</span>
                                                <AppButton action={() => onExerciseSetEnd(currentSet.index)} type={TEXT} text={"готово!"} />
                                            </>
                                    }
                                </div>
                                :
                                <div className={"flex flex-column align-items-center w-100"}>
                                    <span className={"mb-10"}>Отдыхай братишка</span>
                                    <ProgressBar color={"green"} duration={currentSet.timeout} onFinish={onTimeOutEnd}/>
                                    <AppButton style={{marginTop: "20px"}} type={TEXT} text={"отмена"}/>
                                </div>
                        }
                    </Modal>
                    :
                    ""
            }
        </div>
    )
}

export default RunningExercise
