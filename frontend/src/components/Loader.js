import React , {useState} from 'react'
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    let [loading, setLoading] = useState(true)
      
    return (
        <>
      <div className="sweet-loading text-center" style={{marginTop:'300px'}}>
       <HashLoader color={'#000'} loading={loading} css='' size={80} />
      </div>
      </>
    );
}

export default Loader
