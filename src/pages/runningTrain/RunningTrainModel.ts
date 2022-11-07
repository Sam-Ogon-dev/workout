import Repository from "../../domain/runningTrainContext/repository/Repository";
import Train from "../../domain/runningTrainContext/Train";

export default class RunningTrainModel {
    getTrain(uuid: string, repository: Repository): Promise<Train> {
        return repository.getTrain(uuid)
    }
}
