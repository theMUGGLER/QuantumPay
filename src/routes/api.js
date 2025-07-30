import express from 'express';
import apiKeyAuth from '../middleware/apiKeyAuth';
import { createInvoice, getInvoice } from '../controllers/invoiceController';

const router = express.Router();
router.post('/invoices', apiKeyAuth, createInvoice);
router.get('/invoices/:id', apiKeyAuth, getInvoice);
export default router;
