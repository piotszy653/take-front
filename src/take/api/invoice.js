import axios from 'axios'

let invoiceUrl = 'http://localhost:8080/take/invoices'
let clientUrl = 'http://localhost:8080/take/clients'

export async function fetchInvoices() {
    const response = await axios.get(invoiceUrl, {})
    const invoices = response.data

    return invoices
}

export async function fetchInvoice(id) {
    const response = await axios.get(
        invoiceUrl + '/' + id)
    return response.data
}

export async function fetchInvoicesByClient(id) {
    const response = await axios.get(clientUrl + '/'+id+'/invoices', {})
    return response.data
}

export async function createInvoice(invoice) {
    const response = await axios.post(invoiceUrl, {
        date: invoice.date,
        clientId: invoice.clientId,
        productIds: invoice.productsIds
    })
    return response.data
}

export async function updateInvoice(invoice, id) {
    const response = await axios.put(invoiceUrl + '/' + id, {
        date: invoice.date,
        clientId: invoice.clientId,
        productIds: invoice.productsIds
    })
    return response.data
}


export async function deleteInvoice(id) {
    await axios.delete(invoiceUrl + '/' + id)
}