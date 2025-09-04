import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { CalendaModal, CalndarEvent, FabAddNew, FabDelete, Navbar } from "../"
import { getMessagesES, localizer } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'


export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadinEvents } = useCalendarStore()


  const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'week')//Si no encuentra vista trae el week y lo asigna

  // const [lenguaje, setLenguaje] = useState(() => {
  //   return JSON.parse(localStorage.getItem('lenguage')) || false;
  // });

  // const onChangeLenguage = () => {
  //   setLenguaje(current => {
  //     const newLenguage = !current;
  //     localStorage.setItem('lenguage', JSON.stringify(newLenguage)); // Guardar en caché
  //     return newLenguage;
  //   });
  // };



  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347cF7' : '#465660',
      borderRadious: '0px',
      opacity: 0.8,
      color: 'white',
      // border: isSelected ? '2px solid black' : 'none'
    }

    return {
      style
    }
  };

  const onDoubleClick = (event) => {
    // console.log({doubleClick: event})
    openDateModal()
    // toggleDateModal()
  }
  const onSelect = (event) => {
    // console.log(events) 
    setActiveEvent(event)
  }
  const onViewChange = (event) => {//El evento trae los mes,semana,día,agenda 
    localStorage.setItem('lastView', event); //guardamos el contenido del evento en el locaStorage
    setLasView(event)// actualiza el estado para que React renderice el cambio.
  }

  useEffect(() => {
    startLoadinEvents();
  }, [])


  // Cambio de calendarPage
  useEffect(() => {
    document.body.className = "app-body";
    return () => {
      document.body.className = "";
    };
  }, []);



  return (
    <>
      <Navbar />
      {/* lenguaje={lenguaje}  onChangeLenguage={onChangeLenguage} */}

      <Calendar
        culture='es' // Ahora siempre tendrá un valor
        localizer={localizer}
        events={events}
        defaultView={lasView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalndarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendaModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}




