/* eslint-disable */
import store from '../store'
export default async ({ next, to }) => {
  await store.dispatch('purchase/fetchPurchase', {
    order_name: to.params.name
  })
  return next()
}