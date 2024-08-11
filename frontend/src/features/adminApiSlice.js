import { apiSlice } from "./apiSlice";
const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST'
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/users`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                    url: `${ADMIN_URL}/users/${data.id}`,
                    method: 'PUT',
                    body: data  
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        })
    })
});

export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = adminApiSlice;