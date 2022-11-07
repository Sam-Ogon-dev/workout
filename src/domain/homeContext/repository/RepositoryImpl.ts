import Repository from "./Repository";
import {Db} from "../../../providers/db/dbConnect";
import DbProviderImpl from "../../../providers/db/DbProviderImpl";
import {ACTIVE_TRAIN_PROGRAM, EXERCISE, EXERCISE_SET, TRAIN, TRAIN_PROGRAM} from "../../../providers/db/objectStores";
import TrainProgram from "../TrainProgram";
import Train from "../Train";
import Exercise from "../Exercise";
import ExerciseSet from "../ExerciseSet";

export default class RepositoryImpl implements Repository {
    getTrainProgram(): Promise<TrainProgram> {
        return Db.instance().then(async db => {
            const dbProvider = new DbProviderImpl()
            const t = db.transaction([TRAIN_PROGRAM, TRAIN, EXERCISE, EXERCISE_SET, ACTIVE_TRAIN_PROGRAM])
            const trains: Array<Train> = []

            const activeTrainProgramDto = await dbProvider.getActiveTrainProgram(t)
            if(!activeTrainProgramDto.trainProgramUuid) {
                return new TrainProgram("", "", [])
            }

            const trainProgramDto = await dbProvider.getTrainProgram(t, activeTrainProgramDto.trainProgramUuid)
            const trainsDto = await dbProvider.getTrains(t, trainProgramDto.uuid)

            for (const trainDto of trainsDto) {
                const exercisesDto = await dbProvider.getExercises(t, trainDto.uuid)
                const exercises: Array<Exercise> = []

                for (const exerciseDto of exercisesDto) {
                    const exerciseSetsDto = await dbProvider.getExerciseSets(t, exerciseDto.uuid)

                    const exercise = new Exercise(exerciseDto.uuid, exerciseDto.name, exerciseSetsDto.map(exerciseSetDto => {
                        return new ExerciseSet(exerciseSetDto.uuid, exerciseSetDto.repetitions, exerciseSetDto.duration, exerciseSetDto.weight, exerciseSetDto.timeout)
                    }))

                    exercises.push(exercise)
                }

                trains.push(new Train(trainDto.uuid, trainDto.name, exercises))
            }

            return new TrainProgram(trainProgramDto.uuid, trainProgramDto.name, trains)
        })
    }
}
