import axios from 'axios'

let productsUrl = 'http://localhost:8080/take/products'
let warehouseUrl = 'http://localhost:8080/take/warehouses'

export async function fetchProducts() {
    const response = await axios.get(productsUrl, {})
    const product = response.data

    return product
}

export async function fetchProductsByWarehouse(id) {
    const response = await axios.get(warehouseUrl + '/'+id+'/products', {})
    const product = response.data

    return product
}

export async function fetchProduct(id) {
        const response = await axios.get(
            productsUrl + '/' + id)
        return response.data
}

export async function createProduct(product) {
    const response = await axios.post(productsUrl, {
        name:product.name,
        description: product.description,
        manufacturer:product.manufacturer,
        price:product.price,
        quantity:product.quantity,
        warehouseId:product.warehouseId
    })
    return response.data
}

export async function updateProduct(product, id) {
    const response = await axios.put(productsUrl + '/' + id, {
        name:product.name,
        description: product.description,
        manufacturer:product.manufacturer,
        price:product.price,
        quantity:product.quantity,
        warehouseId:product.warehouseId
    })
    return response.data
}

export async function deleteProduct(id) {
    await axios.delete(productsUrl + '/' + id)
}