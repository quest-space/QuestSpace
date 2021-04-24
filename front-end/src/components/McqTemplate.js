import React from "react"

const McqTemplate = (props) => {

    const [options, setOptions] = React.useState([])
    const [answer, setAnswer] = React.useState("")

    const AddOption = () => {
        if (options.length < 6)
            setOptions([...options, ""])
    }

    const UpdateOption = (index, newOption) => {
        var temp = [...options]
        temp[index] = newOption
        setOptions(temp)
    }

    const DiscardOption = (index) => {
        if (options[index] === answer) {
            setAnswer("")
        }
        const temp = [...options]
        temp.splice(index, 1)
        setOptions(temp)
    }

    return (
        <div className="mcqTemplate">

            <div className="questionHeading">
                Answer Choices:
            </div>

            <div className="questionText">
                {/* Print already added options */}
                {options.map((option, index) => {
                    return (<Mcq key={index} index={index} option={option} checked={answer && answer === option ? `checked` : `unchecked`} UpdateOption={UpdateOption} DiscardOption={DiscardOption} setAnswer={setAnswer} />)
                })}

                {/* Icon to add options */}
                < div onClick={AddOption} >
                    <span className="material-icons icon">
                        add_circle_outline
                    </span>
                </div >

            </div>

        </div >
    )
}

const Mcq = (props) => {

    return (
        <div className="mcqOption">

            {/* Radio Circle */}
            <span className="material-icons icon" onClick={() => { props.setAnswer(props.option) }}>
                radio_button_{props.checked}
            </span>

            {/* textarea */}
            <textarea rows="1" placeholder="Enter here" onInput={(ev) => { ev.target.style.height = ''; ev.target.style.height = ev.target.scrollHeight + 'px' }} onChange={(ev) => {
                props.UpdateOption(props.index, ev.target.value)
                if (props.checked === `checked`)
                    props.setAnswer(ev.target.value)
            }} value={props.option}>
            </textarea>

            {/* Cross to discard option */}
            <span className="material-icons icon" onClick={() => props.DiscardOption(props.index)}>
                close
            </span>

        </div >
    )
}

export default McqTemplate