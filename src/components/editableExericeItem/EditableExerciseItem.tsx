import React, {useEffect, useState} from "react";
import Exercise from "../../domain/trainProgramListContext/Exercise";
import "./EditableExerciseItem.scss"
import Modal from "../modal/Modal";
import AppButton, {CONTAINED, TEXT, WARNING} from "../button/AppButton";
import EditableExerciseItemModel from "./EditableExerciseItemModel";
import RepositoryImpl from "../../domain/trainProgramListContext/repository/RepositoryImpl";
import ExerciseSet from "../../domain/trainProgramListContext/ExerciseSet";

function EditableExerciseItem(props: { exercise: Exercise, onEdit: (exercise: Exercise) => void, onDelete: () => void }) {
    const [exercise, setExercise] = useState({...props.exercise})
    const [isShowModal, setIsShowModal] = useState(false)
    const editableExerciseItemModel = new EditableExerciseItemModel()

    function onCancel() {
        setExercise({...exercise, sets: props.exercise.sets})
        setIsShowModal(false)
    }

    function save() {
        props.onEdit(exercise)
        setIsShowModal(false)
    }

    function bindRepetitions(index: number, value: number) {
        exercise.sets[index].repetitions = value
        setExercise({...exercise})
    }

    function bindDuration(index: number, value: number) {
        exercise.sets[index].duration = value
        setExercise({...exercise})
    }

    function bindWeight(index: number, value: number) {
        exercise.sets[index].weight = value
        setExercise({...exercise})
    }

    function bindTimeout(index: number, value: number) {
        exercise.sets[index].timeout = value
        setExercise({...exercise})
    }

    function deleteSet(index: number) {
        setExercise({...exercise, sets: editableExerciseItemModel.deleteExerciseSet(index, exercise.sets)})
    }

    function addSet() {
        setExercise({...exercise, sets: editableExerciseItemModel.addExerciseSet(exercise.sets)})
    }

    function moveSetUp(index: number) {
        setExercise({...exercise, sets: editableExerciseItemModel.moveSetUp(index, exercise.sets)})
    }

    function moveSetDown(index: number) {
        setExercise({...exercise, sets: editableExerciseItemModel.moveSetDown(index, exercise.sets)})
    }

    useEffect(() => {
        editableExerciseItemModel.isExist(exercise, new RepositoryImpl()).then(isExist => {
            if(!isExist) {
                setIsShowModal(true)
            }
        })
    }, [])

    return (
        <div onClick={() => setIsShowModal(true)} className={"editable-exercise-item"}>
            <span>{exercise.name}</span>
            <AppButton stopPropagation={true} action={props.onDelete} text={"удалить"} type={TEXT} actionType={WARNING}/>
            {
                isShowModal ?
                    <Modal isHeaderShow={true} fullMode={true} onDone={save} onClose={onCancel}>
                        <div className={"flex flex-column w-100 align-items-center"}>
                            <input defaultValue={exercise.name} onChange={e => setExercise({...exercise, name: e.target.value})} className={"input-outline"}/>
                            <span className={"small-text text-align-center mb-10"}>(Название упражнения)</span>
                            {
                                exercise.sets.sort((a, b) => +(a.index < b.index)).map((exerciseSet) =>
                                    <div key={exerciseSet.uuid} className={"card w-100 flex-column mb-10"}>
                                        <div className={"mb-10 flex flex-row justify-content-between align-items-center"}>
                                            <AppButton style={{padding: "0"}} text={"удалить"}
                                                       action={() => deleteSet(exerciseSet.index)}
                                                       type={TEXT}
                                                       actionType={WARNING}/>
                                            <span>ПОДХОД {exerciseSet.index + 1}</span>
                                        </div>
                                        <div className="flex flex-row align-items-center">
                                            <input defaultValue={exerciseSet.repetitions} onChange={(e) => bindRepetitions(exerciseSet.index, +e.target.value)} style={{width: "80px"}} className="input-outline"/>
                                            <span className={"ml-10"}>Повторения</span>
                                        </div>
                                        <div className="flex flex-row mt-10 align-items-center">
                                            <input defaultValue={exerciseSet.duration} onChange={(e) => bindDuration(exerciseSet.index, +e.target.value)} style={{width: "80px"}} className="input-outline"/>
                                            <span className={"ml-10"}>Продолжительность</span>
                                        </div>
                                        <div className="flex flex-row align-items-center mt-10">
                                            <input defaultValue={exerciseSet.weight} onChange={(e) => bindWeight(exerciseSet.index, +e.target.value)} style={{width: "80px"}} className="input-outline"/>
                                            <span className={"ml-10"}>Рабочий вес</span>
                                        </div>
                                        <div className="flex flex-row align-items-center mt-10">
                                            <input defaultValue={exerciseSet.timeout} onChange={(e) => bindTimeout(exerciseSet.index, +e.target.value)} style={{width: "80px"}} className="input-outline"/>
                                            <span className={"ml-10"}>Отдых</span>
                                        </div>

                                        <AppButton type={TEXT} action={() => moveSetUp(exerciseSet.index)} text={"поднять выше"} />
                                        <AppButton type={TEXT} action={() => moveSetDown(exerciseSet.index)} text={"опустить ниже"} />
                                    </div>
                                )
                            }

                            <AppButton action={addSet} text="добавить подход" type={CONTAINED}/>
                        </div>
                    </Modal>
                    :
                    ""
            }

        </div>
    )
}

export default EditableExerciseItem
