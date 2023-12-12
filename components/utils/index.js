const formatTimestamp = (timestamp, format) => {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  format = format.replace('yyyy', year)
  format = format.replace('MM', month)
  format = format.replace('dd', day)
  format = format.replace('HH', hours)
  format = format.replace('mm', minutes)
  format = format.replace('ss', seconds)

  return format
}

const isTruthy = v => {
  if (Array.isArray(v)) return v.length !== 0
  return ![null ,undefined, ''].includes(v)
}

const isFalsy = v => !isTruthy(v)

module.exports = {
  formatTimestamp,
  isTruthy,
  isFalsy,
}
