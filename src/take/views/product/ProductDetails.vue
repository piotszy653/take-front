<template>
  <div>
    <v-card class="card" text v-if="product">
      <TitleContainer url="/take" title="Product's Details"/>
      <v-form class="form">
        <v-layout row>
          <v-flex sm8 offset-sm2>
            <v-card text>
                <v-toolbar text>
                    <v-toolbar-title>{{'id: ' + product.id}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'name: ' + product.name}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'description: ' + product.description}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'manufacturer: ' + product.manufacturer}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'sold: ' + product.sold}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'price: ' + product.price}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text>
                    <v-toolbar-title>{{'quantity: ' + product.quantity}}</v-toolbar-title>
                </v-toolbar>
                <v-toolbar text v-if="product.warehouse">
                    <v-toolbar-title>{{'warehouse\'s id: ' + product.warehouse.id}}</v-toolbar-title>
                </v-toolbar>
            </v-card>
            <LinkButton v-if="product.warehouse"
          block
          color="blue"
          dark
          :url="'/warehouseDetails/'+ product.warehouse.id"
        >Show Warehouse</LinkButton>
        <LinkButton
          block
          color="green"
          dark
          :url="'/product/'+ product.id"
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
import { fetchProduct, deleteProduct } from '@/take/api/product'
import TitleContainer from '@/components/TitleContainer'
import LinkButton from '@/components/LinkButton'
export default {
  name: 'ProductDetails',
  data () {
    return {
      product: null
    }
  },
  props: {
    productId: String
  },
  components: {
    TitleContainer,
    LinkButton
  },
  methods: {
    async handleDelete () {
        try{
        await deleteProduct(this.productId)
        alert('Product deleted')
        }catch(error){
            alert(error)
        }
      this.$emit('click')
      this.$router.push('/take')
    }
  },
  async created () {
    try {
      this.product = await fetchProduct(this.productId)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>

<style>
</style>
