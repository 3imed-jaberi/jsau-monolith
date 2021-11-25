export const __DEV__ = process.env.NODE_ENV === 'development'
export const __TEST__ = process.env.NODE_ENV === 'testing'
export const __PROD__ = (!__DEV__ && !__TEST__) || process.env.NODE_ENV === 'production'
