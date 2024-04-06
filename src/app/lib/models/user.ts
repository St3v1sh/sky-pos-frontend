import { User } from 'next-auth';

export type PrivilegeType = 'admin' | 'employee';

export interface POSUser extends User {
  first_name: string;
  last_name: string;
  privilege_type: PrivilegeType;
  id: string;
}
