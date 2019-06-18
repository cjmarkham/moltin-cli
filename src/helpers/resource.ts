const isResource = <T>(obj: T): boolean => {
  return obj.hasOwnProperty('id') || (Array.isArray(obj) && obj.length > 0 && obj[0].hasOwnProperty('id'))
}

export {
  isResource,
}
