import qs from 'qs'

const AS = async data => {
  let params = []
  if (typeof data.eventContent === 'object') {
    Object.entries(data.eventContent).forEach(([key, value]) => {
      params.push(`${key}=${value}`)
    })
  }

  const eventContent = `{${params.join(',')}}`

  // 防止 GC 掉用变量存储
  const random = 'img_' + Math.random()
  const img = new Image()
  window[random] = img
  img.onload = img.onerror = () => {
    window[random] = null
  }

  const currentOrigin = window.location.origin
  // 可以利用 qs 来格式化参数
  img.src =
    currentOrigin +
    '/log.gif?' +
    qs.stringify({
      pageNo: data.pageNo,
      eventNo: data.eventNo,
      eventContent
    })
}

export default AS
