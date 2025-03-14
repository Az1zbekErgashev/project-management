import DefaultImage from 'assets/images/DefaultImage.webp';
interface adminNavigate {
  key: string;
  path: string;
}

export const ADMIN_NAVIGATE: adminNavigate[] = [
  { key: 'mycompany', path: '/admin/my-company' },
  { key: 'users', path: '/admin/users' },
  { key: 'requests', path: '/admin/requests' },
];

interface IRoleInterface {
  id: number;
  text: string;
}

export const ROLE: IRoleInterface[] = [
  { id: 0, text: 'employeer' },
  { id: 1, text: 'super_admin' },
];

export const defaultImageUrl = DefaultImage;
