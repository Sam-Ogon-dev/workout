import Repository from "./Repository";
import Train from "../Train";
import {Db} from "../../../providers/db/dbConnect";
import {EXERCISE, TRAIN} from "../../../providers/db/objectStores";
import DbProviderImpl from "../../../providers/db/DbProviderImpl";
import Exercise from "../Exercise";

export default class RepositoryImpl implements Repository {
    getTrain(uuid: string): Promise<Train> {
        const dbProvider = new DbProviderImpl()

        return Db.instance().then(async db => {
            const t = db.transaction([TRAIN, EXERCISE])
            const trainDto = await  dbProvider.getTrain(t, uuid)
            const exercisesDto = await dbProvider.getExercises(t, trainDto.uuid)
            const train = new Train(trainDto.uuid, [], trainDto.name)

            for (const exerciseDto of exercisesDto) {
                train.exercises.push(new Exercise(exerciseDto.uuid, exerciseDto.name))
            }

            return train
        })
    }
}
