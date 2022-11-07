export default class TrainDto {
    constructor(trainProgramUuid: string, uuid: string, name: string) {
        this.trainProgramUuid = trainProgramUuid;
        this.uuid = uuid;
        this.name = name;
    }

    trainProgramUuid: string
    uuid: string
    name: string
}
