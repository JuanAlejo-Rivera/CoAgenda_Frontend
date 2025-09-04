
export const events = [
    {
        id: '1',
        start: new Date('202-04-23 13:00:00'),
        end: new Date('202-04-23 15:00:00'),
        title: 'cumpleaños de alejandro test',
        notes: 'comprar torta',
    },
    {
        id: '2',
        start: new Date('202-04-24 13:00:00'),
        end: new Date('202-04-24 15:00:00'),
        title: 'cumpleaños de juan test',
        notes: 'comprar helado',
    },
    {
        id: '3',
        start: new Date('202-04-24 13:00:00'),
        end: new Date('202-04-24 15:00:00'),
        title: 'cumpleaños de juan test',
        notes: 'comprar helado',
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}
export const calendarWithEvensState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}
export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]},
}