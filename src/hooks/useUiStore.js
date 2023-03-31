
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenDateModalAction } from '../actions/uiActions';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModalAction(true) )
    }

    const closeDateModal = () =>{
        dispatch( onOpenDateModalAction(false) )
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Metodos
        openDateModal,
        closeDateModal
    }

}
