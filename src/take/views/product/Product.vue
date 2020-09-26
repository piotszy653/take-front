<template>
  <div>
    <v-card text class="card">
      <TitleContainer v-if="this.productId" url="/take" title="Product's update" />
      <TitleContainer v-else url="/take" title="New Product" />
      <v-form class="form">
        <v-text-field autofocus label="Name" class="input-text" v-model="product.name"></v-text-field>
        <v-text-field label="Description" class="input-text" v-model="product.description"></v-text-field>
        <v-text-field label="Manufacturer" class="input-text" v-model="product.manufacturer"></v-text-field>
        <v-text-field label="Price" class="input-text" v-model="product.price"></v-text-field>
        <v-text-field label="Quantity" class="input-text" v-model="product.quantity"></v-text-field>
        <v-text-field label="Warehouse's id" class="input-text" v-model="product.warehouseId"></v-text-field>

        <v-btn v-if="this.productId" @click="handleUpdate()" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreate()" block dark color="primary">Create</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import TitleContainer from "@/components/TitleContainer.vue";
import { createProduct, updateProduct, fetchProduct } from "@/take/api/product";
export default {
  name: "Product",
  data() {
    return {
      product: {
        name: "",
        description: "",
        manufacturer: "",
        price: "",
        quantity: "",
        warehouseId: ""
      }
    };
  },
  props: {
    productId: String
  },
  components: {
    TitleContainer
  },
  methods: {
    async handleCreate() {
      try {
        const response = await createProduct(this.product);
        this.$router.push("/productDetails/" + response.id);
      } catch (error) {
        if (error.response)
          alert(error.response.status + "\n" + error.response.data);
        else alert(error);
      }
    },
    async handleUpdate() {
      try {
        await updateProduct(this.product, this.productId);
        this.$router.push("/productDetails/" + this.productId);
      } catch (error) {
        if (error.response)
          alert(error.response.status + "\n" + error.response.data);
        else 
        alert(error)
        console.log(error)
      }
    }
  },
  async created() {
    if (this.productId) {
      try {
        const response = await fetchProduct(this.productId);
        this.product.name = response.name
        this.product.description = response.description
        this.product.manufacturer = response.manufacturer
        this.product.price = response.price
        this.product.quantity = response.quantity
        this.product.warehouseId = response.warehouse.id
      } catch (error) {
        console.log("error", error);
        alert(error);
      }
    }
  }
};
</script>

<style>
.card {
  max-width: 800px;
  margin: auto;
}

.form {
  padding: 8%;
}
</style>
