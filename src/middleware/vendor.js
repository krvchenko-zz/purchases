/* eslint-disable */
import store from '../store'
export default async ({ next, to }) => {
  await store.dispatch('purchase/fetchPurchases')
  return next()
}