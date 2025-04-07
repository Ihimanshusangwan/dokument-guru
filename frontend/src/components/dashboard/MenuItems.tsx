import React from 'react';
import MenuItem from './MenuItem';
import {MenuItem as MenuItemType} from './types';

interface MenuItemsProps {
    items: MenuItemType[];
    selectedItem: string;
    setSelectedItem: (id: string) => void;
    isCollapsed: boolean;
}

export const findComponent = (items: MenuItemType[], id: string): React.ComponentType | null => {
    for (const item of items) {
        if (item.id === id && item.component) return item.component;
        if (item.children) {
            const childComponent = findComponent(item.children, id);
            if (childComponent) return childComponent;
        }
    }
    return null;
};

export const findItemParents = (items: MenuItemType[], targetId: string, parents: string[] = []): string[] => {
    for (const item of items) {
        if (item.id === targetId) {
            return [...parents, item.id];
        }
        if (item.children) {
            const found = findItemParents(item.children, targetId, [...parents, item.id]);
            if (found.length > 0) return found;
        }
    }
    return [];
};

const MenuItems: React.FC<MenuItemsProps> = (
    {
        items,
        selectedItem,
        setSelectedItem,
        isCollapsed,
    }) => {
    const selectedParents = findItemParents(items, selectedItem);

    return (
        <>
            {items.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    isCollapsed={isCollapsed}
                    selectedParents={selectedParents}
                    level={0}
                />
            ))}
        </>
    );
};

export default MenuItems;