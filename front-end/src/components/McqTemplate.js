import React from "react"

const McqTemplate = (props) => {

    const [options, setOptions] = React.useState([])
    const [answer, setAnswer] = React.useState()

    const AddOption = () => {
        setOptions = [...options, ""]
    }

    return (
        <div className="mcqTemplate">
            <div className="questionHeading">
                Answer Choices:
            </div>
            <div className="questionText">
                {/* <input type="file">
                </input> */}
            </div>
            
            {/* Print already added options */}
            {/* {options.map((option,index) => {

                return ()
            })} */}

            {/* Icon to add options */}
            <div onClick={AddOption}>
                <i className="fas fa-plus-circle"></i>
            </div >

        </div >
    )
}

const Mcq = (props) => {

    const [value, setValue] = React.useState("")

    return (
        <div className="mcqOption">
            
            {/* Radio Circle */}
            <div>

            </div>

        </div>
    )
}

export default McqTemplate