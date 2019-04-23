import { PureComponent } from 'react'
import { Toast } from 'auto-ui'

export default class Event extends PureComponent {
  goBack = () => {
    this.props.history.goBack()
  }

  pop = () => {
    this.props.$demo.pop()
  }

  push = () => {
    this.props.$demo.push()
  }

  clear = () => {
    this.props.$demo.clear()
  }

  asyncPush = async () => {
    try {
      this.setState({
        loading: true
      })

      await this.props.$demo.asyncPush()
    } catch (e) {
      Toast(e.message)
    } finally {
      this.setState({
        loading: false
      })
    }
  }
}
