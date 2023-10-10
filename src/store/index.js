import { createStore, createLogger } from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import auth from './modules/auth'
import message from './modules/message'
import discussion_status from './modules/discussion_status'
import discussion from './modules/discussions'


const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    cart,
    products,
    auth,
    message,
    discussion_status,
    discussion
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
