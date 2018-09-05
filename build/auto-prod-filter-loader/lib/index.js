module.exports = function (source) {
  if (process.env.PACKAGE === 'test') {
    return source
  } else {
    const match = /\/\/\s*?>>>(\s|.)*?\/\/\s*?<<</g
    return source.replace(match, '')
  }
}
