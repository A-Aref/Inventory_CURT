import { InventoryItem } from "./inventoryItem";

class MechanicalPart extends InventoryItem {
  constructor(name, quantity, id, material, weight, dimensions) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
    this.material = material;
    this.weight = weight;
    this.dimensions = dimensions;
  }

  getDescription() {
    return [this.material, this.weight, this.dimensions];
  }
}
