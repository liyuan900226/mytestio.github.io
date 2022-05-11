module.exports = (source) => source.replace(/(?<=['"])(http.*.*)(?=['"])/g, '#/link?goto=$1')
// link就是和上述知乎类似的跳转前的中间页
