
import { Button } from "@/components/ui/button";

import { NotificationCountInfo } from "@/schemas/types";

import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
}

export default function NotificationsButton({
}: NotificationsButtonProps) {


  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Notifications"
      asChild
    >
      <Link to="/notifications">
        <div className="relative">
          <Bell />
        </div>
        <span className="hidden lg:inline">Notifications</span>
      </Link>
    </Button>
  );
}
