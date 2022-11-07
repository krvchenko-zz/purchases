<template>
  <v-container>
    <div style="min-height: 4px">
      <v-progress-linear indeterminate :active="loading"></v-progress-linear>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12">
            <upload-form />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Список закупок
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              single-line
            ></v-text-field>
            <div class="d-flex" style="width: 100%">
              <v-select
                class="mr-3"
                v-model="form.field"
                :items="sortOptions"
                label="Сортировка"
                item-value="value"
                item-text="label"
                dense
                outlined
                @change="submit"
              ></v-select>
              <v-select
                v-model="form.status"
                :items="statusOptions"
                label="Статус"
                item-value="value"
                item-text="label"
                dense
                outlined
                @change="submit"
              ></v-select>
              <v-btn class="ml-3" icon color="red" @click="toggleOrder">
                <v-icon v-if="form.order === 'desc'"
                  >mdi-sort-descending</v-icon
                >
                <v-icon v-else>mdi-sort-ascending</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
          >
            <!-- eslint-disable-next-line -->
            <template v-slot:item.active="{ item }">
              <v-icon dark :color="item.active ? 'green' : 'red'">
                <template v-if="item.active"
                  >mdi-checkbox-marked-circle</template
                >
                <template v-else>mdi-minus-circle</template>
              </v-icon>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="blue"
                class="ma-2 white--text"
                small
                :to="{
                  name: 'purchase',
                  params: {
                    name: item.name,
                  },
                }"
              >
                <b>Детали</b>
                <v-icon right dark> mdi-pencil </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import { mapGetters } from 'vuex'
import UploadForm from '../components/UploadForm'

export default {
  name: 'Home',

  components: {
    UploadForm,
  },

  computed: {
    ...mapGetters({
      purchases: 'purchase/purchases',
    }),
  },

  data: () => ({
    search: null,
    data: [],
    loading: false,
    headers: [
      {
        text: 'Название',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Дата',
        align: 'start',
        sortable: true,
        value: 'date',
      },
      {
        text: 'Статус',
        align: 'center',
        sortable: true,
        value: 'active',
      },
      {
        text: 'Действия',
        align: 'end',
        sortable: false,
        value: 'actions',
      },
    ],
    sortOptions: [
      {
        label: 'Дата',
        value: 'date'
      },
      {
        label: 'Название',
        value: 'order_name'
      },
    ],
    statusOptions: [
      {
        label: 'Активные',
        value: 'active'
      },
      {
        label: 'Завершенные',
        value: 'deactive'
      },
      {
        label: 'Все',
        value: 'all'
      },
    ],
    form: {
      field: 'date',
      order: 'desc',
      status: 'active'
    },
  }),

  watch: {
    purchases: {
      immediate: true,
      handler(val) {
        this.data = val
      }
    },
  },

  methods: {
    toggleOrder() {
      if (this.form.order === 'desc') {
        this.form.order = 'asc'
        this.submit()
        return false
      }

      if (this.form.order === 'asc') {
        this.form.order = 'desc'
        this.submit()
        return false
      }
    },

    async submit() {
      this.loading = true
      await this.$store.dispatch('purchase/fetchPurchases', this.form)
      .then(res => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss"></style>
