import React from 'react';
import {DashboardConfig} from "./types.ts";
import {findComponent} from "./MenuItems.tsx";

interface DashboardContentProps extends Pick<DashboardConfig, 'menuItems'> {
    selectedItem: string;
}

const DashboardContent: React.FC<DashboardContentProps> = (
    {
        menuItems,
        selectedItem,
    }) => {
    const CurrentComponent = findComponent(menuItems, selectedItem) || (() => <div>No component found</div>);

    return (
        <div className='flex-1 overflow-auto transition-all duration-300'>
            <div className="min-h-full p-6">
                <CurrentComponent/>
            </div>
        </div>
    );
};

export default DashboardContent;