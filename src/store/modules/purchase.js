/* eslint-disable */
import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  purchases: null,
  purchase: null,
}

// getters
export const getters = {
  purchases: state => state.purchases,
  purchase: state => state.purchase,
}

// mutations
export const mutations = {
  [types.FETCH_PURCHASES] (state, { purchases }) {
    state.purchases = purchases
  },

  [types.FETCH_PURCHASE] (state, { purchase }) {
    state.purchase = purchase
  },
}

// actions
export const actions = {
  async fetchPurchases ({ commit }, params) {
    try {
      const { data } = await axios.get('/main_page', {
        params: {
          field: 'date',
          order: 'desc',
          status: 'active',
          ...params
        }
      })

      commit(types.FETCH_PURCHASES, { purchases: data.data.items })
    } catch (e) { }
  },

  async fetchPurchase ({ commit }, params) {
    try {
      const { data } = await axios.get('/order_page', {
        params: params
      })
      commit(types.FETCH_PURCHASE, { purchase: data.data })
    } catch (e) { }
  },
}