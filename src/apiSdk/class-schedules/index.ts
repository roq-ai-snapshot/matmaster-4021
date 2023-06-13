import axios from 'axios';
import queryString from 'query-string';
import { ClassScheduleInterface, ClassScheduleGetQueryInterface } from 'interfaces/class-schedule';
import { GetQueryInterface } from '../../interfaces';

export const getClassSchedules = async (query?: ClassScheduleGetQueryInterface) => {
  const response = await axios.get(`/api/class-schedules${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClassSchedule = async (classSchedule: ClassScheduleInterface) => {
  const response = await axios.post('/api/class-schedules', classSchedule);
  return response.data;
};

export const updateClassScheduleById = async (id: string, classSchedule: ClassScheduleInterface) => {
  const response = await axios.put(`/api/class-schedules/${id}`, classSchedule);
  return response.data;
};

export const getClassScheduleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/class-schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClassScheduleById = async (id: string) => {
  const response = await axios.delete(`/api/class-schedules/${id}`);
  return response.data;
};
