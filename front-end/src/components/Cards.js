import React from "react"
import '../css/common.css'

const Cards = (props) => {

  let full = []
  let empty = []
  for (let i = 0; i < parseInt(props.starsCount); i++) {
    full.push(1)
  }
  for (let i = 0; i < 5 - parseInt(props.starsCount); i++) {
    empty.push(0)
  }
        
  return(
  
      <div className="card" style ={{borderRadius: '1rem'}} >
        <img src = {props.imgUrl}  alt="" className="card-img-top" style={{borderRadius: '1rem 1rem 0rem 0rem'}}/>
        <div className="card-body" style={{paddingTop:'0.80em'}}>
          <h5 className="card-title" style={{margin:'0em',fontWeight: '500', color:"#313131"}}>{props.title}</h5>
          <p className= "text-muted" style={{margin:'0em', fontSize:'0.9rem'}}>{props.host}</p>
          {
            full.map((a,index) => {
              return(
                  <i key={index} className="fa fa-star"></i>
              )
            })
          }

          {
            empty.map((a,index) => {
              return(
                  <i key={index} className="far fa-star"></i>
              )
            })
          }

          <p className="card-text" style={{fontSize:'14px', marginTop:'0.3em', marginBottom:'0.1em',color:"#313131"}}>{props.description}</p>
          <p className="card-text" ><small className="text-muted" ><i style= {{marginRight: "10px"}} className="fas fa-calendar-alt"></i>{props.date}</small></p>
        </div>
      </div>
  )
}

export default Cards
