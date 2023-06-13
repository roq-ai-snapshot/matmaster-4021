import axios from 'axios';
import queryString from 'query-string';
import { BeltProgressionInterface, BeltProgressionGetQueryInterface } from 'interfaces/belt-progression';
import { GetQueryInterface } from '../../interfaces';

export const getBeltProgressions = async (query?: BeltProgressionGetQueryInterface) => {
  const response = await axios.get(`/api/belt-progressions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBeltProgression = async (beltProgression: BeltProgressionInterface) => {
  const response = await axios.post('/api/belt-progressions', beltProgression);
  return response.data;
};

export const updateBeltProgressionById = async (id: string, beltProgression: BeltProgressionInterface) => {
  const response = await axios.put(`/api/belt-progressions/${id}`, beltProgression);
  return response.data;
};

export const getBeltProgressionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/belt-progressions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBeltProgressionById = async (id: string) => {
  const response = await axios.delete(`/api/belt-progressions/${id}`);
  return response.data;
};
