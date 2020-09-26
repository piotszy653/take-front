<template>
  <div>
    <v-card text class="card">
      <TitleContainer v-if="this.warehouseId" url="/take" title="Warehouse's update" />
      <TitleContainer v-else url="/take" title="New Warehouse" />
      <v-form class="form">
        <v-text-field autofocus label="Name" class="input-text" v-model="warehouse.name"></v-text-field>
        <v-text-field label="Address" class="input-text" v-model="warehouse.address"></v-text-field>

        <v-btn v-if="this.warehouseId" @click="handleUpdate()" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreate()" block dark color="primary">Create</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import TitleContainer from "@/components/TitleContainer.vue";
import {
  createWarehouse,
  updateWarehouse,
  fetchWarehouse
} from "@/take/api/warehouse";
export default {
  name: "Warehouse",
  data() {
    return {
      warehouse: {
        name: "",
        address: ""
      }
    };
  },
  props: {
    warehouseId: String
  },
  components: {
    TitleContainer
  },
  methods: {
    async handleCreate() {
      try {
        const response = await createWarehouse(this.warehouse);
        this.$router.push("/warehouseDetails/" + response.id);
      } catch (error) {
        alert(error.response.status + "\n" + error.response.data);
      }
    },
    async handleUpdate() {
      try {
        await updateWarehouse(this.warehouse, this.warehouseId);
        this.$router.push("/warehouseDetails/" + this.warehouseId);
      } catch (error) {
        alert(error.response.status + "\n" + error.response.data);
      }
    }
  },
  async created() {
      if (this.warehouseId) {
        try {
          const response = await fetchWarehouse(this.warehouseId);
          this.warehouse.name = response.name
          this.warehouse.address = response.address
        } catch (error) {
          console.log("error", error);
          alert(error);
        }
      }
    },
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
