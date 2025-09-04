import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe('Pruebas en el uiSlice', () => { 
    test('debe regresar el estado por defecto', () => { 
        
        // expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen: false});
     });

     test('debe de cambiar el isDatemodalOpenCorrectamente', () => { 
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());//el reducer lee la ccion del onOpenDateModal y cambia el estado
        expect(state.isDateModalOpen).toBeTruthy();
        
        state = uiSlice.reducer(state, onCloseDateModal());//el reducer lee la ccion del onOpenDateModal y cambia el estado
        expect(state.isDateModalOpen).toBeFalsy();
       
      })
 });