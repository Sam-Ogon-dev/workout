import Exercise from "../../domain/runningExerciseContext/Exercise";
import Repository from "../../domain/runningExerciseContext/repository/Repository";

export default class RunningExerciseModel {
    getExercise(uuid: string, repository: Repository): Promise<Exercise> {
        return repository.getExercise(uuid)
    }
}
