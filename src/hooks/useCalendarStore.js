import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getCalendarEvents, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../actions/calendarActions";
import { convertDateEvents } from "../helpers";
import calendarApi from './../api/calendarApi'

const useCalendarStore = () => {
  
    const {events, activeEvent} = useSelector( state => state.calendar );
    const { user } = useSelector(state =>  state.auth)
    const dispatch = useDispatch();

    const getEventsStore = () =>{
        dispatch(getCalendarEvents());
    }

    const setActiveEvent = (calendarEvent) =>{
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async(calendarEvent) =>{

        try {
        
            if(calendarEvent._id){
                //* Actualizando evento
                await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);
                dispatch( onUpdateEvent({...calendarEvent}) )
                return;
            }
            
            //* Creando un nuevo evento
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch( onAddNewEvent({...calendarEvent, _id: data.event._id, user }) )

        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }


    }

    const startDeleteEvent = async() =>{
        
        try {
            
            await calendarApi.delete(`/events/${activeEvent._id}`)
            dispatch( onDeleteEvent() );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar el evento', error.response.data.msg, 'error')
        }

    }

    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events');

            const events = convertDateEvents(data.events);
            dispatch(onLoadEvents(events))

        } catch (error) {
            console.log("Error cargando eventos ", error);
        }
    }

    return {
        //* Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Metodos
        getEventsStore,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }

}

export default useCalendarStore