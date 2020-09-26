import axios from 'axios'

let clientUrl = 'http://localhost:8080/take/clients'

export async function fetchClients() {
    const response = await axios.get(clientUrl, {})
    const clients = response.data

    return clients
}

export async function fetchClient(id) {
    const response = await axios.get(
        clientUrl + '/' + id)
    return response.data
}

export async function createClient(client) {
    const response = await axios.post(clientUrl, {
        name: client.name,
        mail: client.mail
    })
    return response.data
}

export async function updateClient(client, id) {
    const response = await axios.put(clientUrl + '/' + id, {
        name: client.name,
        mail: client.mail
    })
    return response.data
}

export async function deleteClient(id) {
    await axios.delete(clientUrl + '/' + id)
}