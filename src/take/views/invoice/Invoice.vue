<template>
  <div>
    <v-card text class="card">
      <TitleContainer v-if="this.invoiceId" url="/take" title="Invoice's update" />
      <TitleContainer v-else url="/take" title="New Invoice" />
      <v-form class="form">
        <v-text-field autofocus label="Date" class="input-text" v-model="invoice.date"></v-text-field>
        <v-text-field label="Client's id" class="input-text" v-model="invoice.clientId"></v-text-field>
        <v-text-field label="Products' ids" class="input-text" v-model="productsIds"></v-text-field>

        <v-btn v-if="this.invoiceId" @click="handleUpdate()" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreate()" block dark color="primary">Create</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import TitleContainer from "@/components/TitleContainer.vue";
import { createInvoice, updateInvoice, fetchInvoice } from "@/take/api/invoice";
export default {
  name: "Invoice",
  data() {
    return {
      invoice: {
        date: "",
        clientId: "",
        productsIds: []
      },
      productsIds: ""
    };
  },
  props: {
    invoiceId: String
  },
  components: {
    TitleContainer
  },
  methods: {
    async handleCreate() {
      try {
        this.invoice.productsIds = this.productsIds.split(",");
        const response = await createInvoice(this.invoice);
        this.$router.push("/invoiceDetails/" + response.id);
      } catch (error) {
        if (error.response)
          alert(error.response.status + "\n" + error.response.data);
        else {
            alert(error)
            console.log(error)
        }
      }
    },
    async handleUpdate() {
      try {
        this.invoice.productsIds = this.productsIds.split(",");
        await updateInvoice(this.invoice, this.invoiceId);
        this.$router.push("/invoiceDetails/" + this.invoiceId);
      } catch (error) {
        if (error.response)
          alert(error.response.status + "\n" + error.response.data);
        else {
            alert(error)
            console.log(error)
        }
      }
    },
    getId(object) {
      return object.id;
    }
  },
  async created() {
    if (this.invoiceId) {
      try {
        const response = await fetchInvoice(this.invoiceId);
        this.invoice.date = response.date;
        this.invoice.clientId = response.client.id;
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
