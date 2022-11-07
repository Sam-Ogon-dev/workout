import Train from "../../domain/trainProgramListContext/Train";
import {v4} from "uuid";
import Repository from "../../domain/trainProgramListContext/repository/Repository";
import TrainProgram from "../../domain/trainProgramListContext/TrainProgram";

export default class CreateTrainProgramModel {
    saveTrainProgram(trains: Array<Train>, trainProgramName: string, repository: Repository): Promise<boolean> {
        return repository.saveTrainProgram(new TrainProgram(v4(), trainProgramName, trains))
    }
}
