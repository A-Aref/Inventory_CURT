
export class InventoryItem {
    constructor(name, quantity, id) {
        this.name = name;
        this.quantity = quantity;
        this.id = id;
        if(this.constructor == InventoryItem) {
            throw new Error("Class is of abstract type and can't be instantiated");
         };
   
         if(this.getDescription == undefined) {
             throw new Error("getArea method must be implemented");
         };
    }
}