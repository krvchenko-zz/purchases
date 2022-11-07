<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mb-4">
        <form @submit.prevent="submit"></form>
      </v-col>
      <v-col cols="12">
        <v-row dense>
          <v-col v-for="(item, index) in purchases" :key="index" cols="4">
            <v-card color="#385F73" dark>
              <v-card-title class="text-h5">{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ item.date }}</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  :to="{
                    name: 'purchase',
                    params: {
                      name: item.name,
                    },
                  }"
                  text
                >
                  Подробнее
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',

  computed: {
    ...mapGetters({
      purchases: 'purchase/purchases',
    }),
  },
  data: () => ({

  }),
};
</script>
