import React from "react"
import Cards from "./Cards"


const CardsContainer = () => {

    return(
        //WIll write a loop that dynamically will display the cards accroding to the format

        ///FOR TESTIING
            <div className="container" style={{marginTop:'6rem'}}>
      <div className="row">
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

    )

}

export default CardsContainer