// models/Quotation.js
export default class Quotation {
    constructor(dateCreated, expirationDate, items = [], user) {
      this.dateCreated = dateCreated;
      this.expirationDate = expirationDate;
      this.items = items;
      this.user = user;
    }
  }
  
  module.exports = Quotation