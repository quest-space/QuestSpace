import React from "react"
import Cards from "./Cards"
import {Link} from "react-router-dom"

/* Example call
<CardsContainer tab="Home"/>
*/
let render = 'true'
// let cards = {}

const headings = {
    "myQuests" : "My Quests",
    "popularQuests" : "Popular Quests",
    "allQuests" : "All Quests",
    "live" : "Live Quests",
    "upcoming": "Upcoming Quests",
    "past" : "Past Quests",
    "all" : "All Quests"
}

const CardsContainer = (props) => {

    // const [cards, setCards] = React.useState({})
    const [response, setResponse] = React.useState({"home":{}})

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }
   
    const apiCall = async () => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/participant/homepage`,{
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
        render ='false'

        if (resp.status !== 200) {
            console.log(`Error. Couldn't fetch data.`)
            showError(responseBody.errors)
        } else {
            console.log(`Fetch data successful`)

        }
    }
    let tab = props.tab
    if (tab === "live" || tab === "upcoming" || tab === "past" || tab === "all"){
        tab = "myQuests"
    }
    let cards = response[tab]
    console.log(cards)
    if(render == 'true'){
        apiCall()
    }

    return(
        <div>
            { (props.tab === "home" || props.tab === "allQuests") &&
                 <div className="container" id="cc" style={{marginTop:'0rem'}}>
                 {Object.keys(cards).map((key, i) => {
                     return(    
                         
                         <div>
                             <div style={{
                                 paddingLeft:'1.5rem', 
                                 paddingTop:'5.5rem', 
                                 fontStyle: 'normal',
                                 fontWeight: 'normal',
                                 fontSize: '32px'}}>
                                 {headings[key]}
                             </div>
                             {
                             Object.keys(cards[key]).map((cardList, j)=>{
                                 return(
                                 <div className="row" style={{padding:'1.5rem'}}>
                                 {Object.keys(cards[key][cardList]).map((card, k)=>{
                                     return(
                                         <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                             {/* {console.log(cards[key][cardList][card].hostUser)} */}
                                             <Link to={{pathname: "participanthomepage/quest/"+cards[key][cardList][card].questID}}><Cards 
                                                 imgUrl = "https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                                                 title = {cards[key][cardList][card].questName}
                                                 host = {cards[key][cardList][card].hostUser}
                                                 description = {cards[key][cardList][card].description}  //should be truncated at the backend
                                                 date = {cards[key][cardList][card].startDate}
                                                 starsCount = {cards[key][cardList][card].rating}
                                             />
                                             </Link>
                                         </div>       
                                     )
                                 })}
                                 
                                 </div>
                             
                             )})
                             }
                             
                         </div>
 
                         
                     )
                 })
             }
             
             </div>
            }
            {
                (props.tab === "live" || props.tab === "past" || props.tab === "upcoming" || props.tab === "all") && 
                <div className="container" id="cc" style={{marginTop:'0rem'}}>
                     {Object.keys(cards).map((key, i) => {
                        return( 
                            <div>
                                {key === (props.tab+"Quests") && 
                                <div style={{
                                    paddingLeft:'1.5rem', 
                                    paddingTop:'5.5rem', 
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    fontSize: '32px'}}>
                                    {"My "+headings[props.tab]}
                                </div>
                               }
                               {key === (props.tab+"Quests") && 
                               <div>
                                {
                                Object.keys(cards[key]).map((cardList, j)=>{
                                    return(
                                    <div className="row" style={{padding:'1.5rem'}}>
                                    {Object.keys(cards[key][cardList]).map((card, k)=>{
                                        return(
                                            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                                {/* {console.log(cards[key][cardList][card].hostUser)} */}
                                                <Cards 
                                                    imgUrl = "https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                                                    title = {cards[key][cardList][card].questName}
                                                    host = {cards[key][cardList][card].hostUser}
                                                    description = {cards[key][cardList][card].description}  //should be truncated at the backend
                                                    date = {cards[key][cardList][card].startDate}
                                                    starsCount = {cards[key][cardList][card].rating}
                                                />
                                            </div>       
                                        )
                                    })}
                                    
                                    </div>
                                
                                )})
                                }
                                </div>}

                            </div>

                        )
                        })
                    }
                     

                </div>
            }
        </div>

    )

}

export default CardsContainer