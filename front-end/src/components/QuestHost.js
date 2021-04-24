import React from "react"
import { useParams } from "react-router-dom"
import Header from "./Header";
import MainNavbarHost from "./MainNavbarHost";
import BreadCrumb from "./BreadCrumb"
import QuestHostTabs from "./QuestHostTabs"
// import PageFooter from "./PageFooter"



const QuestHost = () => {
    const { questID } = useParams()
    const [response, setResponse] = React.useState({"quest":{}})
    const [render, setRender] = React.useState(true)

    const showError = (errors) => {
        alert(JSON.stringify(errors))
      }
    
    const requestQuest = async () => {
    
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/quest/${questID}`, {
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

        const responseBody = await response.json()
        console.log('responsee', responseBody)
        setResponse(responseBody)

        if (response.status !== 200) {
            console.log(`Error in fetching`)
            showError(responseBody.errors)
        } else {
            console.log(`Successful fetching`)
        }
    
    }

    if(render === true){
        setRender(false)
        requestQuest()
    }

    console.log(response)

    return (
        <div>
            {<div>
                <MainNavbarHost />
                <Header heading={response.quest.questName} subheading={response.quest.hostUser} />
                <BreadCrumb items={[{ text: "Home", to: "/hosthomepage" }, { text: response.quest.questName, to: `/hosthomepage/quest/${response.quest.questID}` }]} />
                
            </div>
            }
            <QuestHostTabs response = {response} setRender={setRender}/>
            {/* <PageFooter /> */}

        </div>
    )
}

export default QuestHost
