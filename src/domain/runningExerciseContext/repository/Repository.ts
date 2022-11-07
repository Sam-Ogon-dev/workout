import Exercise from "../Exercise";

export default interface Repository {
    getExercise(uuid: string): Promise<Exercise>
}
