import DefaultImage from 'assets/images/DefaultImage.webp';
interface adminNavigate {
  key: string;
  path: string;
  icon: string;
}

export const ADMIN_NAVIGATE: adminNavigate[] = [
  { key: 'dashboard', path: '/', icon: 'dashboard' },
  { key: 'users', path: '/users', icon: 'people' },
  { key: 'requests', path: '/requests', icon: 'card-list' },
  { key: 'logs', path: '/logs', icon: 'logs' },
  { key: 'translations', path: '/translations', icon: 'translations' },
];

interface IRoleInterface {
  id: number;
  text: string;
}

export const ROLE: IRoleInterface[] = [
  { id: 0, text: 'employeer' },
  { id: 1, text: 'admin' },
];

export const actions = [
  { id: 0, text: 'login' },
  { id: 1, text: 'create_account' },
  { id: 2, text: 'change_localiza_data' },
  { id: 3, text: 'update_user_information' },
  { id: 4, text: 'upload_excel' },
  { id: 5, text: 'download_excel' },
  { id: 6, text: 'create_request' },
];

export const defaultImageUrl = DefaultImage;
