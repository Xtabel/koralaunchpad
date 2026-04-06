export interface drawerwidthProps {
  drawerwidth: number;
}

export interface NavbarProps extends drawerwidthProps {
    open: boolean;
    handleDrawerOpen?: () => void;
}

export interface SidebarProps extends NavbarProps{
    handleDrawerClose?: () => void;
}

export interface IconProps {
    default: React.ComponentType;
    active: React.ComponentType;
}

export interface MenuItemProps {
    item: MenuItem;
    active: (path: string) => boolean;
  }
  
export interface MenuItem {
  title: string;
  path: string;
  icon?: {
    default: React.ComponentType<{ sx?: object }>;
    active: React.ComponentType<{ sx?: object }>;
  };
    requiresRegistration?:boolean, 
  requiresApproval?:boolean,
  info?: React.ReactNode;
  roles?: string[];
  permissionIds?: number[]; // New: for permission-based access control
  children?: Array<{
    title: string;
    path: string;
    roles?: string[];
    permissionId?: number; // New: for individual child permission
  }>;
}

export type MenuConfig = {
  main: MenuItem[];
  management: MenuItem[];
};
export interface MenuItemProps {
  item: MenuItem;
  active: (path: string) => boolean;
}

export interface MenuSectionProps {
    menuConfig: MenuConfig;
    drawerwidth: number;
    onItemClick?: () => void; 
  }
  