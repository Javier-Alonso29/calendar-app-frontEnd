import { type } from "@testing-library/user-event/dist/type";
import { addHours } from "date-fns";
import { types } from "../../types/types";

/* const tempEvent = {
    _id: new Date().getTime(),
    title: 'cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date, 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Javier Alonso'
    }
} */

const initialState = {
    isLoading: true,
    events: [

    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
    
        case types.onAddEvent:
            return {
                events: [...state.events, action.payload],
                activeEvent: null
            };

        case types.activeAnEvent:
            return {
                ...state, 
                activeEvent: action.payload
            }

        case types.onEditEvent:

            const updatedEvents = state.events.map(event => {
                if(event._id === action.payload._id){
                    return action.payload
                }

                return event
            })

            return {
                ...state,
                events: updatedEvents
            }

        case types.onDeleteEvent:

            const eventsWithOutCurrentEvent = state.events.filter((event) => event._id !== state.activeEvent._id)

            console.log(eventsWithOutCurrentEvent);

            return {
                activeEvent: null,
                events: eventsWithOutCurrentEvent
            }

        case types.onLoadEvents:

            const newEvents = []
            action.payload.forEach(event => {

                const exist = state.events.some(dbEvent => dbEvent._id === event._id)

                if(!exist){
                    newEvents.push(event)
                }

            })

            return {
                ...state,
                events: [...state.events, ...newEvents],
                isLoading: false
            }

        case types.onLogOutCalendar:
            return initialState;

        default:
            return state;
    }

}