import React, { useState } from 'react'
import { useEffect } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '..'
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'
import { useUiStore } from '../../hooks'
import { useAuthStore } from '../../hooks/useAuthStore'
import useCalendarStore from '../../hooks/useCalendarStore'

export const CalendarPage = () => {

  const { openDateModal } = useUiStore() 
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = ( event, start, end, isSelected ) =>{

    console.log(event.user);

    const isMyEvent = (user.uid === event.user.uid) || (user.uid === event.user._id)

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '3px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) =>{
    openDateModal();
  }

  const onSelect = (event) =>{
    setActiveEvent(event)
  }


  const onViewChange = (event) =>{

    localStorage.setItem('lastView', event)
    setLastView(event)
    
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <Navbar />

      <div>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px )' }}
          messages={getMessagesES()}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChange }
        />
      </div>

      <CalendarModal />
      <FabAddNew />
      {
        (events.length > 0 ) && <FabDelete />
      }

    </>
  )
}
