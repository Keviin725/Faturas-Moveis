// models/Receipt.js
export default class Receipt {
    constructor(datePaid, paymentMethod, amountPaid, invoice) {
      this.datePaid = datePaid;
      this.paymentMethod = paymentMethod;
      this.amountPaid = amountPaid;
      this.invoice = invoice;
    }
  }
  