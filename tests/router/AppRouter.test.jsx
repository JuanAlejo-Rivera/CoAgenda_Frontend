import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";


jest.mock('../../src/hooks/useAuthStore')

jest.mock('../../src/calendar',() =>({
    CalendarPage:() => <h1>CalendarPage</h1>
}))


describe('Pruebas en el <AppRouter/>', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga y llamar el checkAuthToken', () => {


        useAuthStore.mockReturnValue({
            checkAuthToken: mockCheckAuthToken,
            status: 'checking'
        })

        render(<AppRouter />);
        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled
        
        // screen.debug();
    });

    test('debe de mostrar el loguin en caso de no estar autenticado', () => { 
        
        useAuthStore.mockReturnValue({
            checkAuthToken: mockCheckAuthToken,
            status: 'not-authenticated'
        })

        const{container} = render(
            <MemoryRouter initialEntries={['/auth2/algo']}>
                <AppRouter />
            </MemoryRouter>
        );
        // screen.debug()

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
     });

    test('debe de mostrar el calendario si estamos autenticados', () => { 
        
        useAuthStore.mockReturnValue({
            checkAuthToken: mockCheckAuthToken,
            status: 'authenticated'
        })

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );
        // screen.debug()

        expect(screen.getByText('CalendarPage')).toBeTruthy();
     });
});