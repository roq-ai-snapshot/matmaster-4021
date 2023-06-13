import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BeltProgressionInterface {
  id?: string;
  user_id: string;
  belt_color: string;
  promotion_date: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface BeltProgressionGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  belt_color?: string;
}
