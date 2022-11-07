import Repository from "./Repository";
import Exercise from "../Exercise";
import {Db} from "../../../providers/db/dbConnect";
import {EXERCISE, EXERCISE_SET} from "../../../providers/db/objectStores";
import DbProviderImpl from "../../../providers/db/DbProviderImpl";
import ExerciseSet from "../ExerciseSet";

export default class RepositoryImpl implements Repository{
    getExercise(uuid: string): Promise<Exercise> {
        const dbProvider = new DbProviderImpl()
        return Db.instance().then(async db => {
            const t = db.transaction([EXERCISE, EXERCISE_SET])
            const exerciseDto = await dbProvider.getExercise(t, uuid)
            const exerciseSetsDto = await dbProvider.getExerciseSets(t, uuid)

            return new Exercise(exerciseDto.uuid, exerciseDto.name, exerciseSetsDto.map(exerciseSetDto => new ExerciseSet(
                exerciseSetDto.uuid,
                exerciseSetDto.repetitions,
                exerciseSetDto.duration,
                exerciseSetDto.timeout,
                exerciseSetDto.weight,
                0
            )))
        })
    }
}
