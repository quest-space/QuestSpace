import React from "react"
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import PageFooter from "./PageFooter"
import BreadCrumb from "./BreadCrumb";
import {useLocation, useParams } from "react-router-dom";




const RoundLeaderboard = () => {

    const location = useLocation();
    const [response, setResponse] = React.useState({})
    const [render, setRender] = React.useState(false);
    const [tab, setTab] = React.useState('home')
    const { roundID, questID } = useParams()
    // const [searchflag, setSearchflag] = React.useState('home')

    const apiCall = async () => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/${roundID}/leaderboard
        `,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:"include",
            body: JSON.stringify({
                username: "HassaanAW",
                password: "hassaan123",
            }),
        })
        const responseBody = await resp.json()
        setResponse(responseBody)
        console.log(responseBody)
    
        if (resp.status !== 200) {
            console.log(`Error. Couldn't fetch data.`)
            setResponse({"quests":[]})
        } else {
            console.log(`Fetch data successful`)
        }
    }

    // if(!render){
    //     setRender(true)
    //     apiCall()
    // }

    return (
        <div>
        <MainNavbar setTab={setTab}/>
        <Header heading= {location.heading} subheading= {location.subheading} />
        <BreadCrumb
            items={[
            { text: "Home", to: "/participanthomepage" },
            {
                text: location.heading,
                to: `/participanthomepage/quest/${questID}`,
            },
            {
                text: `Round ${roundID}: Leaderboard`,
                to: `/participanthomepage/quest/${questID}/${roundID}/leaderboard`,
            }
            ]}
        />

        <div style={{
            paddingLeft:'9%', 
            paddingTop:'3rem', 
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '32px',
            display:"block"}}>
            {`Round ${roundID}: Leaderboard`}
        </div>

        <PageFooter />
        </div>
    );
}


export default RoundLeaderboard