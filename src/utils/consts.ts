import DefaultImage from 'assets/images/DefaultImage.webp';
interface adminNavigate {
  key: string;
  path: string;
}

export const ADMIN_NAVIGATE: adminNavigate[] = [
  { key: 'mycompany', path: '/admin/my-company' },
  { key: 'users', path: '/admin/users' },
  { key: 'partners', path: '/admin/partners' },
];

interface IRoleInterface {
  id: number;
  text: string;
}

export const ROLE: IRoleInterface[] = [
  { id: 0, text: 'team_lead' },
  { id: 1, text: 'developer' },
  { id: 2, text: 'qaengineer' },
  { id: 3, text: 'viewer' },
  { id: 4, text: 'super_admin' },
];

export const defaultImageUrl = DefaultImage;
