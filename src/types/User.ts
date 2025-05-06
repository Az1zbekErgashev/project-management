export interface User {
  Id: number;
  Role: string;
  Email: string;
  Image: { path: string } | null;
  Name: string;
  Surname: string;
  PhoneNumber: string;
}
