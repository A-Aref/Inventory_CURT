
import InventoryItem from "./InventoryItem";

export default class ElectricalPart extends InventoryItem {
  constructor(name, quantity, id, voltage, current, powerRating,_id) {
    super(name, quantity, id,_id,"electrical");
    this.voltage = voltage;
    this.current = current;
    this.powerRating = powerRating;
  }

  getDescription() {
    return [{name:"Voltage", val:this.voltage}, {name:"Current", val:this.current}, {name:"Power Rating", val:this.powerRating}];
  }
}

