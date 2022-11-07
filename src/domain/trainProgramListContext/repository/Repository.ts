import TrainProgram from "../TrainProgram";

export default interface Repository {
    saveTrainProgram(trainProgram: TrainProgram): Promise<boolean>
    getTrainProgram(uuid: string): Promise<TrainProgram>
    getTrainPrograms(): Promise<Array<TrainProgram>>
    isExistExercise(uuid: string): Promise<boolean>
    deleteTrainProgram(uuid: string): Promise<boolean>
    setTrainProgramActive(uuid: string): Promise<boolean>
}
