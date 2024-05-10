import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Create base query for the original base URL
const baseQuery = fetchBaseQuery({
    baseUrl: `https://ctm-sercer.vercel.app/api/v1/`,
});

export const api = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: [
        "addContact",
        "updateContact",
        "deleteContact",
        "getAllContacts",
        "getContact"
    ],

    endpoints: (builder) => ({
        // Contacts

        getAllContacts: builder.query({
            query: ({
                page,
                limit,
            }) =>
                `/contacts?page=${page}&limit=${limit}`,
            providesTags: ["getAllContacts"],
        }),
        getSingleContact: builder.query({
            query: (id) => `/contacts/${id}`,
            providesTags: ["getContact"],
        }),

        addContact: builder.mutation({
            query: ({ data }) => ({
                url: "/contacts/create-contact",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["addContact"],
        }),
        updateContact: builder.mutation({
            query: ({ id, data }) => ({
                url: `/contacts/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["updateContact"],
        }),
        deleteContact: builder.mutation({
            query: ({ _id }) => ({
                url: `/contacts/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["deleteContact"],
        }),

    }),
});

export const {
    useGetAllContactsQuery,
    useGetSingleContactQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = api;
