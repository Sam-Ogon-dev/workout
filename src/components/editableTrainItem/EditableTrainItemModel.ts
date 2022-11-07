import Exercise from "../../domain/trainProgramListContext/Exercise";
import {v4} from "uuid";
import ExerciseSet from "../../domain/trainProgramListContext/ExerciseSet";

export default class EditableTrainItemModel {
    static addExercise(exercises: Array<Exercise>): Array<Exercise> {
        return [
            ...exercises,
            new Exercise(
                v4(),
                "новое упражнение",
                [new ExerciseSet(v4(), 0, 0, 0, 0, 0)])
        ]
    }

    static deleteExercise(index: number, exercises: Array<Exercise>): Array<Exercise> {
        const newExerciseList = [...exercises]
        newExerciseList.splice(index, 1)
        return newExerciseList
    }
}
