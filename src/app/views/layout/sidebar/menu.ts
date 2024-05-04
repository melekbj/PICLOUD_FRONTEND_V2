import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true,
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
  },
  {
    label: 'Chat',
    icon: 'message-square',
    link: '/apps/chat',
  },
  {
    label: 'libary',
    icon: 'book-open',
    link: '/libary',
  },
];
