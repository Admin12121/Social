import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";

interface UserLinkWithTooltipProps extends PropsWithChildren {
  username: string;
}

export default function UserLinkWithTooltip({
  children,
  username,
}: UserLinkWithTooltipProps) {


    return (
      <Link
        to={`/users/${username}`}
        className="text-primary hover:underline"
      >
        {children}
      </Link>
    );
}
