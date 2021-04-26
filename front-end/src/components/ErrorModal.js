import React from "react"

const ErrorModal = (props) => {

    const closeModal = () => {
        props.onClose && props.onClose()
    }

    const errors = ["Username not defined", "use a bigger password", "You are unauthroized"]

    return (
        <React.Fragment>
            {/* {props.trigger ? <div tabIndex="0" className="questionModal" onKeyDown={(ev) => { */}

            {true ? <div tabIndex="0" className="questionModal" onKeyDown={(ev) => {
                if (ev.key === `Escape` || ev.key === `Esc`)
                    closeModal()
            }}>
                <div className="back" >

                    {/* Cross to close */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", }} >
                        <i className="fa fa-times" aria-hidden="true" style={{ color: "#666666", fontSize: "10pt", padding: "8px 8px 5px 0px", cursor: "pointer" }} onClick={closeModal} ></i>
                    </div>

                    {/* Error Icon */}
                    <i className="fas fa-times-circle" aria-hidden="true" style={{ color: "#f13636", fontSize: "60px", paddingBottom: "20px" }}></i>

                    {/* Errors to show */}
                    {/* {props.errors && props.errors.map((error, index) => {
                        return (
                            <p key={index} style={{ textAlign: "center" }}>
                                {error}
                            </p>
                        )
                    })} */}
                    {errors.map((error, index) => {
                        return (
                            <p key={index} style={{ textAlign: "center" }}>
                                {error}
                            </p>
                        )
                    })}

                </div>
            </div> : ``}
        </React.Fragment>

    )
}

export default ErrorModal