import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import StarRating from "../componnets/StarRating";

export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    if (!userId) return;

   axios.get(`http://localhost:5000/stores/user/${userId}`)
      .then(res => setStores(res.data))
      .catch(err => console.error("Error fetching stores:", err));
  }, []);

const handleSubmitRating = async (storeId) => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  if (!userId) return alert("User not logged in");

  // Use local rating if user selected, otherwise fallback to existing userRating
  const rating = ratings[storeId] || stores.find(s => s.id === storeId)?.userRating || 0;
  if (rating === 0) return alert("Select a rating first");

  try {
    const res = await axios.post(`/ratings`, { userId, storeId, rating });

    // Update frontend immediately
    setStores(prev =>
      prev.map(s =>
        s.id === storeId
          ? { ...s, avgRating: parseFloat(res.data.avgRating), userRating: rating }
          : s
      )
    );

    alert("Rating submitted!");
  } catch (err) {
    console.error("Error submitting rating:", err);
    alert("Failed to submit rating");
  }
};



  return (
    <Container className="mt-3">
      <h3>User Dashboard</h3>
      <Form.Control
        placeholder="Search stores"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Avg Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.filter(
            s => s.name.toLowerCase().includes(search.toLowerCase()) ||
                 s.address.toLowerCase().includes(search.toLowerCase())
          ).map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>
                <StarRating value={Math.round(s.avgRating)} onChange={() => {}} />
                <span className="ms-1">{Number(s.avgRating).toFixed(1)}</span>
              </td>
              <td>
                <StarRating
                  value={ratings[s.id] || s.userRating || 0}
                  onChange={r => setRatings({...ratings, [s.id]: r})}
                />
              </td>
              <td>
                <Button size="sm" onClick={() => handleSubmitRating(s.id)}>Submit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
