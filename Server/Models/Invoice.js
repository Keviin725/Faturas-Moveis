export default class Invoice {
    constructor(date, totalAmount, user, items = []) {
      this.date = date;
      this.totalAmount = totalAmount;
      this.user = user;
      this.items = items;
    }
  }