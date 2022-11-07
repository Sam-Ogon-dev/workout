import TrainProgram from "../../domain/homeContext/TrainProgram";
import Repository from "../../domain/homeContext/repository/Repository";

export default class MainModel {
    getTrainProgram(repository: Repository): Promise<TrainProgram> {
        return repository.getTrainProgram()
    }
}
