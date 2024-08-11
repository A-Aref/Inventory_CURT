
import { InventoryItem } from "./inventoryItem";

class ElectricalPart extends InventoryItem {
  constructor(name, quantity, id, voltage, current, powerRating) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
    this.voltage = voltage;
    this.current = current;
    this.powerRating = powerRating;
  }

  getDescription() {
    return [this.voltage, this.current, this.powerRating];
  }
}
