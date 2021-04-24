import React, { useEffect } from "react"

const HostMcqTemplate = (props) => {

    const [options, setOptions] = React.useState(["", ""])
    const [answerIndex, setAnswerIndex] = React.useState(0)

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
        if (options.length > 2) {
            if (answerIndex === index) {
                setAnswerIndex(0)
            }
            const temp = [...options]
            temp.splice(index, 1)
            setOptions(temp)
        }
    }

    useEffect(() => {
        props.setMCQ(options, options[answerIndex])
    }, [options, answerIndex])

    return (
        <div className="mcqTemplate">

            <div className="questionHeading">
                Answer Choices:
            </div>

            <div className="questionText">
                {/* Print already added options */}
                {options.map((option, index) => {
                    return (<Mcq key={index} index={index} option={option} checked={answerIndex === index ? `checked` : `unchecked`} UpdateOption={UpdateOption} DiscardOption={DiscardOption} setAnswerIndex={setAnswerIndex} />)
                })}

                {/* Icon to add options */}
                < div>
                    <span className="material-icons icon" onClick={AddOption} >
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
            <span className="material-icons icon" onClick={() => { props.setAnswerIndex(props.index) }}>
                radio_button_{props.checked}
            </span>

            {/* textarea */}
            <textarea rows="1" placeholder="Enter here" onInput={(ev) => { ev.target.style.height = ''; ev.target.style.height = ev.target.scrollHeight + 'px' }} onChange={(ev) => props.UpdateOption(props.index, ev.target.value)} value={props.option}>
            </textarea>

            {/* Cross to discard option */}
            <span className="material-icons icon" onClick={() => props.DiscardOption(props.index)}>
                close
            </span>

        </div >
    )
}

export default HostMcqTemplate