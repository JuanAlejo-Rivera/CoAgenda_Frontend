import { useEffect, useMemo, useState } from "react";


//Tomo los valores enviados por useForm y los almaceno en initialForm y trabajo con ellos
export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState])//Se dispara cuando el formulario cambia

    useEffect(() => {
      setFormState(initialForm)
    }, [initialForm])//Se dispara cuando el formulario cambia
    

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            // Verifica si el valor de validación del formulario no es nulo; si no es nulo, significa que hay un error, por lo que retorna 'false'.
            if (formValidation[formValue] !== null) return false;
            
        }
    
        return true;
    }, [formValidation])


    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value //Asigna el objeto que le mandamos con los nombre ejemplo {namees: 'juan',emaill:'juan@algo.com'}
        });
    }

    const onResetForm = () => {
        setFormState(initialForm) //El initialForm trae los campos vacios solo lo asignamos y lo llamamos con la funsion
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {//Aqui traemos los  calores a evaluar email,password,displayname

            // console.log(formField)
            const [fn, errorMessage] = formValidations[formField];
            // console.log(fn)

            // Actualiza el estado del campo validación, si la función 'fn' (validación) retorna true, asigna 'null' (válido), de lo contrario, asigna el mensaje de error.
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            // console.log(fn(formState[formField]))
        }

        setFormValidation(formCheckedValues);
        // console.log(formCheckedValues)

    }






    return {
        ...formState, // Desestructuro los datos almacenados en el formState(username, email, pasword), los expongo para usarlos en otro componente
        formState, //Expongo los datos almacenados en formState
        onInputChange, //Expongo la funcion de onInputChange
        onResetForm,

        ...formValidation,
        isFormValid,
    };
};


