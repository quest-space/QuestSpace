import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import {Link} from "react-router-dom"



const QuestEnrolled = (props) => {

    const [bar1, setBorderBar1] = React.useState('3px solid #313131')
    const [bar2, setBorderBar2] = React.useState('1px solid #C4C4C4')
    const [bar3, setBorderBar3] = React.useState('1px solid #C4C4C4')

    const setBar = (x) => {
        if(x === 'Details'){
          setBorderBar3('1px solid #C4C4C4')
          setBorderBar2('1px solid #C4C4C4')
          setBorderBar1('3px solid #313131')
          {<Link to={{pathname: "participanthomepage/quest/"}}></Link>}
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
            <Header heading={props.questName} subheading={props.hostUser} />
            <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
            
            {/* TABSS */}
            <div className="col-md-12 d-none d-sm-none d-md-none d-lg-block" style={{margin:'0em', padding:'0em'}}>
                <ul id="top" style={{
                    margin:'0em',
                    padding:'0em',
                    backgroundColor:"#ffffff",
                    marginTop:"5em"}}>
                <li><button className="plain one" onClick = {()=>setBar("Details")} style={{borderBottom: bar1, width: '22rem'}}>Details</button></li>
                <li><button className="plain two" onClick = {()=>setBar("Rounds")} style={{borderBottom: bar2, width: '22rem'}} >Rounds</button></li>
                <li><button className="plain three" onClick = {()=>setBar("Leaderboard")} style={{borderBottom: bar3, width: '22rem'}}>Leaderboard</button></li>
                </ul>
            </div>

            <div style={{border: "1px solid #C4C4C4", boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", margin:"7.5rem", marginTop:"0.2rem", paddingBottom:"3.5rem"}}>
                <QuestDetailsFormat
                        questname= {props.questName}
                        hostname={props.hostUser}
                        hostrating={props.rating}
                        startingtime={props.startTime}
                        endingtime= {props.endTime}
                        type= {props.nature}
                        about={props.about}
                        imgsrc={codinguru}
                        left="3rem"
                        right="3rem"
                        top="3rem"/>
            </div>
        </div>
    )
}

export default QuestEnrolled