import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: () => ({}),
})
