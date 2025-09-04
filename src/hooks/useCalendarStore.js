import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvent } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavinEvent = async (calendarEvent) => {
        try {

            // todo: update event
            if (calendarEvent.id) {
                //Actualizar
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;

            }
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));



        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }





    }

    const StartdeleteEvent = async() => {

        try {
            //todo:llegar al back
            const { data } = await calendarApi.delete(`/events/${activeEvent.id}`)
            console.log(data)
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }

    }

    const startLoadinEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvent(data.eventos)
            dispatch(onLoadEvents(events))
            console.log(events)
        } catch (error) {
            console.log("Error cangando eventos", error)
        }
    }

    return {
        //*propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*metodos
        setActiveEvent,
        startSavinEvent,
        StartdeleteEvent,
        startLoadinEvents,
    }
}
