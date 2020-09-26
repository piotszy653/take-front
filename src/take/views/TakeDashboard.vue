<template>
  <div class="take-dashboard">
    <v-layout>
      <v-flex md10 offset-md1>
      <TitleContainer title="Dashboard"/>
      </v-flex>
    </v-layout>
    <v-layout row>
          <v-flex>
            <LinkButton
                    url="/warehouse/"
                    small
                    color="primary"
                    dark
                  >New Warehouse</LinkButton>
                  <LinkButton
                    url="/product/"
                    small
                    color="primary"
                    dark
                  >New Product</LinkButton>
                  <LinkButton
                    url="/invoice/"
                    small
                    color="primary"
                    dark
                  >New Invoice</LinkButton>
                  <LinkButton
                    url="/client/"
                    small
                    color="primary"
                    dark
                  >New Client</LinkButton>
          </v-flex>
        </v-layout>
    <v-layout>
      <v-flex class="tabs"  md6 offset-md3>
        <v-tabs  color="primary" dark centered hide-slider grow>
          <v-tab>Warehouses</v-tab>
          <v-tab>Products</v-tab>
          <v-tab>Invoices</v-tab>
          <v-tab>Clients</v-tab>
          <v-tab-item>
            <v-list v-if="warehouses">
              <v-list-item v-for="warehouse in this.warehouses" :key="warehouse.id">
                <v-list-item-content>{{warehouse.name}}</v-list-item-content>

                <v-list-item-content>
                  <LinkButton
                    :url="'/warehouseDetails/'+ warehouse.id"
                    small
                    color="blue"
                    dark
                  >Details</LinkButton>
                </v-list-item-content>
                <v-list-item-content>
                  <LinkButton
                  :url="'/warehouse/'+ warehouse.id"
                    small
                    color="green"
                    dark
                  >Update</LinkButton>
                </v-list-item-content>
                <v-list-item-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleDeleteWarehouse(warehouse.id)" v-bind="$attrs"
                  >Delete</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list v-if="products">
              <v-list-item v-for="product in this.products" :key="product.id">
                <v-list-item-content>{{product.name}}</v-list-item-content>

                <v-list-item-content>
                  <LinkButton
                  :url="'/productDetails/'+ product.id"
                    small
                    color="blue"
                    dark
                  >Details</LinkButton>
                </v-list-item-content>

                <v-list-item-content>
                  <LinkButton v-if="product.sold === false"
                  :url="'/product/'+ product.id"
                    small
                    color="green"
                    dark
                  >Update</LinkButton>
                  <v-btn v-else
                    small
                    text
                    color="white"
                    dark
                  >Update</v-btn>
                </v-list-item-content>

                <v-list-item-content>
                  <v-btn v-if="product.sold === false"
                    small
                    color="red"
                    dark
                    @click="handleDeleteProduct(product.id)" v-bind="$attrs"
                  >Delete</v-btn>
                  <v-btn v-else
                    text
                    small
                    color="white"
                    dark
                  >Delete</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list v-if="invoices">
              <v-list-item v-for="invoice in this.invoices" :key="invoice.id">
                <v-list-item-content>{{'Client: ' + invoice.client.name}}</v-list-item-content>
                <v-list-item-content>{{'Date: ' + invoice.date}}</v-list-item-content>
                <v-list-item-content>{{'Costs: ' + invoice.totalCosts}}</v-list-item-content>


                <v-list-item-content>
                  <LinkButton
                  :url="'/invoiceDetails/'+ invoice.id"
                    small
                    color="blue"
                    dark
                  >Details</LinkButton>
                </v-list-item-content>

                <v-list-item-content>
                  <LinkButton
                  :url="'/invoice/'+ invoice.id"
                    small
                    color="green"
                    dark
                  >Update</LinkButton>
                </v-list-item-content>
                <v-list-item-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleDeleteInvoice(invoice.id)" v-bind="$attrs"
                  >Delete</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list v-if="clients">
              <v-list-item v-for="client in this.clients" :key="client.id">
                <v-list-item-content>{{client.name}}</v-list-item-content>

                <v-list-item-content>
                  <LinkButton
                  :url="'/clientDetails/'+ client.id"
                    small
                    color="blue"
                    dark
                  >Details</LinkButton>
                </v-list-item-content>

                <v-list-item-content>
                  <LinkButton
                  :url="'/client/'+ client.id"
                    small
                    color="green"
                    dark
                  >Update</LinkButton>
                </v-list-item-content>

                <v-list-item-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleDeleteClient(client.id)" v-bind="$attrs"
                  >Delete</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LinkButton from '../../components/LinkButton'
import TitleContainer from '../../components/TitleContainer'
import { fetchWarehouses, fetchWarehousesBy, deleteWarehouse } from '../api/warehouse'
import { fetchProducts, fetchProductsBy, deleteProduct } from '../api/product'
import { fetchInvoices, fetchInvoicesBy, deleteInvoice } from '../api/invoice'
import { fetchClients, fetchClientsBy, deleteClient } from '../api/client'
export default {
  name: 'TakeDashboard',
  components: {
    LinkButton,
    TitleContainer
  },
  data () {
    return {
      warehouses: null,
      products: null,
      invoices: null,
      clients: null
    }
  },
  methods: {
    async handleDeleteWarehouse (warehouseId) {
        try{
        await deleteWarehouse(warehouseId)
        alert('Warehouse deleted')
        }catch(error){
            alert(error.response.status + "\n" + error.response.data)
        }
    },
    async handleDeleteProduct (productId) {
        try{
        await deleteProduct(productId)
        alert('Product deleted')
        }catch(error){
            alert(error.response.status + "\n" + error.response.data)
        }
    },
    async handleDeleteInvoice (invoiceId) {
        try{
        await deleteInvoice(invoiceId)
        alert('Invoice deleted')
        }catch(error){
            alert(error.response.status + "\n" + error.response.data)
        }
    },
    async handleDeleteClient (clientId) {
        try{
        await deleteClient(clientId)
        alert('Client deleted')
        }catch(error){
          if(error.response.status == 500){
            alert("Cannot delete client with invoices")
          }else{
            alert(error.response.status + "\n" + error.response.data)
          }
        }
    }
  },
  async created () {
    try {
      this.warehouses = await fetchWarehouses()
      this.products = await fetchProducts()
      this.invoices = await fetchInvoices()
      this.clients = await fetchClients()
    } catch (error) {
        console.log(error)
        alert(error)
    }
  }
}
</script>

<style>
</style>
