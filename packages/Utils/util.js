export const isBool = (val) => typeof val === 'boolean'
export const isNumber = (val) => typeof val === 'number'
export const isHTMLElement = (val) => toRawType(val).startsWith('HTML')