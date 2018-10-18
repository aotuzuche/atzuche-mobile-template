/**
 * 高级组件-工具方法
 * 1. this.search拿到浏览器地址中的?a=1&b=2参数，以对象形式返回
 * 2. this.params拿到this.props.match.params对象
 *
 */

import qs from 'qs'
import { AS } from 'auto-libs'

const TOOL = Comp => {
  class TOOLComponent extends Comp {
    AS(data) {
      return AS(data)
    }

    get search() {
      return this.props.location
        ? qs.parse(this.props.location.search.replace(/^\?/, ''))
        : {}
    }

    get params() {
      return this.props.match ? this.props.match.params : {}
    }

    render() {
      return super.render(this.props, this.state)
    }
  }
  return TOOLComponent
}

export default TOOL
