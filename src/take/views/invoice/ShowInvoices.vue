<template>
  <div>
    <v-card class="card" text v-if="invoices">
      <TitleContainer :url="'/clientDetails/'+ clientId" title="Client's invoices"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm10 offset-sm1>
            <v-list v-if="invoices">
              <v-list-item v-for="invoice in this.invoices" :key="invoice.id">
                <v-list-item-content>{{'Date: ' + invoice.date}}</v-list-item-content>
                <v-spacer/>
                <v-list-item-content>{{'Costs: ' + invoice.totalCosts}}</v-list-item-content>
                <v-spacer/>

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
                    @click="handleDelete(invoice.id)" v-bind="$attrs"
                  >Delete</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { deleteInvoice, fetchInvoicesByClient } from '@/take/api/invoice'
import TitleContainer from '@/components/TitleContainer'
import LinkButton from '@/components/LinkButton'
export default {
  name: 'ShowInvoices',
  data () {
    return {
      invoices: null
    }
  },
  props: {
    clientId: String
  },
  components: {
    TitleContainer,
    LinkButton
  },
  methods: {
    async handleDelete (id) {
        try{
        await deleteInvoice(id)
        alert('Invoice deleted')
        }catch(error){
            alert(error.response.status + "\n" + error.response.data)
        }
    }
  },
  async created () {
    try {
      this.invoices = await fetchInvoicesByClient(this.clientId)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>

<style>
</style>
