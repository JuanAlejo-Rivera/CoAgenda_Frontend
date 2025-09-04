import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock('../../../src/hooks/useCalendarStore')


describe('Pruebas en el <FabDelete/>', () => {

    const mockStatrDeleteEvent = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false,
        })

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete')
        // console.log(btn.classList.toString())
        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('none')

        // screen.debug()
    });

    test('Debe de mostrar el botón si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
        })

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete')

        expect(btn.style.display).toBe('')

        // screen.debug()
    });

    test('Debe de llamar StartdeleteEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            StartdeleteEvent: mockStatrDeleteEvent
        })

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete')
        fireEvent.click(btn);
        expect(mockStatrDeleteEvent).toHaveBeenCalled()

        // screen.debug()
    });

});