import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { allFIR } from '../modules/formdetails';

const BookDetails = () => {

  const { FIRId } = useParams();
  const dispatch = useDispatch();
  const { FIR } = useSelector((state) => state);
  const [firdetails, setFIRdetails] = useState();

  useEffect(() => {
    dispatch(allFIR())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFIRdetails(FIR.find(firdetails => firdetails.id === parseInt(FIRId, 10)))
  }, [FIRId, FIR]);

  return firdetails ? (
    <div className="row">
      <div className="col-sm-12">
        <h1>Details for Complaint ID {firdetails.id}</h1>
        <hr/>
        <h3>Police Station</h3>
        <p className="lead">{firdetails.policeStation}</p>
        <h3>FIRno</h3>
        <p className="lead">{firdetails.fIRno}</p>
        <hr/>
        <p>
          <Link to="/">&laquo; back to list</Link>
        </p>
      </div>
    </div>
  ) : null
}

export default BookDetails
