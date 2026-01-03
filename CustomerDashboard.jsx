import { useEffect, useRef, useState } from "react";
import { getData } from "../utils/localStorage";

const CustomerDashboard = () => {
    const [data, satData] = useState([]);
    const [search, setSearch] = useState("");
    const searchRef = useRef();

    useEffect(() => {
        satData(getData());
        searchRef.current.focus();
    }, []);

    return (
        <div style={{padding: 20}}>
            <input ref={searchRef} placeholder="Search"  onChange={(e) => setSearch(e.target.value)}/>
            {data.filter(
                (r) =>
                    r.restaurantName.toLowerCase().includes((search.toLowerCase()) || r.address.toLowerCase().includes(search.toLowerCase()))
            )
            .map((r) => (
              <div key={r.restaurantID} style={{ border: "1px solid gray", margin: 10, padding: 10}}>
                <img src={r.img} width={200}/>
                <h4>{r.restaurantName}</h4>
                <p>{r.address}</p>
                <p>Parking: {r.parkingLot ? "Yes" : "No"}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerDashboard;