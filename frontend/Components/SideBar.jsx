import { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react";

const SideBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/");

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/",
      route: "dashboard",
    },
    {
      icon: Calendar,
      label: "Calendar",
      path: "/calendar",
      route: "calendar",
    },
    {
      icon: FileText,
      label: "Create Invoice",
      path: "/create-invoice",
      route: "create-invoice",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/reports",
      route: "reports",
    },
    {
      icon: Users,
      label: "Clients",
      path: "/clients",
      route: "clients",
    },
  ];

  const settingsRoute = {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    route: "settings",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path, route) => {
    setCurrentRoute(path);
    setIsMobileMenuOpen(false);
    // Here you would typically use React Router's navigate function
    // navigate(path);
    console.log(`Navigating to: ${path} (${route})`);
  };

  const isActive = (path) => {
    return currentRoute === path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between lg:justify-start">
          <button
            onClick={() => handleNavigation("/", "dashboard")}
            className="flex items-center"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded transform rotate-45"></div>
            </div>
          </button>
          {/* Mobile close button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.path, item.route)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                      active
                        ? "bg-purple-50 text-purple-700 border-r-2 border-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() =>
              handleNavigation(settingsRoute.path, settingsRoute.route)
            }
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
              isActive(settingsRoute.path)
                ? "bg-purple-50 text-purple-700 border-r-2 border-purple-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="truncate">{settingsRoute.label}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button and Search */}
            <div className="flex items-center flex-1">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 mr-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Aravind"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Aravind
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="w-full h-full min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Current Route: {currentRoute}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Add your page components here based on the current route
              </p>
              <div className="mt-4 text-xs text-gray-400">
                Available routes:
                <br />
                / (Dashboard)
                <br />
                /calendar
                <br />
                /create-invoice
                <br />
                /reports
                <br />
                /clients
                <br />
                /settings
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SideBar;
