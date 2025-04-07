import {CogIcon, CreateIcon, DocumentIcon, HomeIcon} from "../icons/Icons.tsx";
import Dashboard from "./Dashboard.tsx";
import ServiceFormBuilder from "../form/builder/ServiceFormBuilder.tsx";
import TestComponent from "../common/TestComponent.tsx";

const AdminDashboard = () => {
    const menuItems = [
        {
            id: 'home',
            title: 'Home',
            icon: <HomeIcon/>,
            component: TestComponent,
        },
        {
            id: 'settings',
            title: 'Settings',
            icon: <CogIcon/>,
            component: TestComponent,
        },
        {
            id: 'Create',
            title: 'Create',
            icon: <CreateIcon/>,
            children: [
                {
                    id: 'CreateService',
                    title: 'Create Service',
                    icon: <DocumentIcon/>,
                    component: ServiceFormBuilder,
                },
            ]
        }
    ];

    return (
        <Dashboard
            menuItems={menuItems}
            defaultSelectedItem="home"
        />
    );
};

export default AdminDashboard;