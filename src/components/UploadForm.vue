<template>
  <v-card color="primary" dark min-width="320px" class="purchase-upload">
    <v-card-title
      class="text-h6 purchase-upload__title"
      @click="formOpend = !formOpend"
    >
      <v-icon color="white darken-2" class="mr-2">mdi-file-upload</v-icon>
      <b>Загрузить закупку</b>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-if="formOpend">
        <form v-if="!loading && !success" @submit.prevent="submit">
          <v-text-field
            v-model="name"
            label="Введите название закупки"
          ></v-text-field>
          <v-file-input
            v-model="file"
            truncate-length="15"
            label="Выберите файл"
            :error="error"
            :error-messages="errorMessage"
          ></v-file-input>
          <v-btn class="mt-1" block color="green" @click="submit">
            Загрузить
          </v-btn>
        </form>
        <div v-if="loading" style="min-height: 176px">
          <v-progress-linear
            color="white accent-4"
            indeterminate
            rounded
            height="4"
          ></v-progress-linear>
        </div>
        <div v-if="success" style="min-height: 176px" class="text-center pt-12">
          <v-icon dark> mdi-checkbox-marked-circle </v-icon>
          <div class="text-h5 font-weight-bold mt-5 mb-5">Файл загружен!</div>
          <v-btn block color="green" @click="success = false">
            Загрузить еще
          </v-btn>
        </div>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'UploadForm',

  computed: {
  },

  data: () => ({
    name: null,
    file: null,
    loading: false,
    formOpend: false,
    error: false,
    errorMessage: null,
    success: false,
  }),

  methods: {
    async submit() {
      this.loading = true
      let formData = new FormData()

      formData.append('upload_file', this.file)
      formData.append('order_name', this.name)

      try {
        const { data } = await axios.post('/upload_test', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })

        this.loading = false
        this.error = false
        this.success = true
        this.name = null
        this.file = null
      } catch (e) {
        this.loading = false
        this.error = true
        this.errorMessage = e.response.data.errors
      }
    }
  },
}
</script>

<style lang="scss">
  .purchase-upload {
    position: fixed;
    right: 20px;
    top: 70px;
    z-index: 100;
    &__title {
      cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
      position: relative;
      right: 0;
      top: 0;
    }
  }
</style>