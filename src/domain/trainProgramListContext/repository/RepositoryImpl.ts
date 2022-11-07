import Repository from "./Repository";
import TrainProgram from "../TrainProgram";
import {Db} from "../../../providers/db/dbConnect";
import DbProviderImpl from "../../../providers/db/DbProviderImpl";
import TrainProgramDto from "../../../providers/db/dto/TrainProgramDto";
import TrainDto from "../../../providers/db/dto/TrainDto";
import ExerciseDto from "../../../providers/db/dto/ExerciseDto";
import {ACTIVE_TRAIN_PROGRAM, EXERCISE, EXERCISE_SET, TRAIN, TRAIN_PROGRAM} from "../../../providers/db/objectStores";
import Train from "../Train";
import Exercise from "../Exercise";
import ExerciseSet from "../ExerciseSet";
import ExerciseSetDto from "../../../providers/db/dto/ExerciseSetDto";

export default class RepositoryImpl implements Repository {
    saveTrainProgram(trainProgram: TrainProgram): Promise<boolean> {
        return Db.instance().then(async db => {
            const dbProvider = new DbProviderImpl()
            const t = db.transaction([TRAIN_PROGRAM, TRAIN, EXERCISE, EXERCISE_SET], "readwrite")
            const okTrainProgram = await dbProvider.saveTrainProgram(t, new TrainProgramDto(trainProgram.uuid, trainProgram.name))

            if (!okTrainProgram) {
                return false
            }

            for (const train of trainProgram.trains) {
                const okTrain = await dbProvider.saveTrain(t, new TrainDto(trainProgram.uuid, train.uuid, train.name))
                if (!okTrain) {
                    return false
                }

                for (const exercise of train.exercises) {
                    const okExercise = await dbProvider.saveExercise(t, new ExerciseDto(train.uuid, exercise.uuid, exercise.name))
                    if (!okExercise) {
                        return false
                    }

                    for (const set of exercise.sets) {
                        const okExerciseSet = await dbProvider.saveExerciseSet(t, new ExerciseSetDto(set.uuid, exercise.uuid, set.repetitions, set.duration, set.weight, set.timeout, set.index))
                        if (!okExerciseSet) {
                            return false
                        }
                    }
                }
            }

            return true
        })
    }

    getTrainProgram(uuid: string): Promise<TrainProgram> {
        return Db.instance().then(async db => {
            const dbProvider = new DbProviderImpl()
            const t = db.transaction([TRAIN_PROGRAM, TRAIN, EXERCISE, EXERCISE_SET, ACTIVE_TRAIN_PROGRAM])
            const trains: Array<Train> = []

            const trainProgramDto = await dbProvider.getTrainProgram(t, uuid)
            const trainsDto = await dbProvider.getTrains(t, trainProgramDto.uuid)

            for (const trainDto of trainsDto) {
                const exercisesDto = await dbProvider.getExercises(t, trainDto.uuid)
                const exercises: Array<Exercise> = []

                for (const exerciseDto of exercisesDto) {
                    const exerciseSetsDto = await dbProvider.getExerciseSets(t, exerciseDto.uuid)

                    const exercise = new Exercise(exerciseDto.uuid, exerciseDto.name, exerciseSetsDto.map(exerciseSetDto => {
                        return new ExerciseSet(exerciseSetDto.uuid, exerciseSetDto.repetitions, exerciseSetDto.duration, exerciseSetDto.weight, exerciseSetDto.timeout, exerciseSetDto.index)
                    }))

                    exercises.push(exercise)
                }

                trains.push(new Train(trainDto.uuid, trainDto.name, exercises))
            }

            const activeTrainProgramDto = await dbProvider.getActiveTrainProgram(t)

            return new TrainProgram(
                trainProgramDto.uuid,
                trainProgramDto.name,
                trains,
                activeTrainProgramDto.trainProgramUuid === uuid)
        })
    }

    getTrainPrograms(): Promise<Array<TrainProgram>> {
        return Db.instance().then(async db => {
            const t = db.transaction(TRAIN_PROGRAM)
            const trainProgramsDto = await new DbProviderImpl().getTrainPrograms(t)
            const trainPrograms: Array<TrainProgram> = []

            for (const trainProgramDto of trainProgramsDto) {
                trainPrograms.push(await this.getTrainProgram(trainProgramDto.uuid))
            }

            return trainPrograms
        })
    }

    isExistExercise(uuid: string): Promise<boolean> {
       return Db.instance().then(async db => {
           const t = db.transaction(EXERCISE)
           const exerciseDto = await new DbProviderImpl().getExercise(t, uuid)
           return !!exerciseDto.uuid
       })
    }

    deleteTrainProgram(uuid: string): Promise<boolean> {
        return Db.instance().then(async db => {
            const t = db.transaction([TRAIN_PROGRAM, ACTIVE_TRAIN_PROGRAM], "readwrite")
            return new DbProviderImpl().deleteTrainProgram(t, uuid)
        })
    }

    setTrainProgramActive(uuid: string): Promise<boolean> {
        const dbProvider = new DbProviderImpl()
        return Db.instance().then(async db => {
            const t = db.transaction([ACTIVE_TRAIN_PROGRAM], "readwrite")
            await dbProvider.deleteAllActiveTrainProgram(t)
            return dbProvider.setActiveTrainProgram(t, uuid)
        })
    }
}
