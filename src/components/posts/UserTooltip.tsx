"use client";

import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserTooltipProps extends PropsWithChildren {
  user: any;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link to={`/users/${user?.email}`}>
                <Avatar>
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>{user?.email.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <div>
              <Link to={`/users/${user?.email}`}>
                <div className="text-lg font-semibold hover:underline">
                  {user?.full_name}
                </div>
                <div className="text-muted-foreground">@{user?.email}</div>
              </Link>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
