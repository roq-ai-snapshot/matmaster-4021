import { AttendanceInterface } from 'interfaces/attendance';
import { DojoInterface } from 'interfaces/dojo';
import { GetQueryInterface } from 'interfaces';

export interface ClassScheduleInterface {
  id?: string;
  start_time: any;
  end_time: any;
  dojo_id: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  dojo?: DojoInterface;
  _count?: {
    attendance?: number;
  };
}

export interface ClassScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  dojo_id?: string;
}
