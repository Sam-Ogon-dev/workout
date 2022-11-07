import ExerciseDto from "./dto/ExerciseDto";
import TrainDto from "./dto/TrainDto";
import TrainProgramDto from "./dto/TrainProgramDto";
import ExerciseSetDto from "./dto/ExerciseSetDto";
import ActiveTrainProgramDto from "./dto/ActiveTrainProgramDto";


export default interface DbProvider {
    saveTrainProgram(t: IDBTransaction, trainProgramDto: TrainProgramDto): Promise<boolean>
    saveTrain(t: IDBTransaction, train: TrainDto): Promise<boolean>
    saveExercise(t: IDBTransaction, exerciseDto: ExerciseDto): Promise<boolean>
    getTrainProgram(t: IDBTransaction, uuid: string): Promise<TrainProgramDto>
    deleteTrainProgram(t: IDBTransaction, uuid: string): Promise<boolean>
    getTrainPrograms(t: IDBTransaction): Promise<Array<TrainProgramDto>>
    getTrain(t: IDBTransaction, uuid: string): Promise<TrainDto>
    getTrains(t: IDBTransaction, trainProgramUuid: string): Promise<Array<TrainDto>>
    getExercise(t: IDBTransaction, uuid: string): Promise<ExerciseDto>
    getExercises(t: IDBTransaction, trainUuid: string): Promise<Array<ExerciseDto>>
    saveExerciseSet(t: IDBTransaction, exerciseSetDto: ExerciseSetDto): Promise<boolean>
    getExerciseSets(t: IDBTransaction, exerciseUuid: string): Promise<Array<ExerciseSetDto>>
    setActiveTrainProgram(t: IDBTransaction, uuid: string): Promise<boolean>
    getActiveTrainProgram(t: IDBTransaction): Promise<ActiveTrainProgramDto>
    deleteAllActiveTrainProgram(t: IDBTransaction): Promise<boolean>
}
