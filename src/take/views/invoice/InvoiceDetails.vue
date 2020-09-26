<template>
  <div>
    <v-card class="card" text v-if="invoice">
      <TitleContainer url="/take" title="Invoice's Details"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm6 offset-sm3>
            <v-card text>
                <v-toolbar text>
                    <v-toolbar-title>{{'id: ' + invoice.id}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'date: ' + invoice.date}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'total costs: ' + invoice.totalCosts}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'client id: ' + invoice.client.id}}</v-toolbar-title>
                </v-toolbar>
            </v-card>
            <br/><br/><br/>
            <TitleContainer title="Invoice's products"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm10 offset-sm1>
            <v-list v-if="this.invoice.products">
              <v-list-item v-for="product in this.invoice.products" :key="product.id">
                <v-list-item-content>{{product.name}}</v-list-item-content>

                <v-list-item-content>
                  <LinkButton
                  :url="'/productDetails/'+ product.id"
                    small
                    color="blue"
                    dark
                  >Details</LinkButton>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-form>
      <LinkButton v-if="invoice.client"
          block
          color="blue"
          dark
          :url="'/clientDetails/'+ invoice.client.id"
        >Show Client</LinkButton>
        <LinkButton
          block
          color="green"
          dark
          :url="'/invoice/'+ invoice.id"
        >Update</LinkButton>
        <v-btn
          block
          color="red"
          dark
          @click="handleDelete" v-bind="$attrs"
        >Delete</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { deleteInvoice, fetchInvoice } from '@/take/api/invoice'
import TitleContainer from '@/components/TitleContainer'
import LinkButton from '@/components/LinkButton'
export default {
  name: 'InvoiceDetails',
  data () {
    return {
      invoice: null
    }
  },
  props: {
    invoiceId: String
  },
  components: {
    TitleContainer,
    LinkButton
  },
  methods: {
    async handleDelete () {
        try{
        await deleteInvoice(this.invoiceId)
        alert('Invoice deleted')
        }catch(error){
            alert(error)
        }
      this.$emit('click')
      this.$router.push('/take')
    }
  },
  async created () {
    try {
      this.invoice = await fetchInvoice(this.invoiceId)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>

<style>
</style>
