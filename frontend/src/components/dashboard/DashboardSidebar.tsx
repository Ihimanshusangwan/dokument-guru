import React from 'react'
import MenuItems from "./MenuItems.tsx";
import {DashboardConfig} from "./types.ts";
import {useAuth} from "../../hooks/useAuth.ts";

interface DashboardSidebarProps extends Pick<DashboardConfig, 'menuItems'> {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    selectedItem: string;
    setSelectedItem: (id: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = (
    {
        menuItems,
        isCollapsed,
        setIsCollapsed,
        selectedItem,
        setSelectedItem,
    }) => {
    const {user} = useAuth();
    const userName = user?.name || 'User';
    return (
        <div
            className={`bg-white/90 backdrop-blur-sm shadow-lg z-10 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-64'
            } relative`}
        >
            <div className="p-4 flex items-center justify-between border-b border-gray-200/50">
                {!isCollapsed ? (
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{userName}</span>
                    </div>
                ) : (
                    <div
                        className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mx-auto flex items-center justify-center text-white font-semibold">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-gray-200/50 transition-colors duration-200 text-gray-500 hover:text-gray-700"
                    aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
                >
                    {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                    )}
                </button>
            </div>
            <div className="overflow-y-auto h-[calc(100%-72px)] p-3">
                <MenuItems
                    items={menuItems}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    isCollapsed={isCollapsed}
                />
            </div>
        </div>
    );
};

export default DashboardSidebar;