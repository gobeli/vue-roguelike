import Item from './Item'; 

export default class Health extends Item {
  constructor() {
    super(3);
    this.amount = 20;
  }  
}