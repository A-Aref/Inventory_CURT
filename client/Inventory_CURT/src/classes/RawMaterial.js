import { InventoryItem } from "./inventoryItem";

class RawMaterial extends InventoryItem {
  constructor(name, quantity, id, type, purity) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
    this.type = type;
    this.purity = purity;
  }

  getDescription() {
    return [this.type, this.purity];
  }
}
