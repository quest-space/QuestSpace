import React from "react"
import { useParams } from "react-router-dom"
import Button from "./Button";
import Stack from "./Stack";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";

const Quest = () => {
    const { questID } = useParams()
    const [response, setResponse] = React.useState({"quest":{}})
    const [render, setRender] = React.useState('true')

    const showError = (errors) => {
        alert(JSON.stringify(errors))
      }
    
    const requestQuest = async () => {
    
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/participant/quest/${questID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                username: 'HassaanAW',
                password: 'hassaan123',
            }),
        })

        // console.log("response is",response)

        const responseBody = await response.json()
        setRender('false')
        setResponse(responseBody)

        if (response.status !== 200) {
            console.log(`Error in enrolment.`)
            showError(responseBody.errors)
        } else {
            console.log(`Successful enrolment.`)
        }
    
    }

    if(render === 'true'){
        requestQuest()
    }

    console.log(response)

    return (
        <div>
            <QuestDetailsFormat
                questname= {response.quest.questName}
                hostname={response.quest.hostUser}
                hostrating={response.quest.rating}
                startingtime={response.quest.startTime}
                endingtime= {response.quest.endTime}
                type= {response.quest.nature}
                about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor."
                imgsrc={codinguru}
            />
            {/* brought this outside to implement flow of data on redirect */}
            <span className="responsive" style={{ float: "right", marginBottom:"3rem", marginRight:"10rem"}}>  
                <Stack button={<Button text="Enroll" class="btn3" link="" />} />
            </span>
        </div>
    )
}

export default Quest