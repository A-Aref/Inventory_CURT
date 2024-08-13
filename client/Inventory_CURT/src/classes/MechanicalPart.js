
import InventoryItem from "./InventoryItem";

export default class MechanicalPart extends InventoryItem {
  constructor(name, quantity, id, material, weight, dimensions,_id) {
    super(name, quantity, id,_id,"mechanical");
    this.material = material;
    this.weight = weight;
    this.dimensions = dimensions;
  }

  getDescription() {
    return [{name:"Material", val:this.material}, {name:"Weight", val:this.weight}, {name:"Dimensions", val:this.dimensions}];
  }
}
