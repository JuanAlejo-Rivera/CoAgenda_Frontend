import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en el API', () => {

    test('debe tener la configuracion por defecto', () => {

        // console.log(calendarApi);
        // console.log(process.env)
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    });

    test('debe de tener el x-token en el header de todas las peticiones', async () => {
        const token = 'ABC-123'
        // Se guarda el token en localStorage, que normalmente es leído por el interceptor del API
        localStorage.setItem('token', token);
        // Se hace una petición GET a la ruta '/auth' usando calendarApi
        const resp = await calendarApi.get('/auth');
        // console.log(resp)

        // Se espera que el header 'x-token' en la configuración de la petición sea igual al token que pusimos
        expect(resp.config.headers['x-token']).toBe(token)

    });

});