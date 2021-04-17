import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import QuestRounds from "./QuestRounds"
import PageFooter from "./PageFooter"
import BreadCrumb from "./BreadCrumb"




const QuestEnrolled = (props) => {

    const [bar1, setBorderBar1] = React.useState('3px solid #313131')
    const [bar2, setBorderBar2] = React.useState('1px solid #C4C4C4')
    const [bar3, setBorderBar3] = React.useState('1px solid #C4C4C4')
    const [tab, setTab] = React.useState('Details')

    const setBar = (x) => {
        setTab(x)
        if(x === 'Details'){
          setBorderBar3('1px solid #C4C4C4')
          setBorderBar2('1px solid #C4C4C4')
          setBorderBar1('3px solid #313131')
        }
        else if(x === 'Rounds'){
          setBorderBar1('1px solid #C4C4C4')
          setBorderBar3('1px solid #C4C4C4')
          setBorderBar2('3px solid #313131')
        }
        else if(x == 'Leaderboard'){
          setBorderBar1('1px solid #C4C4C4')
          setBorderBar2('1px solid #C4C4C4')
          setBorderBar3('3px solid #313131')
        }
      }
    return(
        <div>
            <MainNavbar />
            <Header heading={props.x.quest.questName} subheading={props.x.quest.hostUser} />
            {/* <div id="top" style={{ margin: "0em", padding: "0em" }}></div> */}
            <BreadCrumb items={[{ text: "Home", to: "/participanthomepage" }, { text: props.x.quest.questName, to: `/participanthomepage/quest/${props.x.quest.questID}` }]} />

            
            {/* TABSS */}
            <div className="col-md-12" style={{margin:'0em', padding:'0em'}}>
                <ul id="top" style={{
                    backgroundColor:"#ffffff",
                    margin:'0em', 
                    padding:'0em', 
                    paddingLeft: "9%", 
                    paddingRight:"9%",
                    paddingTop:'5.5rem'}}>
                <button className="plain one" onClick = {()=>setBar("Details")} style={{borderBottom: bar1, width: '33.33%'}}>Details</button>
                <button className="plain two" onClick = {()=>setBar("Rounds")} style={{borderBottom: bar2, width: '33.33%'}} >Rounds</button>
                <button className="plain three" onClick = {()=>setBar("Leaderboard")} style={{borderBottom: bar3, width: '33.33%'}}>Leaderboard</button>
                </ul>
            </div>

            {(tab == "Details")&&<div style={{
              border: "1px solid #C4C4C4", 
              boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", 
              marginLeft: "9%", 
              marginRight:"9%", 
              marginBottom:"5.5rem",
              marginTop:"3rem",
              paddingBottom:"3rem"}}>
                <QuestDetailsFormat
                        questname= {props.x.quest.questName}
                        hostname={props.x.quest.hostUser}
                        hostrating={props.x.quest.rating}
                        startingtime={props.x.quest.startTime}
                        endingtime= {props.x.quest.endTime}
                        type= {props.x.quest.nature}
                        about={props.x.quest.about}
                        imgsrc={codinguru}
                        left="3rem"
                        right="3rem"
                        top="3rem"/>
            </div>}

            {(tab == "Rounds")&&
              ((props.x.rounds.length === 0) && 
              <div style={{
                border: "1px solid #C4C4C4", 
                boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", 
                marginLeft: "9%", 
                marginRight:"9%", 
                marginBottom:"5.5rem",
                marginTop:"3rem",
                padding:"2rem"}}>
                  <i class="fas fa-exclamation-circle"></i> Not Available
              </div>)}
            
            {(tab == "Rounds")&&
              (props.x.rounds.length > 0) && <QuestRounds details = {props.x.rounds} id = {props.x.quest.questID}/>}
                
                {/* // (props.x.rounds ? <QuestRounds details = {props.x.rounds} id = {props.x.quest.questID}/> : <div style={{border: "1px solid #C4C4C4", boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", margin:"7.5rem", marginTop:"0.2rem", paddingBottom:"1rem", paddingTop:"1rem", paddingLeft:"1rem"}}>Not Available</div>) */}
            
            {(tab == "Leaderboard")&&<div style={{
              border: "1px solid #C4C4C4", 
              boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", 
              marginLeft: "9%", 
              marginRight:"9%", 
              marginBottom:"5.5rem",
              marginTop:"3rem",
              padding:"2rem"}}>
                <i class="fas fa-exclamation-circle"></i> Not Available
            </div>}
            <PageFooter />
        </div>
    )
}

export default QuestEnrolled
