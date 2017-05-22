import { h } from 'preact'

const EXPRESSIONS = {
  attribute: {
    type: 'attribute',
    component: require('./attribute.jsx').default,
  },
  link_reference: {
    type: 'link_reference',
    component: require('./link_reference.jsx').default,
  },
  string: {
    type: 'string',
    component: require('./string.jsx').default,
  }
}

export default EXPRESSIONS
export const Component = (props) => {
  return h(EXPRESSIONS[props.type].component, props.opts)
}
