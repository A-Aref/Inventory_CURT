import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";

import RawMaterial from "./classes/RawMaterial";
import MechanicalPart from "./classes/MechanicalPart";
import ElectricalPart from "./classes/ElectricalPart";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItem from "./AddItem";

import "./Inventory.css";
import UpdateItem from "./UpdateItem";

function Inventory(props) {

  const [items, setItems] = useState([]);

  const [show, setShow] = useState(false);
  const [addedSuccessfully, setAddedSuccessfully] = useState(true);
  const [category, setCategory] = useState("");

  const [updateShow, setUpdateShow] = useState(false);
  const [item, setItem] = useState({});

  function fetchItems() {
    fetch("/api/getItems")
      .then((res) => res.json())
      .then((data) => {
        setItems([]);
        JSON.parse(data).forEach((item) => {
          let object;
          if (item.__t === "RawMaterial") {
            object = new RawMaterial(item.name,item.quantity,item.id,item.type,item.purity,item._id);
          } else if (item.__t === "MechanicalPart") {
            object = new MechanicalPart(item.name,item.quantity,item.id,item.material,item.weight,item.dimensions,item._id);
          } else {
            object = new ElectricalPart(item.name,item.quantity,item.id,item.voltage,item.current,item.powerRating,item._id);
          }
          setItems((prevItems) => [...prevItems, object]);
        });
        setAddedSuccessfully(false);
      });
    }
    

  useEffect(() => {
    if(addedSuccessfully) {
    fetchItems();
    }
  }, [show,updateShow]);

  function deleteItem(id) {
    fetch("/api/deleteItem", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id ,user:props.user.id}),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Item deleted successfully");
          fetchItems();
        } else {
          toast.error("Unauthorized to delete item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      })
  }

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Navbar
        sticky="top"
        data-bs-theme="dark"
        className="bg-body-tertiary  justify-content-between p-100"
      >
        <NavDropdown
          title="Add item"
          id="basic-nav-dropdown"
          style={{ fontSize: "2rem", margin: "1rem" }}
        >
          <NavDropdown.Item onClick={() => {setShow(true),setCategory("mechanical")}}>Mechanical Part</NavDropdown.Item>
          <NavDropdown.Item onClick={() => {setShow(true),setCategory("raw")}}>Raw Material</NavDropdown.Item>
          <NavDropdown.Item onClick={() => {setShow(true),setCategory("electrical")}}>Electrical Part</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand>
          <h1>
            <i>Inventory</i>
          </h1>
        </Navbar.Brand>
        <IconButton
          style={{ color: "white", margin: "1rem" }}
          onClick={() => {
            props.setUser("");
            props.setPage("");
          }}
        >
          <LogoutIcon fontSize="large"></LogoutIcon>
        </IconButton>
      </Navbar>
      <br />
      <Table variant="dark" className="table">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
            {props.user.role === "admin" ? <th>Edit</th> : <></>}
            {props.user.role === "admin" ? <th>Delete</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.getId()}</td>
                <td>{item.getName()}</td>
                <td>{item.getQuantity()}</td>
                <td>
                  <ul>
                    {item.getDescription().map((desc, index) => {
                      return <li key={index} style={{listStyleType:"none",textAlign:"left"}}><i style={{color:"aquamarine"}}>{desc.name}:</i> {desc.val}</li>;
                    })}
                  </ul>
                </td>
                {props.user.role === "admin" ? (
                  <th>
                    <IconButton onClick={() => {setItem(item),setUpdateShow(true)}}>
                      <EditIcon fontSize="large" color="primary" />
                    </IconButton>
                  </th>
                ) : (
                  <></>
                )}
                {props.user.role === "admin" ? (
                  <th>
                    <IconButton onClick={() => deleteItem(item.get_id())}>
                      <DeleteIcon fontSize="large" color="error" />
                    </IconButton>
                  </th>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddItem show={show} setShow={setShow} category={category} setAddedSuccessfully={setAddedSuccessfully}/>
      <UpdateItem show={updateShow} setShow={setUpdateShow} category={item.__t} setAddedSuccessfully={setAddedSuccessfully} item={item} setItem={setItem} user={props.user.id}/>
    </div>
  );
}

export default Inventory;
