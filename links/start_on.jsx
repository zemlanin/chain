import { h } from "preact";

export default props => {
  return <div>
    {props.label} = start on <b>{props.opts.event}</b>
    {props.opts.identifier
      ? <div style={{marginLeft: '3em'}}>identifier: <b>{props.opts.identifier}</b></div>
      : null}
  </div>
}
