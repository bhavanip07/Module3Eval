import { useEffect, useRef, useState } from "react";
import { getData, saveData } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    type: "",
    parkingLot: "",
    image:
      "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766",
  });

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [parkingFilter, setParkingFilter] = useState("");
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setRestaurants(getData());
    searchRef.current.focus();
  }, []);

  const handleAdd = () => {
    if (!form.restaurantName || !form.address || !form.type || form.parkingLot === "") {
      alert("All fields are required");
      return;
    }

    const newRestaurant = {
      ...form,
      restaurantID: Date.now(),
      parkingLot: form.parkingLot === "true",
    };

    const updated = [...restaurants, newRestaurant];
    saveData(updated);
    setRestaurants(updated);
    alert("Restaurant added successfully");

    setForm({ ...form, restaurantName: "", address: "", type: "", parkingLot: "" });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    const updated = restaurants.filter((r) => r.restaurantID !== id);
    saveData(updated);
    setRestaurants(updated);
    alert("Deleted successfully");
  };

  const filtered = restaurants.filter((r) => {
    return (
      (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter ? r.type === typeFilter : true) &&
      (parkingFilter ? String(r.parkingLot) === parkingFilter : true)
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300, padding: 10 }}>
        <h3>Add Restaurant</h3>
        <input placeholder="Name" value={form.restaurantName}
          onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
        <input placeholder="Address" value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })} />

        <select value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="">Select Type</option>
          <option>Rajasthani</option>
          <option>Gujarati</option>
          <option>Mughlai</option>
          <option>Jain</option>
          <option>Thai</option>
          <option>North Indian</option>
          <option>South Indian</option>
        </select>

        <select value={form.parkingLot}
          onChange={(e) => setForm({ ...form, parkingLot: e.target.value })}>
          <option value="">Parking</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button onClick={handleAdd}>Add</button>
      </div>

      <div style={{ flex: 1, padding: 10 }}>
        <input ref={searchRef} placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option>Rajasthani</option>
          <option>Gujarati</option>
          <option>Mughlai</option>
          <option>Jain</option>
          <option>Thai</option>
          <option>North Indian</option>
          <option>South Indian</option>
        </select>
        <select onChange={(e) => setParkingFilter(e.target.value)}>
          <option value="">All Parking</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        {filtered.map((r) => (
          <div key={r.restaurantID} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <img src={r.image} width="200" />
            <h4>{r.restaurantName}</h4>
            <p>{r.address}</p>
            <p>Parking: {r.parkingLot ? "Yes" : "No"}</p>
            <button onClick={() => navigate(`/admin/restaurants/update/${r.restaurantID}`)}>
              Update
            </button>
            <button onClick={() => handleDelete(r.restaurantID)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;