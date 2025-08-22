export type UserRecord = {
  id: string;
  identifier: string;
  email: string;
  firstName?: string;
  lastName?: string;
  // password fields (never expose)
  passwordHash: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  // additional signup fields are allowed
  [key: string]: any;
};

export type PublicUser = Omit<UserRecord, 'passwordHash'>;

