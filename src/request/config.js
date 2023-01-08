const dev = ''
const prod = ''

export const baseURL = process.env.NODE_ENV === 'development' ? dev : prod
