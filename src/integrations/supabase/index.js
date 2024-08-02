import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### documents

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |
| title      | text                     | string | false    |
| content    | text                     | string | false    |

### items

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |
| name       | text                     | string | false    |
| size       | int8                     | number | false    |
| price      | real                     | number | false    |

*/

// Documents hooks
export const useDocuments = () => useQuery({
    queryKey: ['documents'],
    queryFn: () => fromSupabase(supabase.from('documents').select('*')),
});

export const useDocument = (id) => useQuery({
    queryKey: ['documents', id],
    queryFn: () => fromSupabase(supabase.from('documents').select('*').eq('id', id).single()),
});

export const useAddDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDocument) => fromSupabase(supabase.from('documents').insert([newDocument])),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

export const useUpdateDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('documents').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('documents').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

// Items hooks
export const useItems = () => useQuery({
    queryKey: ['items'],
    queryFn: () => fromSupabase(supabase.from('items').select('*')),
});

export const useItem = (id) => useQuery({
    queryKey: ['items', id],
    queryFn: () => fromSupabase(supabase.from('items').select('*').eq('id', id).single()),
});

export const useAddItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('items').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        },
    });
};

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('items').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('items').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        },
    });
};