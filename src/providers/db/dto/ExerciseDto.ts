export default class ExerciseDto {
    constructor(trainUuid: string, uuid: string, name: string) {
        this.trainUuid = trainUuid;
        this.uuid = uuid;
        this.name = name;
    }

    trainUuid: string
    uuid: string
    name: string
}
