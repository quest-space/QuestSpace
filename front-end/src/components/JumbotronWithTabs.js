import React from "react"
import '../css/common.css'


const JumbotronWithTabs = (props) => {

  const [bar1, setBorderBar1] = React.useState('5px solid #ffffff')
  const [bar2, setBorderBar2] = React.useState('5px solid transparent')
  const [bar3, setBorderBar3] = React.useState('5px solid transparent')
        

  const setBar = (x) => {
    if(x !== "myQuests"){
      props.setTab(x)
    }
    if(x === 'home'){
      setBorderBar3('5px solid transparent')
      setBorderBar2('5px solid transparent')
      setBorderBar1('5px solid #ffffff')
    }
    else if(x === 'myQuests'){
      setBorderBar1('5px solid transparent')
      setBorderBar3('5px solid transparent')
      setBorderBar2('5px solid #ffffff')
    }
    else if(x == 'allQuests'){
      setBorderBar1('5px solid transparent')
      setBorderBar2('5px solid transparent')
      setBorderBar3('5px solid #ffffff')
    }
  }

  return(
    <div>
      <div id='fancy' className="jumbotron jumbotron-fluid" style={{marginBottom:'0em' ,background: "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E"}}>
        <div className="container">
          <h1 className="display-4" style={{fontWeight:"400", fontSize:"40px", color:"#ffffff", marginLeft:'0.6em'}}>QuestSpace</h1>
        </div>
      </div>
      {/* TABS ON DESKTOP*/}
      <div className="col-md-12 d-none d-sm-none d-md-none d-lg-block" style={{margin:'0em', padding:'0em'}}>
        <ul id="top" style={{margin:'0em', padding:'0em'}}>
          <li><button className="parent" onClick = {()=>setBar("home")} style={{borderBottom: bar1, width: '22rem'}}>Home</button></li>
          <li className="subnav"><button className="parent" onClick = {()=>setBar("myQuests")} style={{borderBottom: bar2, width: '22rem'}} >My Quests<i className="fa fa-caret-down"></i></button>
          <ul id="subnav-list" style={{margin:'0em', padding:'0em'}}>
            <li><button onClick = {()=>setBar("all")} className="kid" >All</button></li>
            <li><button onClick = {()=>setBar("live")} className="kid" >Live</button></li>
            <li><button onClick = {()=>setBar("upcoming")} className="kid" >Upcoming</button></li>
            <li><button onClick = {()=>setBar("past")} className="kid" >Past</button></li>
          </ul>
          </li>
          <li><button className="parent" onClick = {()=>setBar("allQuests")} style={{borderBottom: bar3, width: '22rem'}}>All</button></li>
        </ul>
      </div>
      {/* TABS ON MOBILE */}
      <div className="navHover dropdown d-lg-none d-md-block" style={{boxSizing:"content-box", width:"100%"}}>
      <button className="parent dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" 
      style={{margin:"0", textAlign:"center", width:"100%"}}>
        Browse Quests
      </button>
      <div className="hoverable dropdown-menu" aria-labelledby="dropdownMenuButton" style={{boxSizing:"content-box", width:"100%", margin:"0", padding:"0", borderWidth:"0", boxShadow:"none"}}>
        <button className="dropdown-item dropKid" onClick = {()=>setBar("allQuests")} >All Quests</button>
        <button className="dropdown-item dropKid" onClick = {()=>setBar("live")} >All my Live Quests</button>
        <button className="dropdown-item dropKid" onClick = {()=>setBar("past")}>All my Past Quests</button>
        <button className="dropdown-item dropKid" onClick = {()=>setBar("upcoming")} >All my Upcoming Quests</button>
      </div>
      </div>

    </div>
  )

}

export default JumbotronWithTabs