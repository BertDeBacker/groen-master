<template>
  <!-- Login module -->
  <VCard width="400" class="mx-auto mt-5">
    <VCardTitle>
      <h1 class="display-1">Login</h1>
    </VCardTitle>
    <v-card-text>
      <v-form>
        <v-text-field label="Username" prepend-icon="mdi-account-circle"></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword=!showPassword"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <VCardActions>
      <v-btn color="success">Register</v-btn>
      <VSpacer />
      <v-btn color="info">Logon</v-btn>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  data: () => ({
    showPassword: false
  })
};
</script>

<style>
</style>