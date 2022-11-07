import TrainProgram from "../TrainProgram";

export default interface Repository {
    getTrainProgram(): Promise<TrainProgram>
}
