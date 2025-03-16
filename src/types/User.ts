export interface User {
  Id: number;
  Role: number;
  Email: string;
  Image: { path: string } | null;
  Name: string;
  Surname: string;
  PhoneNumber: string;
}
