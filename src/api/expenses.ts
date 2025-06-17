import axios from 'axios';

export const getSummary = (year: number, month: number) =>
    axios.get(`/expenses/summary?year=${year}&month=${month}`);

export const getDetails = (year: number, month: number, categoryId: number) =>
    axios.get(`/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`);

export const createExpense = (payload: any) =>
    axios.post('/expenses', payload);

export const deleteExpense = (id: number) =>
    axios.delete(`/expenses/${id}`);