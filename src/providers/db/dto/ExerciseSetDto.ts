export default class ExerciseSetDto {
    constructor(uuid: string, exerciseUuid: string, repetitions: number, duration: number, weight: number, timeout: number, index: number) {
        this.exerciseUuid = exerciseUuid
        this.repetitions = repetitions;
        this.duration = duration;
        this.weight = weight;
        this.timeout = timeout
        this.uuid = uuid
        this.index = index
    }

    exerciseUuid: string
    repetitions: number
    duration: number
    weight: number
    timeout: number
    uuid: string
    index: number
}
