import DefaultImage from 'assets/images/DefaultImage.webp';
interface adminNavigate {
  key: string;
  path: string;
  icon: string;
}

export const ADMIN_NAVIGATE: adminNavigate[] = [
  { key: 'dashboard', path: '/my-company', icon: 'dashboard' },
  { key: 'users', path: '/users', icon: 'people' },
  { key: 'requests', path: '/requests', icon: 'card-list' },
  { key: 'logs', path: '/logs', icon: 'logs' },
];

interface IRoleInterface {
  id: number;
  text: string;
}

export const ROLE: IRoleInterface[] = [
  { id: 0, text: 'employeer' },
  { id: 1, text: 'admin' },
];

export const defaultImageUrl = DefaultImage;
