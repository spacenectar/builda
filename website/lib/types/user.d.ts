import { Roles } from './roles';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
  role: Roles;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}
