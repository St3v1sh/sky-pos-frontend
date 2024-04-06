import { User } from 'next-auth';

export interface POSUser extends User {
  first_name: string;
  last_name: string;
  privilege_type: string;
  id: string;
}
