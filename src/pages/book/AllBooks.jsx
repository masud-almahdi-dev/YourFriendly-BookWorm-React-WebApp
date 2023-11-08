import axios from "axios";
import { useEffect, useState } from "react";

const AllBooks = () => {
    const [books, setbooks] = useState([]);
    const [failed, setFailed] = useState(true);
    useEffect(() => {
        document.title = "All Books | Friendly BookWorm"
        axios.get(`${import.meta.env.VITE_SERVER_URI}/books`).then(data => { setFailed(false); setbooks(data.data); }).catch(() => { setFailed(true); })
    }, [])
    return ( 
        <div>

        </div>
     );
}
 
export default AllBooks;