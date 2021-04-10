import React from "react"
import Cards from "./Cards"

/* Example call
<CardsContainer tab="Home"/>
*/

const CardsContainer = (props) => {

    return(
        //WIll write a loop that dynamically will display the cards accroding to the format
        <div>
        
            {/* /*FOR TESTIING*/ }
            <div className="container" style={{marginTop:'0rem'}}>
                <div style={{
                    paddingLeft:'1.5rem', 
                    paddingTop:'5.5rem', 
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '32px'}}>
                    {props.tab}
                </div>
                {/* if tab is home then i have to restrict cards to 4 my quests and 4 popular quests with a view all button */}
                <div className="row" style={{padding:'1.5rem'}}>
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <Cards 
                            imgUrl = "https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                            title = "QUEST TITLE"
                            host = "Host name"
                            description = "Lorem ipsum dolor sit amet consecteture!"  //should be truncated at the backend
                            date = "Jan 20, 2018"
                            starsCount = '3'
                        />
                        </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                    <Cards 
                        imgUrl = "https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                        title = "QUEST TITLE"
                        host = "Host name"
                        description = "Lorem ipsum dolor sit amet consecteture!"  //should be truncated at the backend
                        date = "Jan 20, 2018"
                        starsCount = '1'
                    />
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                    <Cards 
                        imgUrl = "https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                        title = "QUEST TITLE"
                        host = "Host name"
                        description = "Lorem ipsum dolor sit amet consecteture!"  //should be truncated at the backend
                        date = "Jan 20, 2018"
                        starsCount = '1'
                    />
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                    <Cards 
                        imgUrl = "https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                        title = "QUEST TITLE"
                        host = "Host name"
                        description = "Lorem ipsum dolor sit amet consecteture!"  //should be truncated at the backend
                        date = "Jan 20, 2018"
                        starsCount = '3'
                    />
                </div>
            </div>
        </div>

        </div>

    )

}

export default CardsContainer