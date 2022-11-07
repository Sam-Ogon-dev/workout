import RepositoryImpl from "../../domain/trainProgramListContext/repository/RepositoryImpl";
import TrainProgram from "../../domain/trainProgramListContext/TrainProgram";
import Repository from "../../domain/trainProgramListContext/repository/Repository";

export default class TrainProgramListModel {
    getTrainPrograms(repository: RepositoryImpl): Promise<Array<TrainProgram>> {
        return repository.getTrainPrograms()
    }

    deleteTrainProgram(uuid: string, repository: Repository): Promise<boolean> {
        return repository.deleteTrainProgram(uuid)
    }
}
