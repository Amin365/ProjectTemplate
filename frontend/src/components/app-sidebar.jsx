import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api/apislice";
import { getVisibleNavItems } from "@/lib/desktopModules";

export function AppSidebar({ compact = false, ...props }) {
  const { user, token } = useSelector((state) => state.auth);

  const { data: profileData } = useQuery({
    queryKey: ["sidebar-profile", token],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    enabled: !!token,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const currentUser = profileData?.user || user;
  const filteredNav = React.useMemo(() => getVisibleNavItems(currentUser), [currentUser]);

  if (!token) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={filteredNav} iconOnly={compact} />
      </SidebarContent>
      <SidebarFooter className={compact ? "hidden" : undefined}>
        <NavUser
          user={{
            name: currentUser?.username || currentUser?.first_name || "User",
            email: currentUser?.email || "",
            avatar:
              currentUser?.profile_picture ||
              currentUser?.Profile_picture ||
              currentUser?.member?.Profile_picture ||
              "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
