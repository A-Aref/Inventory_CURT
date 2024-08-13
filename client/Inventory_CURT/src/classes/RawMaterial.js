
import InventoryItem from "./InventoryItem";

export default class RawMaterial extends InventoryItem {
  constructor(name, quantity, id, type, purity,_id) {
    super(name, quantity, id,_id,"raw");
    this.type = type;
    this.purity = purity;
  }

  getDescription() {
    return [{name:"Type", val:this.type}, {name:"Purity", val:this.purity}];
  }
}
