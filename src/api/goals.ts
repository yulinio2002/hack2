import axios from 'axios';

export const getGoals = () => axios.get('/goals');

export const createGoal = (data: any) => axios.post('/goals', data);

export const updateGoal = (id: number, data: any) =>
    axios.patch(`/goals/${id}`, data);