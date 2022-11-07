import Train from "./Train";

export default class TrainProgram {
    constructor(uuid: string, name:string, trains: Array<Train>, isActive?: boolean) {
        this.uuid = uuid
        this.name = name
        this.trains = trains
        this.isActive = !!isActive
    }

    uuid: string
    name: string
    trains: Array<Train>
    isActive: boolean
}
