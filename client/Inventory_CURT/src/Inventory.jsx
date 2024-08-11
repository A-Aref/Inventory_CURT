import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Inventory.css";

function Inventory(props) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/getItems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
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
          <NavDropdown.Item onClick="#action/3.1">
            Mechanical Part
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Raw Material</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">
            Electrical Part
          </NavDropdown.Item>
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
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <ul>
                    {item.description.map((desc, index) => {
                      return <li key={index}>{desc}</li>;
                    })}
                  </ul>
                </td>
                {props.role === "admin" ? (
                  <th>
                    <IconButton onClick={() => {}}>
                      <EditIcon fontSize="large" color="primary" />
                    </IconButton>
                  </th>
                ) : (
                  <></>
                )}
                {props.role === "admin" ? (
                  <th>
                    <IconButton onClick={() => {}}>
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
    </div>
  );
}

export default Inventory;
