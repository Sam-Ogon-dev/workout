import {ACTIVE_TRAIN_PROGRAM, EXERCISE, EXERCISE_SET, TRAIN, TRAIN_PROGRAM} from "../objectStores";

export default function migration_1(db: IDBDatabase) {
    const trainProgramObjStore = db.createObjectStore(TRAIN_PROGRAM, {keyPath: "uuid"})
    trainProgramObjStore.createIndex("isDeleted", "isDeleted")
    trainProgramObjStore.createIndex("isActive", "isActive")

    const trainObjStore = db.createObjectStore(TRAIN, {keyPath: "uuid"})
    trainObjStore.createIndex("trainProgramUuid", "trainProgramUuid")

    const exerciseObjStore = db.createObjectStore(EXERCISE, {keyPath: "uuid"})
    exerciseObjStore.createIndex("trainUuid", "trainUuid")

    const exerciseSet = db.createObjectStore(EXERCISE_SET, {keyPath: "uuid"})
    exerciseSet.createIndex("exerciseUuid", "exerciseUuid")

    const activeTrainProgram = db.createObjectStore(ACTIVE_TRAIN_PROGRAM, {keyPath: "trainProgramUuid"})
}
