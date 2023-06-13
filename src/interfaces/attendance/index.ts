import { ClassScheduleInterface } from 'interfaces/class-schedule';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AttendanceInterface {
  id?: string;
  class_schedule_id: string;
  user_id: string;
  attended: boolean;
  created_at?: any;
  updated_at?: any;

  class_schedule?: ClassScheduleInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AttendanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  class_schedule_id?: string;
  user_id?: string;
}
