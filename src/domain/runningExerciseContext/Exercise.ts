import ExerciseSet from "./ExerciseSet";

export default class Exercise {
    constructor(uuid: string, name: string, sets: Array<ExerciseSet>) {
        this.uuid = uuid;
        this.name = name;
        this.sets = sets
    }

    uuid: string
    name: string
    sets: Array<ExerciseSet>
}
