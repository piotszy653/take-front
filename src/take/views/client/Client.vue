<template>
  <div>
    <v-card text class="card">
      <TitleContainer v-if="this.clientId" url="/take" title="Client's update" />
      <TitleContainer v-else url="/take" title="New Client" />
      <v-form class="form">
        <v-text-field autofocus label="Name" class="input-text" v-model="client.name"></v-text-field>
        <v-text-field label="Mail" class="input-text" v-model="client.mail"></v-text-field>

        <v-btn v-if="this.clientId" @click="handleUpdate()" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreate()" block dark color="primary">Create</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import TitleContainer from "@/components/TitleContainer.vue";
import {
  createClient,
  updateClient,
  fetchClient
} from "@/take/api/client";
export default {
  name: "Client",
  data() {
    return {
      client: {
        name: "",
        mail: ""
      }
    };
  },
  props: {
    clientId: String
  },
  components: {
    TitleContainer
  },
  methods: {
    async handleCreate() {
      try {
        const response = await createClient(this.client);
        this.$router.push("/clientDetails/" + response.id);
      } catch (error) {
        alert(error.response.status + "\n" + error.response.data);
      }
    },
    async handleUpdate() {
      try {
        await updateClient(this.client, this.clientId);
        this.$router.push("/clientDetails/" + this.clientId);
      } catch (error) {
        alert(error.response.status + "\n" + error.response.data);
      }
    }
  },
  async created() {
      if (this.clientId) {
        try {
          const response = await fetchClient(this.clientId);
          this.client.name = response.name
          this.client.mail = response.mail
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
