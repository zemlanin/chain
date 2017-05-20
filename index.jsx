import { h, render } from "preact";

let queue = []
let eventsHistory = []
let cursor = 0

function progress(position) {
  if (position === void 0) {
    if (cursor + 1 < chainState.length) {
      position = cursor + 1
    }
  }

  if (position !== void 0) {
    cursor = position
    const link = chainState[cursor]

    if (LINKS[link.type].action) {
      LINKS[link.type].action(link.opts)
    }

    if (LINKS[link.type].listen) {
      const listens = LINKS[link.type].listen(link.opts)

      if (listens && listens.event) {
        queue.push({event: listens.event})
      }

      if (listens && listens.deadline) {
        queue.push({deadline: listens.deadline})
      }
    }
  }
}

setTimeout(function cleanQueue() {
  for (const e of queue) {
    if (e.deadline !== void 0) {
      if (e.deadline < (new Date / 1000)) {
        progress()

        e.done = true
      }
    }

    if (e.event !== void 0) {
      const link = chainState[cursor]
      if (LINKS[link.type].listen) {
        const listens = LINKS[link.type].listen(link.opts)

        if (listens && listens.event === e.event) {
          progress()

          e.done = true
        }
      } else {
        e.done = true
      }
    }
  }

  queue = queue.filter(e => !e.done)

  appNode = render(<App />, document.body, appNode)
  setTimeout(cleanQueue, 1000)
}, 1000)

const LINKS = {
  on: {
    type: 'on',
    opts: {
      event: 'string'
    },
    action: opts => {

    },
    listen: opts => {
      return {event: opts.event}
    }
  },
  wait: {
    type: 'wait',
    opts: {
      seconds: 'number'
    },
    action: opts => {

    },
    listen: opts => {
      return {deadline: (new Date / 1000) + opts.seconds}
    }
  },
  push: {
    type: 'push',
    opts: {
      service: 'string',
      token: 'string'
    },
    action: opts => {
      console.log('push', opts)
    },
    // listen: opts => {
    //   delay(opts.seconds)
    // }
  }
}

const chainState = [
  {
    type: LINKS.on.type,
    opts: {event: 'start'}
  },
  {
    type: LINKS.wait.type,
    opts: {seconds: 2}
  },
  {
    type: LINKS.push.type,
    opts: {}
  },
]

const Actions = props => <div>
  <button onClick={() => queue.push({event: 'start'})}>
    trigger <b>on</b>
  </button>
</div>

const Chain = props => {
  return <ul>
    {chainState.map((s, i) =>
      <li style={{textDecoration: i === cursor ? 'underline' : null }}>
        {s.type}
        {JSON.stringify(s.opts)}
      </li>
    )}
  </ul>
}

const Instances = props => {
  return null
}

const App = props => (
  <div>
    <h1>Chain</h1>
    <div>queue: {queue.length}</div>
    <Actions />
    <Chain />
    <Instances />
  </div>
);

let appNode = render(<App />, document.body);
