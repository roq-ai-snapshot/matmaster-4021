import { DojoInterface } from 'interfaces/dojo';
import { GetQueryInterface } from 'interfaces';

export interface MembershipPlanInterface {
  id?: string;
  name: string;
  price: number;
  duration: number;
  dojo_id: string;
  created_at?: any;
  updated_at?: any;

  dojo?: DojoInterface;
  _count?: {};
}

export interface MembershipPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  dojo_id?: string;
}
