import DbProvider from "./DbProvider";
import TrainProgramDto from "./dto/TrainProgramDto";
import ExerciseDto from "./dto/ExerciseDto";
import TrainDto from "./dto/TrainDto";
import {ACTIVE_TRAIN_PROGRAM, EXERCISE, EXERCISE_SET, TRAIN, TRAIN_PROGRAM} from "./objectStores";
import ExerciseSetDto from "./dto/ExerciseSetDto";
import ActiveTrainProgramDto from "./dto/ActiveTrainProgramDto";

export default class DbProviderImpl implements DbProvider {
    saveTrainProgram(t: IDBTransaction, trainProgram: TrainProgramDto): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const req = t.objectStore(TRAIN_PROGRAM).put({...trainProgram, isDeleted: +trainProgram.isDeleted})

            req.onsuccess = () => {
                resolve(true)
            }

            req.onerror = () => {
                resolve(false)
            }
        })
    }

    saveExercise(t: IDBTransaction, exercise: ExerciseDto): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const req = t.objectStore(EXERCISE).put(exercise)

            req.onsuccess = () => {
                resolve(true)
            }

            req.onerror = () => {
                resolve(false)
            }
        })
    }

    saveTrain(t: IDBTransaction, train: TrainDto): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const req = t.objectStore(TRAIN).put(train)

            req.onsuccess = () => {
                resolve(true)
            }

            req.onerror = () => {
                resolve(false)
            }
        })
    }

    getExercise(t: IDBTransaction, uuid: string): Promise<ExerciseDto> {
        return new Promise<ExerciseDto>(resolve => {
            const req = t.objectStore(EXERCISE).get(uuid)
            req.onsuccess = () => {
                return resolve(req.result || {});
            }
        })
    }

    getExercises(t: IDBTransaction, trainUuid: string): Promise<Array<ExerciseDto>> {
        return new Promise<Array<ExerciseDto>>(resolve => {
            const req = t.objectStore(EXERCISE).index("trainUuid").getAll(trainUuid)
            req.onsuccess = () => {
                resolve(req.result)
            }
        })
    }

    getTrain(t: IDBTransaction, uuid: string): Promise<TrainDto> {
        return new Promise<TrainDto>(resolve => {
            const req = t.objectStore(TRAIN).get(uuid)
            req.onsuccess = () => {
                resolve(req.result)
            }
        })
    }

    getTrainProgram(t: IDBTransaction, uuid: string): Promise<TrainProgramDto> {
        return new Promise<TrainProgramDto>(resolve => {
            const req = t.objectStore(TRAIN_PROGRAM).get(uuid)
            req.onsuccess = () => {
                resolve({...req.result, isDeleted: !!req.result.isDeleted})
            }
        })
    }

    getTrainPrograms(t: IDBTransaction): Promise<Array<TrainProgramDto>> {
        return new Promise<Array<TrainProgramDto>>(resolve => {
            const req = t.objectStore(TRAIN_PROGRAM)
                .index("isDeleted")
                .getAll(0)
            req.onsuccess = () => {
                resolve(req.result.map(item => ({...item, isDeleted: +item.isDeleted})))
            }
            req.onerror = (e) => {
                console.log(e)
                resolve([])
            }
        })
    }

    getTrains(t: IDBTransaction, trainProgramUuid: string): Promise<Array<TrainDto>> {
        return new Promise<Array<TrainDto>>(resolve => {
            const req = t.objectStore(TRAIN).index("trainProgramUuid").getAll(trainProgramUuid)
            req.onsuccess = () => {
                resolve(req.result)
            }
        })
    }

    saveExerciseSet(t: IDBTransaction, exerciseSetDto: ExerciseSetDto): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const req = t.objectStore(EXERCISE_SET).put(exerciseSetDto)
            req.onsuccess = () => {
                resolve(true)
            }
            req.onerror = (e) => {
                console.log(e)
            }
        })
    }

    getExerciseSets(t: IDBTransaction, exerciseUuid: string): Promise<Array<ExerciseSetDto>> {
        return new Promise<Array<ExerciseSetDto>>(resolve => {
            const req = t.objectStore(EXERCISE_SET).index("exerciseUuid").getAll(exerciseUuid)
            req.onsuccess = () => {
                resolve(req.result)
            }
        })
    }

    deleteTrainProgram(t: IDBTransaction, uuid: string): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
            const activeTrainProgramDto = await this.getActiveTrainProgram(t)
            const trainProgramDto = await this.getTrainProgram(t, uuid)

            if(activeTrainProgramDto.trainProgramUuid === trainProgramDto.uuid) {
                await this.deleteAllActiveTrainProgram(t)
            }

            trainProgramDto.isDeleted = true
            const req = t.objectStore(TRAIN_PROGRAM).put({ ...trainProgramDto, isDeleted: +trainProgramDto.isDeleted })

            req.onsuccess = () => {
                resolve(true)
            }
        })
    }

    async setActiveTrainProgram(t: IDBTransaction, uuid: string): Promise<boolean> {
        return new Promise(resolve => {
            const req = t.objectStore(ACTIVE_TRAIN_PROGRAM).add(new ActiveTrainProgramDto(uuid))
            req.onsuccess = () => {
                resolve(true)
            }
        })
    }

    deleteAllActiveTrainProgram(t: IDBTransaction): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const req = t.objectStore(ACTIVE_TRAIN_PROGRAM).clear()
            req.onsuccess = () => {
                resolve(true)
            }
        })
    }

    getActiveTrainProgram(t: IDBTransaction): Promise<ActiveTrainProgramDto> {
        return new Promise<ActiveTrainProgramDto>(async resolve => {
            const activeTrainProgramDtoReq = t.objectStore(ACTIVE_TRAIN_PROGRAM).getAll()
            activeTrainProgramDtoReq.onsuccess = () => {
                resolve(activeTrainProgramDtoReq.result[0] || {})
            }
        })
    }
}
