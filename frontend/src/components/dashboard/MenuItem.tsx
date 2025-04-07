import React, {useState} from 'react';
import {MenuItem as MenuItemType} from './types';

interface MenuItemProps {
    item: MenuItemType;
    selectedItem: string;
    setSelectedItem: (id: string) => void;
    isCollapsed: boolean;
    selectedParents: string[];
    level: number;
}

const MenuItem: React.FC<MenuItemProps> = (
    {
        item,
        selectedItem,
        setSelectedItem,
        isCollapsed,
        selectedParents,
        level,
    }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hasChildren = !!item.children?.length;
    const isSelected = selectedItem === item.id;
    const isParentSelected = selectedParents.includes(item.id);

    const handleClick = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else {
            setSelectedItem(item.id);
        }
    };

    // Highlight logic - when collapsed, highlight parent if any child is selected
    const shouldHighlight = isCollapsed ? isParentSelected : isSelected;

    return (
        <div className={`${level > 0 ? 'pl-4' : ''}`}>
            <div
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    shouldHighlight && !hasChildren
                        ? 'bg-blue-500/10 text-blue-600'
                        : 'hover:bg-gray-100/50 text-gray-700 hover:text-gray-900'
                }`}
                onClick={handleClick}
            >
        <span className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
            shouldHighlight ? 'text-blue-500' : 'text-gray-500'
        }`}>
          {item.icon}
        </span>
                {!isCollapsed && (
                    <>
                        <span className="flex-grow">{item.title}</span>
                        {hasChildren && (
                            <span className={`ml-2 transform transition-transform duration-300 ${
                                isOpen ? 'rotate-90' : ''
                            }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"/>
                </svg>
              </span>
                        )}
                    </>
                )}
            </div>
            {hasChildren && !isCollapsed && isOpen && (
                <div className="mt-1 transition-all duration-300 ease-in-out">
                    {item.children?.map((child) => (
                        <MenuItem
                            key={child.id}
                            item={child}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            isCollapsed={isCollapsed}
                            selectedParents={selectedParents}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItem;