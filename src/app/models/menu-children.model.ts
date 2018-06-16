import { MenuItem } from './menu-item.model';

export interface MenuChildren {
    name: string;
    slug: string;
    mega_menu: MenuItem[];
}
