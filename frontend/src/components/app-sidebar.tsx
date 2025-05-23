import * as React from "react";
import { BookOpen, Bot, User, Settings2, File } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Blogs",
      url: "#",
      icon: File,
      isActive: true,
      items: [
        {
          title: "Blogs List",
          url: "#",
        },
        {
          title: "Add Blog",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Users List",
          url: "#",
        },
        {
          title: "Add User",
          url: "#",
        },
      ],
    },
    {
      title: "LLMs",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Models",
          url: "#",
        },
        {
          title: "MCP List",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
