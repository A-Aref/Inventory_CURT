
export default class InventoryItem {
    constructor(name, quantity, id, _id,__t) {
        this.__t = __t;
        this._id = _id;
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

    getName() {
        return this.name;
    }

    getQuantity() {
        return this.quantity;
    }

    getId() {
        return this.id;
    }

    get_id() {
        return this._id;
    }
}