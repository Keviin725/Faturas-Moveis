require('dotenv').config()
const router = require('express').Router()
const {InvoiceController} = require('../Controllers/InvoiceController')
const {ReceiptController} = require('../Controllers/ReceiptController')
const {QuotationController} = require('../Controllers/QuotationController')
const { UserController } = require('../Controllers/UserController')


// criacao do user
router.post('/auth/register', UserController.create)
//Login
router.post('/auth/login', UserController.login)
router.get('/users', UserController.index)

// Criacao de uma fatura
router.post('/invoice/create', InvoiceController.create)
// Buscar uma fatura
router.get('/invoice/:id', InvoiceController.show)
// Atualizar uma fatura
router.put('/invoice/:id', InvoiceController.update)
// Deletar uma fatura
router.delete('/invoice/:id', InvoiceController.delete)
router.get('/invoice', InvoiceController.index)

// Criacao de um recibo
router.post('/receipt/create', ReceiptController.create)
// Buscar um recibo
router.get('/receipt/:id', ReceiptController.show)
// Atualizar um recibo
router.put('/receipt/:id', ReceiptController.update)
// Deletar um recibo
router.delete('/receipt/:id', ReceiptController.delete)
router.get('/receipt', ReceiptController.index)

// Criacao de uma cotacao
router.post('/quotation/create', QuotationController.create)
// Buscar uma cotacao
router.get('/quotation/:id', QuotationController.show)
// Atualizar uma cotacao
router.put('/quotation/:id', QuotationController.update)
// Deletar uma cotacao
router.delete('/quotation/:id', QuotationController.delete)
router.get('/quotation', QuotationController.index)





module.exports = router
