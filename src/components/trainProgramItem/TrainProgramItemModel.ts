import Repository from "../../domain/trainProgramListContext/repository/Repository";

export default class TrainProgramItemModel {
    setActive(uuid: string, repository: Repository): Promise<boolean> {
        return repository.setTrainProgramActive(uuid)
    }
}
