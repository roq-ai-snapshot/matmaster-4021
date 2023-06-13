import axios from 'axios';
import queryString from 'query-string';
import { TechniqueInterface, TechniqueGetQueryInterface } from 'interfaces/technique';
import { GetQueryInterface } from '../../interfaces';

export const getTechniques = async (query?: TechniqueGetQueryInterface) => {
  const response = await axios.get(`/api/techniques${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTechnique = async (technique: TechniqueInterface) => {
  const response = await axios.post('/api/techniques', technique);
  return response.data;
};

export const updateTechniqueById = async (id: string, technique: TechniqueInterface) => {
  const response = await axios.put(`/api/techniques/${id}`, technique);
  return response.data;
};

export const getTechniqueById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/techniques/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTechniqueById = async (id: string) => {
  const response = await axios.delete(`/api/techniques/${id}`);
  return response.data;
};
