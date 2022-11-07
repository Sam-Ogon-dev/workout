import Train from "../../domain/trainProgramListContext/Train";
import Repository from "../../domain/trainProgramListContext/repository/Repository";
import TrainProgram from "../../domain/trainProgramListContext/TrainProgram";

export default class EditTrainProgramModel {
    getTrainProgram(uuid: string, repository: Repository): Promise<TrainProgram> {
        return repository.getTrainProgram(uuid)
    }

    saveTrainProgram(uuid: string, trains: Array<Train>, trainProgramName: string, repository: Repository): Promise<boolean> {
        return repository.saveTrainProgram(new TrainProgram(uuid, trainProgramName, trains))
    }
}
