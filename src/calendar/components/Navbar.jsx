import { useAuthStore } from "../../hooks";

export const Navbar = () => {


    const { startLogout, user} = useAuthStore();

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                { user.name }
            </span>
    
            <button 
              className="btn btn-outline-danger"
              onClick={ startLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
      )
    }








//Con boton cambio de idioma
// export const Navbar = ({onChangeLenguage, lenguaje }) => {


//     const { startLogin, errorMessage, StartRegister} = useAuthStore();


//     return (
//         <div className="navbar navbar-dark bg-dark mb-4 px-4">
//             <span className="navbar-brand">
//                 <i className="fas fa-calendar-alt"></i>
//                 &nbsp;
//                 Alejandro
//             </span>

//             <button
//                 className="btn btn-outline-primary"
//                 onClick={onChangeLenguage}
//             >
//                 <i className="fas fa-sign-out-alternative"></i>
//                 <span>{lenguaje ? 'Cambiar lenguaje' : 'Change Lenguage'}</span>
//             </button>

//             <button className="btn btn-outline-danger">
//                 <i className="fas fa-sign-out-alt"></i>
//                 <span>{lenguaje ? 'Salir' : 'Exit'}</span>

//             </button>
//         </div>
//     )
// }
