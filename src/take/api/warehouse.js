import axios from 'axios'

let warehouseUrl = 'http://localhost:8080/take/warehouses'

export async function fetchWarehouses() {
    const response = await axios.get(warehouseUrl)
    const warehouses = response.data

    return warehouses
}


export async function fetchWarehouse(id) {
        const response = await axios.get(warehouseUrl + '/' + id)
        return response.data
}

export async function createWarehouse(warehouse) {
    const response = await axios.post(warehouseUrl, {
        name: warehouse.name,
        address: warehouse.address
    })
    return response.data
}

export async function updateWarehouse(warehouse, id) {
    const response = await axios.put(warehouseUrl + '/' + id, {
        name: warehouse.name,
        address: warehouse.address
    })
    return response.data
}

export async function deleteWarehouse(id) {
    await axios.delete(warehouseUrl + '/' + id)
}