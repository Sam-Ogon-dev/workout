export default class TrainProgramDto {
    constructor(uuid: string, name: string, isDeleted?: boolean) {
        this.uuid = uuid;
        this.name = name;
        this.isDeleted = !!isDeleted
    }

    uuid: string
    name: string
    isDeleted: boolean
}
