import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'

const validatePlugin = plugin => {
  // plugin name 
  invariant(!isEmpty(plugin.name), 'Plugin name not defined')

  // TODO: more validations
}

export default validatePlugin
