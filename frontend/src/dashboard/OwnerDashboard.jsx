import React, { useState, useEffect } from "react";
import { Container, Table, Form } from "react-bootstrap";
import StarRating from "../componnets/StarRating";
import axios from "axios";
// Star Rating Component (readonly)


export default function OwnerDashboard() {
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const ownerId = JSON.parse(localStorage.getItem("user"))?.id;
    if (!ownerId) return;

    axios.get(`http://localhost:5000/owner/stores/${ownerId}`)
      .then(res => setStores(res.data))
      .catch(err => console.error("Error fetching stores:", err));
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-3 text-center">Owner Dashboard</h3>

      <Form.Control
        placeholder="Search stores by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Avg Rating</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {stores
            .filter(
              (store) =>
                store.name.toLowerCase().includes(search.toLowerCase()) ||
                store.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>
                  <StarRating value={store.avgRating || 0} />
                  <span className="ms-1">{(store.avgRating || 0).toFixed(1)}</span>
                </td>
                <td>{store.email}</td>
                <td>{store.address}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
