import React, { useEffect } from "react"
import MainNavbar from "./MainNavbar"
import Header from "./Header"
import PageFooter from "./PageFooter"
import RoundDetailsFormat from "./RoundDetailsFormat"
import { useParams, useHistory } from "react-router-dom"
import BreadCrumb from "./BreadCrumb"
import RapidFireRound from "./RapidFireRound"
import QuizRound from "./QuizRound"
import SubmissionRound from "./SubmissionRound"
import "../css/Round.css"

const Round = () => {
    const { roundID, questID } = useParams()

    const history = useHistory()

    const [roundFetched, setRoundFetched] = React.useState(false)
    const [roundDetails, setRoundDetails] = React.useState({})
    const [started, setStarted] = React.useState(false)
    const [roundType, setRoundType] = React.useState() // change it back to empty


    const fetchRoundDetails = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/${roundID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in fetching roundDetails.`)
            alert(JSON.stringify(responseBody), "Returning back to quest page")
            history.replace(`/participanthomepage/quest/${questID}`)
        } else {
            // console.log(`Sign in success.`)
            responseBody["roundType"] = `RapidFire`
            setRoundDetails(responseBody)
        }

    }

    useEffect(() => {
        if (started) {
            if (roundDetails.roundType === `RapidFire`) {
                setRoundType(<RapidFireRound timer={roundDetails.timer} />)
            } else if (roundDetails.roundType === `Quiz`) {
                setRoundType(<QuizRound />
                )
            } else if (roundDetails.roundType === `Submission`) {
                setRoundType(<SubmissionRound />
                )
            }
            console.log(`roundType set to render ${roundDetails.roundType} round questions`)
        }
    }, [started])


    // uncomment this
    if (!roundFetched) {
        setRoundFetched(true)
        fetchRoundDetails()
        console.log(`Round details fetched.`)
    }

    return (
        <React.Fragment>
            <MainNavbar />
            <Header heading={`Round ${roundID}: ${roundDetails.roundName}`} subheading={roundDetails.questName} />

            <BreadCrumb items={[{ text: "Home", to: "/participanthomepage" }, { text: roundDetails.questName, to: `/participanthomepage/quest/${questID}` }, { text: `Round ${roundID}`, to: `/participanthomepage/quest/${questID}/round/${roundID}` }]} />

            {/* Round Details when round not started by participant */}
            {!started && <RoundDetailsFormat startingtime={roundDetails.startTime} endingtime={roundDetails.endTime} allowedtime={roundDetails.timer && `${roundDetails.timer} seconds`} about={roundDetails.description} onClick={setStarted} />}

            {/* Specific round type component once round has been started by participant */}
            {/* change it to started */}
            {started && roundType

            }


            <PageFooter />
        </React.Fragment>
    )
}

export default Round