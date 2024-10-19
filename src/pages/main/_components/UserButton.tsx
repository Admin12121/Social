import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import supabase from '@/api/feature/sessionProvider';
import { Button } from '@/components/ui/button';

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const [user, setUser] = useState<any>({})
  const route = useNavigate();

  useEffect(()=>{
    async function getUserData() {
      await supabase.auth.getUser().then((value)=>{
        if(value.data.user){
          setUser(value.data.user)
        }else{
          setUser(null)
        }
      })
    }
    getUserData()
  },[])

  async function signOutUser(){
    const {error}  = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      route("/");
    } else {
      console.error("Error signing out:", error);
    }
  }

  if(!user){
    return(
      <div className='sm:ms-auto'>
        <Button asChild><Link to="/login">Login</Link></Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <Avatar >
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{user?.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user?.user_metadata?.preferred_username || user?.user_metadata?.full_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={`/users/${user?.id}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => {
            signOutUser()
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
