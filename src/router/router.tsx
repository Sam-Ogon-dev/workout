import {Route, Routes} from "react-router-dom";
import Main from "../pages/main/Main";
import TrainProgramList from "../pages/trainProgramList/TrainProgramList";
import React from "react";
import CreateTrainProgram from "../pages/createTrainProgram/CreateTrainProgram";
import EditTrainProgram from "../pages/editTrainProgram/EditTrainProgram";
import RunningTrain from "../pages/runningTrain/RunningTrain";
import RunningExercise from "../pages/runningExercise/RunningExercise";

function AppRoutes() {
    return (
        <Routes>
            <Route path={"/"} element={ <Main/>} />
            <Route path={"/train-list"} element={<TrainProgramList />}/>
            <Route path={"/create-train"} element={<CreateTrainProgram />}/>
            <Route path={"/train-programs/:uuid/edit"} element={<EditTrainProgram />}/>
            <Route path={"/trains/:uuid/running"} element={<RunningTrain />}/>
            <Route path={"/trains/:uuid/running/exercises/:exerciseUuid"} element={<RunningExercise />}/>
        </Routes>
    )
}

export default AppRoutes
