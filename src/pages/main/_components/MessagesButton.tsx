
import { Button } from "@/components/ui/button";

import { MessageCountInfo } from "@/schemas/types";

import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface MessagesButtonProps {
  initialState: MessageCountInfo;
}

export default function MessagesButton({  }: MessagesButtonProps) {


  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Messages"
      asChild
    >
      <Link to="/messages">
        <div className="relative">
          <Mail />
        </div>
        <span className="hidden lg:inline">Messages</span>
      </Link>
    </Button>
  );
}
