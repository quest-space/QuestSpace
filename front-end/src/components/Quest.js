import React from "react"
import { useParams } from "react-router-dom"


const Quest = () => {
    const { questID } = useParams()

    return (
        <h1>
            My quest id is {questID}
        </h1>
    )
}

export default Quest