import Exercise from "./Exercise";

export default class Train {
    constructor(uuid: string, exercises: Array<Exercise>, name: string) {
        this.uuid = uuid;
        this.exercises = exercises;
        this.name = name
    }

    uuid: string
    exercises: Array<Exercise>
    name: string
}
