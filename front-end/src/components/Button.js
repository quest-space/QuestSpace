import React from "react"
// import Button from "react-bootstrap"
import Button from 'react-bootstrap/Button';


const Buttonss = (props) => {
    return (
        <React.Fragment>
            <Button style={{ width: props.width, height: props.height, backgroundColor: props.color , color: props.tcolor, borderRadius: "25px"}}>hello
            </Button>
        </React.Fragment>

        // </div>
    )
}

export default Buttonss
