import { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function UpdateItem(props) {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [weight, setWeight] = useState(0);
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");

  const [power, setPower] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);

  const [type, setType] = useState("");
  const [purity, setPurity] = useState(0);

  const [enableAdd, setEnableAdd] = useState(false);

  useEffect(() => {
    setName(props.item.name || "");
    setQuantity(props.item.quantity || 1);
    setWeight(props.item.weight || 0);
    setMaterial(props.item.material || "");
    setDimensions(props.item.dimensions || "");
    setPower(props.item.powerRating || 0);
    setVoltage(props.item.voltage || 0);
    setCurrent(props.item.current || 0);
    setType(props.item.type || "");
    setPurity(props.item.purity || 0);
  },[props.item]);

  useEffect(() => {

    if (!(name.trim() === "" || quantity == 0))
    {
        if(!/^[a-zA-Z]+$/.test(name.trim()))
            {
                toast.error("Please enter a valid name (only alphabets).");
                setEnableAdd(false);
            }
        if(props.category === "mechanical") 
        {
            if(!(dimensions.trim() === "" || material.trim() === "" || weight == 0))
            {
                if(!/^[a-zA-Z]+$/.test(material.trim()))
                {
                    toast.error("Please enter a valid material (only alphabets).");
                    setEnableAdd(false);
                    return;
                }
                if(!/(\d+)x(\d+)x(\d+)/.test(dimensions.trim()))
                {
                    toast.error("Please enter valid dimensions (Length x Width x Height).");
                    setEnableAdd(false);
                    return;
                }
                setEnableAdd(true);
            }
            else
            {
                setEnableAdd(false);
            }
        }
        else if(props.category === "electrical")
        {
            if(!(voltage == 0 || current == 0 || power == 0))
            {
                setEnableAdd(true);
            }
            else
            {
                setEnableAdd(false);
            }
        }
        else
        {
            if(!(type.trim() === "" || purity == 0))
            {
                if(!/^[a-zA-Z]+$/.test(type.trim()))
                    {
                        toast.error("Please enter a valid type (only alphabets).");
                        setEnableAdd(false);
                    }
                setEnableAdd(true);
            }
            else
            {
                setEnableAdd(false);
            }
        }
    }
    else
    {
        setEnableAdd(false);
    }

  }, [name, quantity, weight, material, dimensions, power, voltage, current, type, purity]);

  function handleUpdateItem() {
    let description = {};
    if(props.category === "mechanical") {
        description = {dimensions: dimensions, material: material, Weight: weight};
    } else if(props.category === "electrical") {
        description = {voltage: voltage, current: current, power: power};
    } else {
        description = {type: type, purity: purity};
    }
  fetch("/api/updateItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({_id:props.item._id, name: name, quantity: quantity, description: description, category: props.category}),
  })
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            console.error("Error adding item:", response);
            toast.error("An unexpected error occurred. Please try again later.");
        }
    }).then((data) => {
        toast.success(data);
        props.setAddedSuccessfully(true);
        handleClose();
    })
}

  const handleClose = () => {
    props.setItem({});
    props.setShow(false);
    setCurrent(0);
    setDimensions("");
    setMaterial("");
    setName("");
    setPower(0);
    setPurity(0);
    setQuantity(1);
    setType("");
    setVoltage(0);
    setWeight(0);
    setEnableAdd(false);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>
            {props.category === "electrical"
              ? "Electrical Part"
              : props.category === "mechanical"
              ? "Mechanical Part"
              : "Raw Material"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
            />
            <Form.Label htmlFor="quantity">Quantity</Form.Label>
            <Form.Control
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              autoFocus
            />
          </Form>
          {props.category === "mechanical" ? (
            <Form>
              <Form.Label htmlFor="dimension">Dimensions</Form.Label>
              <InputGroup className="mb-3">
              <Form.Control
                id="dimension"
                type="text"
                value={dimensions}
                onChange={(e) => {
                  setDimensions(e.target.value);
                }}
                autoFocus
              />
              <InputGroup.Text>cm</InputGroup.Text>
              </InputGroup>
              <Form.Label htmlFor="material">Material</Form.Label>
              <Form.Control
                id="material"
                type="text"
                value={material}
                onChange={(e) => {
                  setMaterial(e.target.value);
                }}
                autoFocus
              />
              <Form.Label htmlFor="weight">Weight</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="weight"
                  type="number"
                  value={weight}
                  min={0}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  autoFocus
                />
                <InputGroup.Text>Kg</InputGroup.Text>
              </InputGroup>
            </Form>
          ) : props.category === "electrical" ? (
            <Form>
              <Form.Label htmlFor="voltage">Voltage</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="voltage"
                  type="number"
                  min={0}
                  value={voltage}
                  onChange={(e) => {
                    setVoltage(e.target.value);
                  }}
                  autoFocus
                />
                <InputGroup.Text>Volts</InputGroup.Text>
              </InputGroup>
              <Form.Label htmlFor="current">Current</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="current"
                  type="number"
                  min={0}
                  value={current}
                  onChange={(e) => {
                    setCurrent(e.target.value);
                  }}
                  autoFocus
                />
                <InputGroup.Text>miliAmperes</InputGroup.Text>
              </InputGroup>
              <Form.Label htmlFor="power">Power Rating</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="power"
                  type="number"
                  min={0}
                  value={power}
                  onChange={(e) => {
                    setPower(e.target.value);
                  }}
                  autoFocus
                />
                <InputGroup.Text>Watts</InputGroup.Text>
              </InputGroup>
            </Form>
          ) : (
            <Form>
              <Form.Label htmlFor="type">Type</Form.Label>
              <Form.Control
                id="type"
                type="text"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                autoFocus
              />
              <Form.Label htmlFor="purity">Purity</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="purity"
                  type="number"
                  min={0}
                  value={purity}
                  onChange={(e) => {
                    setPurity(e.target.value);
                  }}
                  autoFocus
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateItem} disabled={!enableAdd}>
            Save Chnages
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateItem;
