import React from "react";

export type UserType = "tutor" | "lecturer";

// Define a shape for each sidebar menu item
interface SidebarItem {
  label: string;
  icon: string;
  link: string;
}

// Props for the sidebar component
interface SidebarProps {
  userType: UserType;
}

// Define different menus depending on the user type
const TUTOR_MENU: SidebarItem[] = [
  { label: "Dashboard", icon: "/Images/home.png", link: "/tutors/dashboard" },
  { label: "Find Job", icon: "/Images/loupe.png", link: "/tutors/findJob" },
  { label: "My Application", icon: "/Images/profiles.png", link: "/tutors/myApplication" },
  { label: "My Profile", icon: "/Images/user.png", link: "/tutors/myProfile" }
]

const LECTURER_MENU: SidebarItem[] = [
  { label: "Dashboard", icon: "/Images/home.png", link: "/lecturer/dashboard" },
  { label: "My Selection", icon: "/Images/profiles.png", link: "/lecturer/mySelection" }
]

// A reusable item component for each sidebar entry
const SidebarItemComponent: React.FC<SidebarItem> = ({ label, icon, link }) => {
  return (
    <a 
      href={link}
      className="
          flex 
          items-center 
          gap-2 p-3 
          rounded-md 
          hover:bg-gray-100 
          transition-colors"
    >
      <img src={icon} alt={label} className="h-6 w-6" />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
};

// The main Sidebar component
const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  // Select the appropriate menu based on the user type
  const menuItems = userType === "tutor" ? TUTOR_MENU : LECTURER_MENU;

  return (
    <div className="bg-white shadow-md w-56 h-screen flex flex-col p-4 pt-8 items-center">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">
          Welcome, {userType === "tutor" ? "Tutor" : "Lecturer"}!
        </h2>
      </div>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <SidebarItemComponent
            key={item.label}
            label={item.label}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </nav>
    </div>
  );
}
export default Sidebar;