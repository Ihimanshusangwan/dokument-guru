import {ComponentType} from 'react';

export type MenuItem = {
    id: string;
    title: string;
    icon: React.ReactNode;
    children?: MenuItem[];
    component?: ComponentType;
};

export type DashboardConfig = {
    menuItems: MenuItem[];
    defaultSelectedItem?: string;
};