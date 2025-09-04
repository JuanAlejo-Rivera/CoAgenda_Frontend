import { authSlice, clearErroMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialStete } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en el authSlice', () => {
    test('debe regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialStete);

    });

    test('debe de realizar un login', () => {

        const state = authSlice.reducer(initialStete, onLogin(testUserCredentials))
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout', () => {

        const state = authSlice.reducer(authenticatedState, onLogout())
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        });
    });

    test('debe de realizar el logout, credenciales invalidas', () => {
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage,
        });
    });

    test('debe limpiar el mensaje de error de error', () => { 
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer(state, clearErroMessage());
        console.log(newState.errorMessage)
        expect(newState.errorMessage).toBe(undefined)
     });

     test('debe de mostrar el estado checking', () => { 
        
        const state = authSlice.reducer(authenticatedState, onChecking())
        expect(state).toEqual({
            status : 'checking',
            user : {},
            errorMessage : undefined,
        })
      });

});