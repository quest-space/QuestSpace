import React from "react"
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import PageFooter from "./PageFooter"
import BreadCrumb from "./BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import Cards from "./Cards"




const Search = () => {

    const location = useLocation();
    const [response, setResponse] = React.useState({"searchResults":[]})
    const [render, setRender] = React.useState(false);
    const [tab, setTab] = React.useState('home')
    // const [searchflag, setSearchflag] = React.useState('home')

    const apiCall = async (searchWord) => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/participant/search`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:"include",
            body: JSON.stringify({
                key : searchWord
            }),
        })
        const responseBody = await resp.json()
        setResponse(responseBody)
        console.log(responseBody)
    
        if (resp.status !== 200) {
            console.log(`Error. Couldn't fetch data.`)
            setResponse({"searchResults":[]})
            // showError(responseBody.errors)
        } else {
            console.log(`Fetch data successful`)
        }
    }

    if(!render){
        setRender(true)
        apiCall(location.state)
    }

    return (
        <div>
        <MainNavbar setTab={setTab} setRender={setRender}/>
        <Header heading="Quests" subheading="Search" />
        <BreadCrumb
            items={[
            { text: "Home", to: "/participanthomepage" },
            {
                text: "Search Results",
                to: `/participanthomepage`,
            },
            ]}
        />
           
        <div className="container" id="cc" style={{marginTop:'0rem', paddingBottom:"5.5rem"}}>
                {Object.keys(response).map((key, i) => {
                    return(    
                        
                        <div key = {i}>
                                    <div style={{
                                        paddingLeft:'1.5rem', 
                                        paddingTop:'4.5rem', 
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        fontSize: '32px',
                                        display:"block"}}>
                                        {"Search Results for '" + location.state + "'"}
                                    </div>
                                    
                            {response[key].length > 0 && <div>
                            {Object.keys(response[key]).map((cardList, j)=>{
                                return(
                                <div key = {j} className="row" style={{padding:'1.5rem'}}>
                                {Object.keys(response[key][cardList]).map((card, k)=>{
                                    return(
                                        <div key = {k} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                            {/* {console.log(response[key][cardList][card].hostUser)} */}
                                            <Link to={{pathname: "/participanthomepage/quest/"+response[key][cardList][card].questID}}><Cards 
                                                imgUrl = {response[key][cardList][card].logoURL}
                                                title = {response[key][cardList][card].questName}
                                                host = {response[key][cardList][card].hostUser}
                                                description = {response[key][cardList][card].description}  //should be truncated at the backend
                                                date = {response[key][cardList][card].startDate}
                                                starsCount = {response[key][cardList][card].rating}
                                            />
                                            </Link>
                                        </div>       
                                    )
                                })}
                                
                                </div>
                            
                            )})}
                            </div>
                            }
                            {response[key].length === 0 && 
                                <div style={{
                                    border: "1px solid #C4C4C4", 
                                    boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", 
                                    // marginBottom:"5.5rem",
                                    margin:"1.5rem",
                                    padding:"2rem"}}>
                                        <i class="fas fa-exclamation-circle"></i> No match Found!
                                    </div>
                            }
                            
                        </div>

                        
                    )
                })
            }
            </div>

        <PageFooter />
        </div>
    );
}


export default Search