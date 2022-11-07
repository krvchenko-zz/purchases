<!-- eslint-disable -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="mt-3 mb-5">{{ $route.params.name }}</h1>
        <v-card>
          <v-card-title>
            Список поставщиков
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="vendors"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
          > 
            <template v-slot:item.active="{ item }">
              <v-icon
                dark
                :color="item.active ? 'green' : 'red'"
              >
                <template v-if="item.active">mdi-checkbox-marked-circle</template>
                <template v-else>mdi-minus-circle</template>
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="4"
      >
        <v-card
          color="amber"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                <b>Самый дешевый</b>
              </v-list-item-title>
              <v-list-item-subtitle>
                Стоимость: <b>{{ purchase.files.min_price.sum }} ₽</b>
              </v-list-item-subtitle>
              <v-list-item-subtitle>Срок поставки: <b>{{ purchase.files.min_price.date }}</b></v-list-item-subtitle>
              <v-list-item-subtitle>Кол-во поставщиков: <b>4</b></v-list-item-subtitle>
            </v-list-item-content>
            <v-icon
              large
              color="white"
            >
              mdi-percent-box
            </v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn
              :disabled="purchase.files.min_price.path === ''"
              :href="`${host}${purchase.files.min_price.path}`"
              target="_blank"
            >
              Скачать
              <v-icon
                right
              >
                mdi-download
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="4"
      >
        <v-card
          color="light-blue"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                <b>Самый быстрый</b>
              </v-list-item-title>
              <v-list-item-subtitle>
                Стоимость: <b>{{ purchase.files.min_date.sum }} ₽</b>
              </v-list-item-subtitle>
              <v-list-item-subtitle>Срок поставки: <b>{{ purchase.files.min_date.date }}</b></v-list-item-subtitle>
              <v-list-item-subtitle>Кол-во поставщиков: <b>4</b></v-list-item-subtitle>
            </v-list-item-content>
            <v-icon
              large
              color="white"
            >
              mdi-percent-box
            </v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn
              :disabled="purchase.files.min_date.path === ''"
              :href="`${host}${purchase.files.min_date.path}`"
              target="_blank"
            >
              Скачать
              <v-icon
                right
              >
                mdi-download
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  name: 'PurchaseView',

  components: {},

  computed: {
    ...mapGetters({
      purchase: 'purchase/purchase',
    }),

    vendors() {
      return this.purchase.items.map(item => ({
        title: item[0],
        active: item[1]
      }))
    },

    host() {
      return 'http://5.23.54.183:105'
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Название',
        align: 'start',
        sortable: true,
        value: 'title',
      },
      {
        text: 'Статус',
        align: 'center',
        sortable: true,
        value: 'active',
      },
    ],
    search: '',
  })
};
</script>
