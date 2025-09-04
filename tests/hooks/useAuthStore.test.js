import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialStete, notauthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}


describe('Pruebas en el useAuthStore', () => {
    beforeEach(() => localStorage.clear()) //limpiar el localStorage antes de cada prueba
    test('Debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialStete }); //aqui se definen las propiedades del slice

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        // console.log(result.current)
        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            StartRegister: expect.any(Function),
            startLogout: expect.any(Function),
        })

    });

    test('startLogin debe de realizar el login correctamente', async () => {

        const mockstore = getMockStore({ ...notauthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockstore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials)
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '680696a7b5e3ce2f6657a80b' }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))

    })

    test('start login debe fallar la autenticacion', async () => {

        const mockstore = getMockStore({ ...notauthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockstore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin({ email: 'algo@google.com', password: '123456789' })
        });

        const { errorMessage, status, user } = result.current;
        expect(localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined),
        );

    });

    test('StartRegister debe de crear un usuario', async () => {

        const newUser = { email: 'algo@google.com', password: '123456789', name: 'Test user2' }

        const mockstore = getMockStore({ ...notauthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockstore}>{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                "ok": true,
                "uid": "151484182-test",
                "name": "Test User",
                "token": "Algun token"
            }
        });//este spy es para simular la respuesta de la api, en este caso calendarApi.post, cuando se haga la peticion

        await act(async () => {
            await result.current.StartRegister(newUser)
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '151484182-test' }
        });
        spy.mockRestore(); //restaurar el mock de la api, para que no afecte a otras pruebas

    });

    test('StartRegister debe de fallar el registro de usuario', async () => {


        const mockstore = getMockStore({ ...notauthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockstore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.StartRegister(testUserCredentials)
        });


        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario ya existe',
            status: 'not-authenticated',
            user: {},
        });


    });

    test('checkAuthToken debe fallar si no hay un token', async () => {
        const mockstore = getMockStore({ ...initialStete });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockstore}>{children}</Provider>
        });

        // console.log('token', localStorage.getItem('token'))//Ver el token

        await act(async () => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })

    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {


        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token);
        // console.log(data)

        const mockstore = getMockStore({ ...initialStete });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockstore}>{children}</Provider>
        });

        // console.log('token', localStorage.getItem('token'))//Ver el token

        await act(async () => {
            await result.current.checkAuthToken('token')
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '680696a7b5e3ce2f6657a80b' }
        })

    });
    


});