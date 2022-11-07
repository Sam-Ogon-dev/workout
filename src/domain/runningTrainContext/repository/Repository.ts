import Train from "../Train";

export default interface Repository {
    getTrain(uuid: string): Promise<Train>
}
