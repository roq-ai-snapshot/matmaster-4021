import axios from 'axios';
import queryString from 'query-string';
import { DojoInterface, DojoGetQueryInterface } from 'interfaces/dojo';
import { GetQueryInterface } from '../../interfaces';

export const getDojos = async (query?: DojoGetQueryInterface) => {
  const response = await axios.get(`/api/dojos${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDojo = async (dojo: DojoInterface) => {
  const response = await axios.post('/api/dojos', dojo);
  return response.data;
};

export const updateDojoById = async (id: string, dojo: DojoInterface) => {
  const response = await axios.put(`/api/dojos/${id}`, dojo);
  return response.data;
};

export const getDojoById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dojos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDojoById = async (id: string) => {
  const response = await axios.delete(`/api/dojos/${id}`);
  return response.data;
};
