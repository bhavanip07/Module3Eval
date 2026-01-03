import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, saveData } from "../utils/localStorage";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const data = getData();
    setForm(data.find((r) => r.restaurantID === Number(id)));
  }, [id]);

  const handleUpdate = () => {
    if (!confirm("Are you sure you want to update?")) return;
    const data = getData();
    const updated = data.map((r) =>
      r.restaurantID === Number(id) ? form : r
    );
    saveData(updated);
    alert("Updated successfully");
    navigate("/admin/dashboard");
  };

  if (!form) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Update Restaurant</h2>
      <input value={form.restaurantName}
        onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
      <input value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateRestaurant;