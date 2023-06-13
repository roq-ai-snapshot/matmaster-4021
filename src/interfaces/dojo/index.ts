import { ClassScheduleInterface } from 'interfaces/class-schedule';
import { MembershipPlanInterface } from 'interfaces/membership-plan';
import { TechniqueInterface } from 'interfaces/technique';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DojoInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  class_schedule?: ClassScheduleInterface[];
  membership_plan?: MembershipPlanInterface[];
  technique?: TechniqueInterface[];
  user?: UserInterface;
  _count?: {
    class_schedule?: number;
    membership_plan?: number;
    technique?: number;
  };
}

export interface DojoGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  tenant_id?: string;
}
