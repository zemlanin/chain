import { h, render } from "preact";
import EXPRESSIONS from './expressions'

let queue = []
let eventsHistory = []
let cursor = 0

const LINKS = {
  start_on: {
    type: 'start_on',
    opts: {
      event: EXPRESSIONS.string.type,
      identifier: EXPRESSIONS.string.type
    }
  },
  wait: {
    type: 'wait',
    opts: {
      seconds: 'number'
    }
  },
  send: {
    type: 'send',
    opts: {
      service: EXPRESSIONS.string.type,
      token: EXPRESSIONS.string.type
    }
  },
  value: {
    type: 'value',
    opts: {
      path: 'expression'
    }
  },
  kill_on: {
    type: 'kill_on',
    opts: {
      event: 'string',
      condition: 'bool_expression'
    }
  },
  if: {
    type: 'if',
    opts: {
      condition: 'bool_expression',
      then: 'link',
      else: 'link'
    }
  },
  nothing: {
    type: 'nothing',
    opts: {}
  },
  jump: {
    type: 'jump',
    opts: {
      destination: EXPRESSIONS.link_reference.type
    }
  }
}

const chainState = [
  {
    label: 'edit',
    type: LINKS.start_on.type,
    opts: {
      event: 'edit',
      identifier: '.cart_id'
    }
  },
  {
    label: 'cart_id',
    type: LINKS.value.type,
    opts: {
      expression: {
        type: EXPRESSIONS.attribute.type,
        opts: {
          path: [
            {
              type: EXPRESSIONS.link_reference.type,
              opts: {
                label: 'edit'
              }
            },
            {
              type: EXPRESSIONS.string.type,
              opts: {
                value: 'cart_id'
              }
            }
          ]
        }
      }
    }
  },
  {
    label: 's',
    type: LINKS.wait.type,
    opts: {
      seconds: 2
    }
  },
  {
    type: LINKS.send.type,
    opts: {}
  },
]

const DefaultLink = props => [
  props.label ? `${props.label} = ` : '',
  props.type,
  JSON.stringify(props.opts),
].join('')

const LinkComponents = {
  start_on: require('./links/start_on.jsx').default,
  value: require('./links/value.jsx').default,
}

const Chain = props => {
  return <ul>
    {chainState.map((s, i) =>
      <li>
        { h(LinkComponents[s.type] || DefaultLink, s) }
      </li>
    )}
    <button>+</button>
  </ul>
}

const App = props => (
  <div>
    <h1>Chain</h1>
    <Chain />
  </div>
);

let appNode = render(<App />, document.body);
