"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, Moon, Sun } from "lucide-react";
import { useAuth } from "@/lib/tokenVerify";

type User = {
  fullname?: string;
  email?: string;
};

type UserData = {
  user?: User;
};

export  function UserNav() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
  };

  const {user} = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/profile-img.jpg"
              alt={user?.fullname || "User "}
            />
            <AvatarFallback className="bg-gradient-to-br from-foreground via-muted-foreground to-muted opacity-70">
              {user?.fullname
                ? user.fullname.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate font-medium text-sm leading-none">
              {user && user.fullname ? user.fullname : "User"}
            </p>
            <p className="truncate text-muted-foreground text-xs leading-none">
              {user && user.email ? user.email : ""}
            </p>
          </div>
        </DropdownMenuLabel>
    
     
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-2 h-4 w-4 text-red-500 " />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
