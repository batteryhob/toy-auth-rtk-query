import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import _URIS from './uri';

export const taxApi = createApi({
  reducerPath: 'taxApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getTax: builder.query({
      query: () => _URIS.GET_TAX,
    }),
    getTaxOffice: builder.query({
      query: () => _URIS.GET_TAX_OFFICE,
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTaxQuery, useGetTaxOfficeQuery } = taxApi