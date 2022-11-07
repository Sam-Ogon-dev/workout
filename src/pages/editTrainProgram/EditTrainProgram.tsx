import React, {useEffect, useState} from "react"
import {useAppActions} from "../../store/store";
import AppButton, {CONTAINED, ROUNDED} from "../../components/button/AppButton";
import EditableTrainItem from "../../components/editableTrainItem/EditableTrainItem";
import Train from "../../domain/trainProgramListContext/Train";
import RepositoryImpl from "../../domain/trainProgramListContext/repository/RepositoryImpl";
import EditTrainProgramModel from "./EditTrainProgramModel";
import {useParams} from "react-router-dom";
import "./EditTrainProgram.scss"
import Common from "../../domain/trainProgramListContext/Common";

function EditTrainProgram() {
    const dispatch = useAppActions()
    const editTrainListModel = new EditTrainProgramModel()
    const [trainList, setTrainList] = useState([] as Array<Train>)
    let [name, setName] = useState("")
    const { uuid } = useParams()

    function addTrain() {
        const newList = Common.addTrain(trainList)
        setTrainList(newList)
    }

    function deleteTrain(index: number) {
        setTrainList(Common.deleteTrain(index, trainList))
    }

    function saveTrainProgram() {
        editTrainListModel.saveTrainProgram(uuid!, trainList, name, new RepositoryImpl()).then(ok => {
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
        editTrainListModel.getTrainProgram(uuid!, new RepositoryImpl()).then(trainProgram => {
            setName(trainProgram.name)
            setTrainList(trainProgram.trains)
            dispatch.setTitle("редактирование программы тренировок")
        })
    }, [])

    return (
        <div className={"edit-train-container"}>
            <input defaultValue={name} onChange={e => setName(name = e.target.value)} placeholder={"Название программы тренировок"} className={"input-outline text-align-center"}/>
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

export default EditTrainProgram
