<template>
  <div>
    <v-card class="card" text v-if="warehouse">
      <TitleContainer url="/take" title="Warehouse's Details"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm8 offset-sm2>
            <v-card text>
                <v-toolbar text>
                    <v-toolbar-title>{{'id: ' + warehouse.id}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'name: ' + warehouse.name}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'address: ' + warehouse.address}}</v-toolbar-title>
                </v-toolbar>
            </v-card>
            <LinkButton
          block
          color="blue"
          dark
          :url="'/showProducts/'+ warehouse.id"
        >Show Products</LinkButton>
        <LinkButton
          block
          color="green"
          dark
          :url="'/warehouse/'+ warehouse.id"
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
import { fetchWarehouse, deleteWarehouse } from '@/take/api/warehouse'
import TitleContainer from '@/components/TitleContainer'
import LinkButton from '@/components/LinkButton'
export default {
  name: 'WarehouseDetails',
  data () {
    return {
      warehouse: null
    }
  },
  props: {
    warehouseId: String
  },
  components: {
    TitleContainer,
    LinkButton
  },
  methods: {
    async handleDelete () {
        try{
        await deleteWarehouse(this.warehouseId)
        alert('Warehouse deleted')
        }catch(error){
            alert(error)
        }
      this.$emit('click')
      this.$router.push('/take')
    }
  },
  async created () {
    try {
      this.warehouse = await fetchWarehouse(this.warehouseId)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>

<style>
</style>
