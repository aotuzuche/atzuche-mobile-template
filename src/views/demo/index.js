import './style'
import React from 'react'
import VIEW from 'src/hoc/view'
import TOOL from 'src/hoc/tool'
import Event from './event'

import { Button, Layout, Cell } from 'auto-ui'

console.log('Button', Button)

@VIEW
@TOOL
class View extends Event {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }

    console.log('test', this?.state?.a?.b)
    this.AS()
  }

  render() {
    const list = this.props.$$demo.list

    return (
      <Layout className={'view-demo'}>
        <Layout.Header title={'Redux'} onBackClick={this.goBack} />

        <Layout.Body>
          <div className={'buttons'}>
            <Button mini onClick={this.pop}>
              Pop
            </Button>
            <Button mini onClick={this.push}>
              Push
            </Button>
            <Button mini onClick={this.clear}>
              Clear
            </Button>
            <Button
              loading={this.state.loading}
              mini
              onClick={this.asyncPush}
            >
              Async Push
            </Button>
          </div>

          {list.length ? (
            <Cell>
              {list.map(res => (
                <Cell.Row key={res}>item: {res}</Cell.Row>
              ))}
            </Cell>
          ) : (
            <p>empty</p>
          )}
        </Layout.Body>
      </Layout>
    )
  }
}

export default View
