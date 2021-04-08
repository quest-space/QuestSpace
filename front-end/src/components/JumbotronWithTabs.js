import React from "react"
import '../css/common.css'


const JumbotronWithTabs = () => {

  const [bar1, setBorderBar1] = React.useState('5px solid #ffffff')
  const [bar2, setBorderBar2] = React.useState('5px solid transparent')
  const [bar3, setBorderBar3] = React.useState('5px solid transparent')
  // const bgImg = '../img/jumbotronBg.png'

  const setBar = (x) => {
    if(x === 'home'){
      setBorderBar3('5px solid transparent')
      setBorderBar2('5px solid transparent')
      setBorderBar1('5px solid #ffffff')
    }
    else if(x === 'my'){
      setBorderBar1('5px solid transparent')
      setBorderBar3('5px solid transparent')
      setBorderBar2('5px solid #ffffff')
    }
    else{
      setBorderBar1('5px solid transparent')
      setBorderBar2('5px solid transparent')
      setBorderBar3('5px solid #ffffff')
    }
  }

  return(
    <div>
      <div class="jumbotron jumbotron-fluid" style={{marginBottom:'0em' ,background: "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E"}}>
        <div class="container">
          <h1 class="display-4" style={{fontWeight:"500", fontSize:"42px", color:"#ffffff", marginLeft:'0.6em'}}>QuestSpace</h1>
        </div>
      </div>
      {/* TABS */}
      <div class="col-md-12" style={{margin:'0em', padding:'0em'}}>
        <ul id="top" style={{margin:'0em', padding:'0em'}}>
          <li><button className="parent" onClick = {()=>setBar("home")} style={{borderBottom: bar1, width: '22rem'}}>Home</button></li>
          <li className="subnav"><button className="parent" onClick = {()=>setBar("my")} style={{borderBottom: bar2, width: '22rem'}} >My Quests<i class="fa fa-caret-down"></i></button>
          <ul id="subnav-list" style={{margin:'0em', padding:'0em'}}>
            <li><button className="kid" >All</button></li>
            <li><button className="kid" >Live</button></li>
            <li><button className="kid" >Upcoming</button></li>
            <li><button className="kid" >Past</button></li>
          </ul>
          </li>
          <li><button className="parent" onClick = {()=>setBar("all")} style={{borderBottom: bar3, width: '22rem'}}>All</button></li>
        </ul>
      </div>
    </div>
  )

}

export default JumbotronWithTabs