import React,{ useState, useEffect } from 'react'
import * as Realm from 'realm-web'
import '../styles/FIROverviewStyle.css'

const BookList = () => {

  const [users, setDataSet] = useState([]);

       const getUsers = async () => {
       const app = new Realm.App({ id: "data-mpcbs" });
       const credentials = Realm.Credentials.anonymous();
       try {
       const user = await app.logIn(credentials);
       const allData = await user.functions.getFIRDoc()
       setDataSet(allData)
       } catch(err) {
       console.error("Failed to log in", err);
       }
     }
      useEffect(() => {
          getUsers();
      }, []);

     console.log(users)

  return(
   <>
   <div className="adminReport">
     <p className="adminReport--title">FIR REPORT LIST</p>
     <p className="adminReport--point">List of report that comes under your legislature</p>

    {
       users.map((curElem) => {

         return(

       <div className="row equal">
         <div className="float-container card card-inverse card-primary">
         <div className="float-container">
         <div className="card-block float-child1">
           <h3 className="card-title">FIR No : {curElem.fIRno}</h3>
           <h3 className="card-title">Beat No : {curElem.beatNo}</h3>

           <div className="act">
             <p className="card-text">(i)*Act: {curElem.act1}</p>
           </div>
           <div className="section">
             <p className="card-text">(i)*Sections: {curElem.sections1}</p>
           </div>
           <div className="act">
             <p className="card-text">(ii)*Act: {curElem.act2}</p>
           </div>
           <div className="section">
             <p className="card-text">(ii)*Sections: {curElem.sections2}</p>
           </div>
           <div className="act">
             <p className="card-text">(iii)*Act: {curElem.act3} </p>
           </div>
           <div className="section">
             <p className="card-text">(iii)*Sections: {curElem.sections3}</p>
           </div>
           <div className="OtherActs">
             <p className="card-text">(iv)*Other Acts & Sections: {curElem.otherActsAndSections}</p>
           </div>

       </div>

       <div className="float-child2">
         <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
           <h4 className="card-title">Reporting Date : {curElem.informatioReceivedDate}</h4>

           <div className="occurence">
             <p className="card-text">(iv)*Occurence of Offence: </p>
             <div className="act">
               <p className="card-text">Date:{curElem.occurenceDate} </p>
             </div>
             <div className="section">
                 <p className="card-text">Time: {curElem.occurenceTime} </p>
             </div>
             <div className="">
               <p className="card-text">Address: {curElem.address}</p>
             </div>
           </div>
           <div className="">
             <p className="card-text">(v)General Diary Reference:</p>
           </div>
           <div className="act">
             <p className="card-text">Entry No(s): {curElem.diaryReferenceEntryNo}</p>
           </div>
           <div className="section">
             <p className="card-text">Time: {curElem.informatioReceivedTime}</p>
           </div>

       </div>
       </div>
     </div>

     <div className="fir-detail">
     <h4>Details of known / suspected / unknown / accused with full particulars (Attach separate sheet if necessary):</h4>
     <p>{curElem.detailsOfSuspected}</p>
     </div>
     <div className="full-view">
       <a href="#" className="btn btn-outline-secondary">View full complaint</a>
     </div>
   </div>
   </div>

 )
})
}
   </div>
   </>
  )
}

export default BookList;
