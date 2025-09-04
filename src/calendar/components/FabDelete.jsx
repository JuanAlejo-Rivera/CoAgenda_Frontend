import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

    const { StartdeleteEvent, hasEventSelected, setActiveEvent } = useCalendarStore()

    const handleDelete = () => {
        StartdeleteEvent();
    }

    // console.log(hasEventSelected)

    return (
        <button
            aria-label="btn-delete"
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
