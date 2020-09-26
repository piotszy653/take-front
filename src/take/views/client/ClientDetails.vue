<template>
  <div>
    <v-card class="card" text v-if="client">
      <TitleContainer url="/take" title="Client's Details"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm6 offset-sm3>
            <v-card text>
                <v-toolbar text>
                    <v-toolbar-title>{{'id: ' + client.id}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'name: ' + client.name}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'mail: ' + client.mail}}</v-toolbar-title>
                </v-toolbar>
            </v-card>
            <LinkButton
          block
          color="blue"
          dark
          :url="'/showInvoices/'+ client.id"
        >Show Invoices</LinkButton>
        <LinkButton
          block
          color="green"
          dark
          :url="'/client/'+ client.id"
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
import { fetchClient, deleteClient } from '@/take/api/client'
import TitleContainer from '@/components/TitleContainer'
import LinkButton from '@/components/LinkButton'
export default {
  name: 'ClientDetails',
  data () {
    return {
      client: null
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
    async handleDelete () {
        try{
        await deleteClient(this.clientId)
        alert('Client deleted')
        }catch(error){
           if(error.response.status == 500){
            alert("Cannot delete client with invoices")
          }else{
            alert(error.response.status + "\n" + error.response.data)
          }
        }
      this.$emit('click')
      this.$router.push('/take')
    }
  },
  async created () {
    try {
      this.client = await fetchClient(this.clientId)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>

<style>
</style>
