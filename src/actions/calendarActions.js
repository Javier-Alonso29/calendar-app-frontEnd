import { types } from "../types/types"

export const getCalendarEvents = () =>{
    return {
        type: types.getEvents
    }
}

export const onSetActiveEvent = (calendarEvent) =>{
    return {
        type: types.activeAnEvent,
        payload: calendarEvent
    }
}

export const onAddNewEvent = (calendarEvent) => {
    return {
        type: types.onAddEvent,
        payload: calendarEvent
    }
}

export const onUpdateEvent = (calendarEvent) =>{
    return {
        type: types.onEditEvent,
        payload: calendarEvent
    }
}

export const onDeleteEvent = () =>{
    return {
        type: types.onDeleteEvent
    }
}

export const onLoadEvents = (events) => {
    return {
        type: types.onLoadEvents,
        payload: events
    }
}

export const onLogOutCalendar = () => {
    return {
        type: types.onLogOutCalendar
    }
}