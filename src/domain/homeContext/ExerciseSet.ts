export default class ExerciseSet {
    constructor(uuid: string, repetitions: number, duration: number, weight: number, timeout: number) {
        this.repetitions = repetitions;
        this.duration = duration;
        this.weight = weight;
        this.timeout = timeout
        this.uuid = uuid
    }

    repetitions: number
    duration: number
    weight: number
    timeout: number
    uuid: string
}
