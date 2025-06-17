import axios from 'axios';

export const getSummary = (year: number, month: number) =>
    axios.get(`http://198.211.105.95:8080/expenses/summary?year=${year}&month=${month}`);

export const getDetails = (year: number, month: number, categoryId: number) =>
    axios.get(`http://198.211.105.95:8080/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`);

export const createExpense = (payload: any) =>
    axios.post('http://198.211.105.95:8080/expenses', payload);

export const deleteExpense = (id: number) =>
    axios.delete(`http://198.211.105.95:8080/expenses/${id}`);