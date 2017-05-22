import { h } from "preact";
import { Component as ExprComponent } from '../expressions'

export default props => {
  return <div>
    {props.label} = value <b>{ h(ExprComponent, props.opts.expression) }</b>
  </div>
}
