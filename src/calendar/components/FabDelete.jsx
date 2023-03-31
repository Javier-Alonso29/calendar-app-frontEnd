import { useUiStore } from '../../hooks';
import useCalendarStore from '../../hooks/useCalendarStore';

export const FabDelete = () => {

    const { startDeleteEvent, activeEvent, hasEventSelected, events } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleClickDelte = () =>{
        
        if(activeEvent){
            startDeleteEvent();
        }
    }

    const shouldDisplayElement = () => {
        //* Si se debe de mostrar cuando - tengo algo seleccionado
        //* No se debe de mostrar cuando tengo el modal abierto y tengo algo seleccionado
        if(!isDateModalOpen && hasEventSelected) return true;
        
        if(isDateModalOpen && hasEventSelected) return false;

    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleClickDelte}
            style={{
                display: shouldDisplayElement() ? '': 'none'
            }}
        >
            <i className='fas fa-trash-alt'></i>
        </button>
  )
}
