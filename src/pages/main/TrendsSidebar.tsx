import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import supabase from "@/api/feature/sessionProvider";
import UserTooltip from "@/components/posts/UserTooltip";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
      </Suspense>
    </div>
  );
}

function WhoToFollow() {
  const [user, setUser] = useState<any>();

  const fetchuser = async () => {
    const { data: users, error } = await supabase
      .from("random_user")
      .select("*")
      .limit(5);

    if (error) {
      console.error("Error fetching random users:", error);
    } else {
      setUser(users);
    }
  };
  useEffect(()=>{
    fetchuser()
  },[])

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
      {user && user.map((user:any) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <UserTooltip user={user}>
            <Link
              to={`/users/${user?.full_name}`}
              className="flex items-center gap-3"
            >
              <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>
                  {user.email.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="line-clamp-1 break-all font-semibold hover:underline">
                  {user.full_name}
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground">
                  @{user.full_name}
                </p>
              </div>
            </Link>
          </UserTooltip>
          <Button> Follow </Button>
        </div>
      ))}
    </div>
  );
}