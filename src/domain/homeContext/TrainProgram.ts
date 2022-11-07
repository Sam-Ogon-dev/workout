import Train from "./Train";

export default class TrainProgram {
    constructor(uuid: string, name:string, trains: Array<Train>) {
        this.uuid = uuid
        this.name = name
        this.trains = trains
    }

    uuid: string
    name: string
    trains: Array<Train>
}
