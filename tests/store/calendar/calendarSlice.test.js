import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEvensState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en el calendar Slice', () => {
  test('Debe regresar el estado por defecto', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent debe de activar el evento', () => {

    const state = calendarSlice.reducer(calendarWithEvensState, onSetActiveEvent(events[0]))
    expect(state.activeEvent).toEqual(events[0])
  });

  test('onAddNewEvent debe agregar el evento', () => {

    const newEvent = {
      id: '3',
      start: new Date('202-04-24 13:00:00'),
      end: new Date('202-04-24 15:00:00'),
      title: 'cumpleaños de juan test',
      notes: 'comprar helado',
    }

    const state = calendarSlice.reducer(calendarWithEvensState, onAddNewEvent(newEvent))
    expect(state.activeEvent).toBe(null)
    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent debe actualizar el evento', () => {

    const updateEvent = {
      id: '1',
      start: new Date('202-04-24 13:00:00'),
      end: new Date('202-04-24 15:00:00'),
      title: 'cumpleaños de juan test de actualizacion',
      notes: 'comprar helado actualizado',
    }

    const state = calendarSlice.reducer(calendarWithEvensState, onUpdateEvent(updateEvent))
    expect(state.events).toContain(updateEvent)
  });

  test('onDeleteEvent debe de borrar el vento activo', () => {

    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())

    expect(state.activeEvent).toBe(null)
    expect(state.events).not.toContain(events[0])
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events))
    // console.log(state)
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events)

    const newState = calendarSlice.reducer(state, onLoadEvents(events))
    expect(newState).toEqual(state)

  });

  test('onLogoutCalendar debe de limpiar el estado', () => {

    const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())
    expect(state).toEqual(initialState)

  });

});