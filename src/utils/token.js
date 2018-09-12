import qs from 'qs'
import at from 'at-js-sdk'

const token = '_app_token_'
const openId = '_app_openId_'
const unionId = '_app_unionId_'
const virtualNo = '_app_virtualNo_'
const memNo = '_app_memNo_'

// token的操作方法
const getToken = e => localStorage.getItem(token)
const setToken = e => localStorage.setItem(token, e)
const clearToken = e => localStorage.removeItem(token)

// openId 操作方法
const getOpenId = e => localStorage.getItem(openId)
const setOpenId = e => localStorage.setItem(openId, e)
const clearOpenId = e => localStorage.removeItem(openId)

// unionId 操作方法
const getUnionId = e => localStorage.getItem(unionId)
const setUnionId = e => localStorage.setItem(unionId, e)
const clearUnionId = e => localStorage.removeItem(unionId)

// virtualNo 操作方法
const getVirtualNo = e => localStorage.getItem(virtualNo)
const setVirtualNo = e => localStorage.setItem(virtualNo, e)
const clearVirtualNo = e => localStorage.removeItem(virtualNo)

// memNo 操作方法
const getMemNo = e => localStorage.getItem(memNo)
const setMemNo = e => localStorage.setItem(memNo, e)
const clearMemNo = e => localStorage.removeItem(memNo)

/**
 * 初始化token
 * @returns {Promise<any>} resolve: 成功 reject: 失败
 */
const initToken = async e => {
  return new Promise((resolve, reject) => {
    if (window.isApp) {
      at.getToken({
        callback(res) {
          if (res.token && String(res.token).length > 20) {
            setToken(res.token)
            resolve()
          } else {
            clearToken()
            reject(new Error('token is empty'))
          }
        }
      })
    } else {
      const token = getToken()
      if (token && String(token).length > 20) {
        resolve()
      } else {
        clearToken()
        reject(new Error('token is empty'))
      }
    }
  })
}

/**
 * 跳转到登录页面
 * app: 打开原生登录模块
 * h5: 跳转到通用登录页面
 */
const toLogin = params => {
  if (window.isApp) {
    at.openLogin({
      success(res) {
        setToken(res.token)
        window.location.reload()
      },
      cancel() {
        clearToken()
        at.closeWindow()
      }
    })
  } else {
    clearToken()
    const search = {
      redirect: window.location.href
    }
    params && Object.assign(search, params)
    window.location.href = '/m/login/?' + qs.stringify(search)
  }
}

export {
  getToken,
  setToken,
  clearToken,
  initToken,
  toLogin,
  getOpenId,
  setOpenId,
  clearOpenId,
  getUnionId,
  setUnionId,
  clearUnionId,
  getVirtualNo,
  setVirtualNo,
  clearVirtualNo,
  getMemNo,
  setMemNo,
  clearMemNo
}
