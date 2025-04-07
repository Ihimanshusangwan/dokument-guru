import React, {useState} from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import {DashboardConfig} from "./types.ts";

const Dashboard: React.FC<DashboardConfig> = ({menuItems, defaultSelectedItem}) => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultSelectedItem || '');

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <DashboardSidebar
                menuItems={menuItems}
                isCollapsed={isMenuCollapsed}
                setIsCollapsed={setIsMenuCollapsed}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <DashboardContent
                menuItems={menuItems}
                selectedItem={selectedItem}
            />
        </div>
    );
};

export default Dashboard;