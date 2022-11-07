import Train from "./Train";
import {v4} from "uuid";
import ExerciseSet from "./ExerciseSet";

export default class Common {
    static deleteTrain(index: number, trains: Array<Train>): Array<Train> {
        const newTrainList = [...trains]
        newTrainList.splice(index, 1)
        return newTrainList
    }

    static addTrain(trainList: Array<Train>): Array<Train> {
        return [...trainList, new Train(v4(), "", [])]
    }

    static getLastIndexOfExerciseSet(exerciseSets: Array<ExerciseSet>): number {
        let lastIndex = 0

        for (const exerciseSet of exerciseSets) {
            if(exerciseSet.index > lastIndex) {
                lastIndex = exerciseSet.index
            }
        }

        return lastIndex
    }
}
