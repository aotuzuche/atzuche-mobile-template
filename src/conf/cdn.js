const cdn =
  process.env.PACKAGE === 'production'
    ? 'https://carphoto.aotuzuche.com/'
    : 'https://at-images-test.oss-cn-hangzhou.aliyuncs.com/'

export default cdn
