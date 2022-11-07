import ExerciseSet from "../../domain/trainProgramListContext/ExerciseSet";
import Exercise from "../../domain/trainProgramListContext/Exercise";
import Repository from "../../domain/trainProgramListContext/repository/Repository";
import {v4} from "uuid";
import Common from "../../domain/trainProgramListContext/Common";

export default class EditableExerciseItemModel {
    moveSetUp(index: number, exerciseSets: Array<ExerciseSet>): Array<ExerciseSet> {
        const newExerciseSet = [...exerciseSets]
        for (let i = 0; i < newExerciseSet.length; i++) {
            if(newExerciseSet[i].index === index && newExerciseSet[i - 1]) {
                newExerciseSet[i].index -= 1
                newExerciseSet[i - 1].index += 1;
                [newExerciseSet[i], newExerciseSet[i - 1]] = [newExerciseSet[i - 1], newExerciseSet[i]]
                break
            }
        }

        return newExerciseSet
    }

    moveSetDown(index: number, exerciseSets: Array<ExerciseSet>): Array<ExerciseSet> {
        const newExerciseSet = [...exerciseSets]
        for (let i = 0; i < newExerciseSet.length; i++) {
            if(newExerciseSet[i].index === index && newExerciseSet[i + 1]) {
                newExerciseSet[i].index += 1
                newExerciseSet[i + 1].index -= 1;
                [newExerciseSet[i], newExerciseSet[i + 1]] = [newExerciseSet[i + 1], newExerciseSet[i]]
                break
            }
        }

        return newExerciseSet
    }

    addExerciseSet(exerciseSets: Array<ExerciseSet>): Array<ExerciseSet> {
        const index = Common.getLastIndexOfExerciseSet(exerciseSets) + 1
        return [...exerciseSets, new ExerciseSet(v4(), 0, 0, 0, 0, index)]
    }

    deleteExerciseSet(index: number, exerciseSets: Array<ExerciseSet>): Array<ExerciseSet> {
        const newExerciseSets = [...exerciseSets]
        for (let i = 0; i < exerciseSets.length; i++) {
            if(exerciseSets[i].index === index) {
                newExerciseSets.splice(i, 1)
                continue
            }
            if(exerciseSets[i].index > index) {
                exerciseSets[i].index -= 1
            }
        }

        return newExerciseSets
    }

    async isExist(exercise: Exercise, repository: Repository): Promise<boolean> {
        return await repository.isExistExercise(exercise.uuid)
    }
}
