import {bindActionCreators, configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

class State {
    title = ""
}

const headerTitle = createSlice({
    name: 'headerTitle',
    initialState: new State(),
    reducers: {
        setTitle: (state: State, action: PayloadAction<string>) => {
            return { ...state, title: action.payload }
        }
    }
})

export const store = configureStore({
    reducer: {
        headerTitle: headerTitle.reducer
    }
})

type RootState = ReturnType<typeof store.getState>

export const actions = headerTitle.actions
export const useAppState: TypedUseSelectorHook<RootState> = useSelector
export function useAppActions() {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}


