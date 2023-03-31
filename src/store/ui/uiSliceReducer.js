import { types } from "../../types/types";

const initialState = {
    isDateModalOpen: false
}


export const uiSliceReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.onOpenDate:
            
            return {
                ...state,
                isDateModalOpen: true
            }

        case types.onCloseDate:

            return {
                ...state,
                isDateModalOpen: false
            }
    
        default:
            return state;
    }

}