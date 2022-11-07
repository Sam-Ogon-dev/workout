export default class ExerciseSet {
    constructor(uuid: string, repetitions: number, duration: number, timeout: number, weight: number, index: number) {
        this.repetitions = repetitions
        this.duration = duration
        this.timeout = timeout
        this.weight = weight
        this.uuid = uuid
        this.index = index
    }

    uuid: string
    repetitions: number
    duration: number
    timeout: number
    weight: number
    isPassed: boolean = false
    index: number
}
