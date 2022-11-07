import Exercise from "./Exercise";

export default class Train {
    constructor(uuid: string, name: string, exercises: Array<Exercise>) {
        this.uuid = uuid;
        this.name = name;
        this.exercises = exercises;
    }

    uuid: string
    name: string
    exercises: Array<Exercise>
}
