import {createStore} from 'vuex'
import modulecart from '../store/cart.js'
import moduleUser from '../store/user.js'
export default createStore({ 
  modules:{
    'm_cart':modulecart,
    'm_user':moduleUser,
  }
})
