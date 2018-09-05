import http from 'src/utils/http'
import wx from 'weixin-js-sdk'

async function WXShare(config = {}) {
  if (!window.isWX) {
    return
  }

  try {
    // 获取微信 sdk 初始化参数
    const res = await _getTicket()
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      signature: res.signature,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    })

    wx.ready(() => {
      const currentOrigin = window.location.origin
      const protocol = window.location.protocol
      let shareLink =
        `${currentOrigin}/weixinauth/authorize?type=base&redirectUri=` +
        encodeURIComponent(config.url || `${currentOrigin}/m/index`)
      const shareImg =
        config.sharePicUrl ||
        `${protocol}//carphoto.aotuzuche.com/web/auto/assets/imgs/logo.png`

      const result = {
        title: config.shareTitle || '凹凸租车', // 分享标题
        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImg // 分享图标
      }

      // 分享给朋友
      wx.onMenuShareAppMessage(
        Object.assign(result, { desc: config.text || '凹凸租车' })
      )

      // 分享到朋友圈
      wx.onMenuShareTimeline(result)
    })

    wx.error(res => {
      console.log('wx-error', res)
    })
  } catch (e) {
    console.log('wx-share:error', e)
  }
}

async function _getTicket() {
  const _url = encodeURIComponent(window.location.href.split('#')[0])

  const result = await http.request({
    method: 'get',
    url: `/wechatgw/jsapi/ticket?url=${_url}`
  })

  return result
}

export { WXShare }
