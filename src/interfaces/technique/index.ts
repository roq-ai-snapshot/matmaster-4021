import { DojoInterface } from 'interfaces/dojo';
import { GetQueryInterface } from 'interfaces';

export interface TechniqueInterface {
  id?: string;
  name: string;
  description?: string;
  video_url?: string;
  dojo_id: string;
  created_at?: any;
  updated_at?: any;

  dojo?: DojoInterface;
  _count?: {};
}

export interface TechniqueGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  video_url?: string;
  dojo_id?: string;
}
