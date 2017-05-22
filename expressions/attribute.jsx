import { h } from 'preact'
import { Component as ExprComponent } from '../expressions'

export default props => <span>
    {props.path.map((p, i) => <span>
        {i ? '.' : ''}{h(ExprComponent, p)}
    </span>)}
</span>
