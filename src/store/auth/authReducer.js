import { types } from "../../types/types";

const initialState = {
    activeUsers: [],
    userLogged: null
}

export const authReducer = (state = initialState, action) =>{

    switch (action.type) {

        case types.logInUser:
            
            return {
                activeUsers: [...state.activeUsers, action.payload],
                userLogged: action.payload
            }

        case types.logOutUser:

            return {
                ...state
            }
    
        default:
            return state;
    }

}