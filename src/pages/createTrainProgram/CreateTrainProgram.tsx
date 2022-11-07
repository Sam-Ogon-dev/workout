import React, {useEffect, useState} from "react"
import {useAppActions} from "../../store/store";
import "./CreateTrainProgram.scss"
import AppButton, {CONTAINED, ROUNDED} from "../../components/button/AppButton";
import EditableTrainItem from "../../components/editableTrainItem/EditableTrainItem";
import Train from "../../domain/trainProgramListContext/Train";
import CreateTrainProgramModel from "./CreateTrainProgramModel";
import RepositoryImpl from "../../domain/trainProgramListContext/repository/RepositoryImpl";
import Common from "../../domain/trainProgramListContext/Common";

function CreateTrainProgram() {
    const dispatch = useAppActions()
    const createTrainListModel = new CreateTrainProgramModel()
    const [trainList, setTrainList] = useState(Common.addTrain([]))
    let [name, setName] = useState("")

    function addTrain() {
        const newList = Common.addTrain(trainList)
        setTrainList(newList)
    }

    function deleteTrain(index: number) {
        setTrainList(Common.deleteTrain(index, trainList))
    }

    function saveTrainProgram() {
        createTrainListModel.saveTrainProgram(trainList, name, new RepositoryImpl()).then(ok => {
            if(ok) {
                alert("Программа тренировок успешно создана")
            }
        })
    }

    function onTrainEdit(train: Train, index: number) {
        const updatedList = [...trainList]
        updatedList[index] = train
        setTrainList(updatedList)
    }

    useEffect(() => {
        dispatch.setTitle("создание программы тренировок")
    }, [])

    return (
        <div className={"create-train-container"}>
            <input onChange={e => setName(name = e.target.value)} placeholder={"Название программы тренировок"} className={"input-outline text-align-center"}/>
            {
                trainList.map((trainItem, index) =>
                   <EditableTrainItem onDelete={() => deleteTrain(index)} index={index} train={trainItem} key={trainItem.uuid} onEdit={(train: Train) => onTrainEdit(train, index)}/>
                )
            }
            <AppButton text={"добавить тренировку"} action={addTrain} type={CONTAINED} style={{marginTop: "10px"}} />
            <AppButton text={"✓"} type={ROUNDED} action={saveTrainProgram}/>
        </div>
    )
}

export default CreateTrainProgram
