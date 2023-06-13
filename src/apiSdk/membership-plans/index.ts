import axios from 'axios';
import queryString from 'query-string';
import { MembershipPlanInterface, MembershipPlanGetQueryInterface } from 'interfaces/membership-plan';
import { GetQueryInterface } from '../../interfaces';

export const getMembershipPlans = async (query?: MembershipPlanGetQueryInterface) => {
  const response = await axios.get(`/api/membership-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMembershipPlan = async (membershipPlan: MembershipPlanInterface) => {
  const response = await axios.post('/api/membership-plans', membershipPlan);
  return response.data;
};

export const updateMembershipPlanById = async (id: string, membershipPlan: MembershipPlanInterface) => {
  const response = await axios.put(`/api/membership-plans/${id}`, membershipPlan);
  return response.data;
};

export const getMembershipPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/membership-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMembershipPlanById = async (id: string) => {
  const response = await axios.delete(`/api/membership-plans/${id}`);
  return response.data;
};
