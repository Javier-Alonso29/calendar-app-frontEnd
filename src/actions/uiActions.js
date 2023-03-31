import { types } from "../types/types"

export const onOpenDateModalAction = (isOpen) =>{
    // Si esta abierto lo vamos a cerrar
    if(isOpen){
        return {
            type: types.onOpenDate
        }
    }else{
        return {
            type: types.onCloseDate
        }
    }
}