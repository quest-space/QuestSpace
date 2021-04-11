import React from "react"
import { useParams } from "react-router-dom"
import Button from "./Button";
import Stack from "./Stack";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import QuestEnrolled from "./QuestEnrolled"


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
            {(response.quest.enrolled == 1) && <div>
                <MainNavbar />
                <Header heading={response.quest.questName} subheading={response.quest.hostUser} />
                <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
                <QuestDetailsFormat
                    questname= {response.quest.questName}
                    hostname={response.quest.hostUser}
                    hostrating={response.quest.rating}
                    startingtime={response.quest.startTime}
                    endingtime= {response.quest.endTime}
                    type= {response.quest.nature}
                    about={response.quest.about}
                    imgsrc={codinguru}
                    left="7.5rem"
                    right="7.5rem"
                    top="5rem"
                />
                {/* brought this outside to implement flow of data on redirect */}
                <span className="responsive" style={{ float: "right", marginBottom:"3rem", marginRight:"10rem"}}>  
                    <Stack button={<Button text="Enroll" class="btn3" link="" />} />
                </span>
            </div>
            }
            {
             (response.quest.enrolled == 0) && <QuestEnrolled x = {response.quest} />
            }
        </div>
    )
}

export default Quest