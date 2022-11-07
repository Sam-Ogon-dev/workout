import React from "react";
import Train from "../../domain/trainProgramListContext/Train";
import Exercise from "../../domain/trainProgramListContext/Exercise";
import "./EditableTrainItem.scss"
import AppButton, {TEXT, WARNING} from "../button/AppButton";
import EditableTrainItemModel from "./EditableTrainItemModel";
import EditableExerciseItem from "../editableExericeItem/EditableExerciseItem";

function EditableTrainItem(props: { index: number, train: Train, onEdit: (train: Train) => void, onDelete: () => void }) {
    const train = {...props.train}

    function addExercise() {
        train.exercises = EditableTrainItemModel.addExercise(train.exercises)
        props.onEdit(train)
    }

    function onExerciseEdit(exercise: Exercise, index: number) {
        train.exercises[index] = exercise
        props.onEdit(train)
    }

    function onDeleteExercise(index: number) {
        train.exercises = EditableTrainItemModel.deleteExercise(index, train.exercises)
        props.onEdit(train)
    }

    return (
        <div className={"editable-train-item"}>
            <AppButton action={props.onDelete} text={"удалить тренировку"} type={TEXT} actionType={WARNING}/>
            <input onChange={(e) => props.onEdit({...train, name: e.target.value})} placeholder={"название тренировки"} defaultValue={train.name}
                   className={"input text-align-center"}/>
            {
                train.exercises.map((exercise, index) => (
                    <div key={exercise.uuid} className={"editable-train-item__exercise-list"}>
                        <EditableExerciseItem exercise={exercise} onDelete={() => onDeleteExercise(index)} onEdit={(exercise) => onExerciseEdit(exercise, index)}/>
                    </div>
                ))
            }

            <AppButton text={"добавить упражнение"} type={TEXT} action={addExercise} style={{marginTop: "10px"}}/>
        </div>
    )
}

export default EditableTrainItem
