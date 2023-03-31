import { types } from "../types/types"

export const login = (user) =>{
    return {
        type: types.logInUser,
        payload: user
    }
}

export const logOut = (user) =>{
    return {
        type: types.logOutUser,
        payload: user
    }
}