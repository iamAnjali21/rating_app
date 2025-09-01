import React, { useEffect, useState } from "react";
import {Table,Button, Form, Card,Container, Row,Col,Modal,} from "react-bootstrap";
import { fetchUsers, addUser, fetchStores, addStore, addrating, fetchRatings } from "../api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users"); // "users" or "stores"
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const  [ratings,setRating]=useState([]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [ newRating ,setnewRating]= useState({
      
  })
  const [searchUser, setSearchUser] = useState("");
  const [searchStore, setSearchStore] = useState("");

  // Fetch users and stores
  useEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));

    fetchStores()
      .then((res) => setStores(res.data))
      .catch((err) => console.error("Error fetching stores", err));
      
      fetchRatings()
      .then((res)=> setRating(res.data))
      .catch((err)=> console.error("Error fetch  rating",err));
  }, []);

  // Add User
  const handleAddUser = async () => {
    try {
      const res = await addUser(newUser);
      setUsers([...users, res.data]);
      setShowUserModal(false);
      setNewUser({ name: "", email: "", password: "", address: "", role: "user" });
    } catch (err) {
      alert("Error adding user: " + (err.response?.data?.error || err.message));
    }
  };
   
  // Add Store
  const handleAddStore = async () => {
    try {
      const res = await addStore(newStore);
      setStores([...stores, res.data]);
      setShowStoreModal(false);
      setNewStore({ name: "", email: "", address: "" });
    } catch (err) {
      alert("Error adding store: " + (err.response?.data?.error || err.message));
    }
  };

  //Add rating
 
const getAvgRating = (storeId) => {
  const storeRatings = ratings.filter(r => r.store_id === storeId);
  if (storeRatings.length === 0) return "No ratings";
  const avg = storeRatings.reduce((acc, r) => acc + r.rating, 0) / storeRatings.length;
  return avg.toFixed(1);
};


  return (
    <Container fluid className="mt-3">
      <h1>Admin Dashboard</h1>

      {/* Summary Cards */}
      <Row>
        <Col><Card className="p-3 text-center"><h4>Total Users: {users.length}</h4></Card></Col>
        <Col><Card className="p-3 text-center"><h4>Total Stores: {stores.length}</h4></Card></Col>
        <Col><Card className="p-3 text-center"><h4>Total Ratings: {ratings.length}</h4></Card></Col>
      </Row>

      {/* Tabs */}
      <Row className="mt-4 mb-2">
        <Col>
          <Button
            variant={activeTab === "users" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setActiveTab("users")}
          >
            Users
          </Button>
          <Button
            variant={activeTab === "stores" ? "primary" : "outline-primary"}
            onClick={() => setActiveTab("stores")}
          >
            Stores
          </Button>
        </Col>
        <Col className="text-end">
          {activeTab === "users" && <Button onClick={() => setShowUserModal(true)}>+ Add User</Button>}
          {activeTab === "stores" && <Button onClick={() => setShowStoreModal(true)}>+ Add Store</Button>}
        </Col>
      </Row>

      {/* Users Table */}
      {activeTab === "users" && (
        <>
          <Form.Control
            placeholder="Search users by name/email"
            className="mb-2"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(u =>
                  u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                  u.email.toLowerCase().includes(searchUser.toLowerCase())
                )
                .map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.address}</td>
                    <td>{u.role}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Stores Table */}
      {activeTab === "stores" && (
        <>
          <Form.Control
            placeholder="Search stores by name/address"
            className="mb-2"
            value={searchStore}
            onChange={(e) => setSearchStore(e.target.value)}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Address</th><th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores
                .filter(s =>
                  s.name.toLowerCase().includes(searchStore.toLowerCase()) ||
                  s.address.toLowerCase().includes(searchStore.toLowerCase())
                )
                .map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.address}</td>
                    <td>{getAvgRating(s.id)}</td>

                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}

      

      {/* Add User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add New User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Store Modal */}
      <Modal show={showStoreModal} onHide={() => setShowStoreModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add New Store</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                value={newStore.name}
                onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newStore.email}
                onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={newStore.address}
                onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStoreModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddStore}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;
