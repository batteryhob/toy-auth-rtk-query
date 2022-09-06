import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import _URIS from './uri';

export const  easysignApi = createApi({
  reducerPath: 'easysignApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getServerTime: builder.query({
      query: () => _URIS.GET_SERVERTIME,
    }),
    getGuide: builder.query({
      query: () => _URIS.GET_GUIDE,
    }),
    getExpireTime: builder.mutation({
      query: () => ({
        url: _URIS.POST_AUTH,
        method: 'POST',
        body: {}
      })
    }),
    setComplete: builder.mutation({
      query: ({
        name,
        phoneNumber,
        regNumber 
      }) => ({
        url: _URIS.POST_AUTH_COMPLETE,
        method: 'POST',
        body: {
          name,
          phoneNumber,
          regNumber
        }
      })
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetServerTimeQuery, useGetGuideQuery, useGetExpireTimeMutation, useSetCompleteMutation } = easysignApi