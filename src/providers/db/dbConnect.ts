import migration_1 from "./migrations/migration_1";

export namespace Db {
    let db: Promise<IDBDatabase> | undefined = undefined

    function init(): Promise<IDBDatabase> {
       db = new Promise(resolve => {
            const con = indexedDB.open("train&train", 1)
            con.onupgradeneeded = () => {
                migration_1(con.result)
            }

            con.onsuccess = () => {
                resolve(con.result)
            }
        })

        return db
    }

    export function instance(): Promise<IDBDatabase> {
        return db || init()
    }
}
