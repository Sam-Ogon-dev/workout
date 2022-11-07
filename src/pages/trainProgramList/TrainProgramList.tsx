import React, {useEffect, useState} from "react"
import AppButton, {ROUNDED} from "../../components/button/AppButton";
import {useAppActions} from "../../store/store";
import {Link} from "react-router-dom";
import TrainProgram from "../../domain/trainProgramListContext/TrainProgram";
import TrainProgramListModel from "./TrainProgramListModel";
import RepositoryImpl from "../../domain/trainProgramListContext/repository/RepositoryImpl";
import TrainProgramItem from "../../components/trainProgramItem/TrainProgramItem";
import plus from "../../assets/icons/plus.svg"

function TrainProgramList() {
    const dispatch = useAppActions()
    const [trainPrograms, setTrainPrograms] = useState([] as Array<TrainProgram>)
    const trainProgramListModel = new TrainProgramListModel()
    const repository = new RepositoryImpl()

    function deleteTrainProgram(uuid: string) {
        trainProgramListModel.deleteTrainProgram(uuid, repository).then(() => {
            trainProgramListModel.getTrainPrograms(repository).then(trainPrograms => {
                setTrainPrograms(trainPrograms)
            })
        })
    }

    function onSetActive() {
        trainProgramListModel.getTrainPrograms(repository).then(trainPrograms => {
            setTrainPrograms(trainPrograms)
        })
    }

    useEffect(() => {
        dispatch.setTitle("список программ тренировок")
        trainProgramListModel.getTrainPrograms(repository).then(trainPrograms => {
            setTrainPrograms(trainPrograms)
        })
    }, [])

    return (
        <div className={"p-10 flex flex-column align-items-center w-100"}>
            <div className="flex flex-column w-100">
                {
                    trainPrograms.map(trainProgram =>
                        <TrainProgramItem onSetActive={onSetActive} onDelete={deleteTrainProgram} trainProgram={trainProgram} key={trainProgram.uuid}/>
                    )
                }
            </div>
            <Link to={"/create-train"}>
                <AppButton type={ROUNDED} icon={plus}/>
            </Link>
        </div>
    )
}

export default TrainProgramList
