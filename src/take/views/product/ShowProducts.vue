<template>
  <div>
    <v-card class="card" text v-if="products">
      <TitleContainer :url="'/warehouseDetails/'+ warehouseId" title="Warehouse's products"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm10 offset-sm1>
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
                  <LinkButton
                  :url="'/product/'+ product.id"
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
                    @click="handleDelete(product.id)" v-bind="$attrs"
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
import { deleteProduct, fetchProductsByWarehouse } from '@/take/api/product'
import TitleContainer from '@/components/TitleContainer'
import LinkButton from '@/components/LinkButton'
export default {
  name: 'ShowProducts',
  data () {
    return {
      products: null
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
    async handleDelete (id) {
        try{
        await deleteProduct(id)
        alert('Product deleted')
        }catch(error){
            alert(error.response.status + "\n" + error.response.data)
        }
    }
  },
  async created () {
    try {
      this.products = await fetchProductsByWarehouse(this.warehouseId)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>

<style>
</style>
