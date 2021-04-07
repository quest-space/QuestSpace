import React from "react"
import PageFooter from "./PageFooter"
import Stack from "./Stack"
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "../css/LandingPage.css"

const LandingPage = () => {
    return (
        <React.Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="4" style={{}}>
                        <Stack title="We give space to everyone!" text="Host your Space, Design, Manage and Grade your Quests!" imgPath="/img/landing/2.png" imgWidth="330" imgHeight="230" />
                    </MDBCol>
                    <MDBCol md="8" style={{ backgroundImage: "url('/img/landing/1.png')", innerHeight: "100px" }}>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6" style={{ padding: "100px" }}>
                        <Stack title="For Hosts" text="Host your Space, Design, Manage and Grade your Quests!" img={true} imgPath="/img/landing/2.png" imgWidth="330" imgHeight="230" />
                    </MDBCol>
                    <MDBCol md="6" style={{ padding: "100px" }}>
                        <Stack title="For Participants" text="Join Quest Spaces, Participate and View your ranks!" img={true} imgPath="/img/landing/3.png" imgWidth="330" imgHeight="230" />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer>
                <MDBRow>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack title="Accessibility" text="Co-curriculars on any device, anywhere." img={true} imgPath="/img/landing/4.png" imgWidth="156" imgHeight="156" />
                    </MDBCol>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack title="Quick and Easy" text="Automated grading and leaderboard generation." img={true} imgPath="/img/landing/5.png" imgWidth="170" imgHeight="156" />
                    </MDBCol>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack title="Diversity" text="Variety of co-curriculars, all at one platform." img={true}  imgPath="/img/landing/6.png" imgWidth="156" imgHeight="156" />

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <PageFooter />
        </React.Fragment>
    )
}

export default LandingPage