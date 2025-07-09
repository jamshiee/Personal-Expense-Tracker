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
import { ModeToggle } from "../mode-toggle";
import { LogOutIcon, Moon, Sun } from "lucide-react";
import { useTokenValid } from "@/lib/tokenVerify";

type User = {
  name?: string;
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

  const tokenResult = useTokenValid();
  const userData: UserData = tokenResult && typeof tokenResult === "object" && "user" in tokenResult
    ? { user: tokenResult.user as User }
    : {};

   

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/profile-img.jpg"
              alt={userData?.user?.name || "User "}
            />
            <AvatarFallback className="bg-gradient-to-br from-foreground via-muted-foreground to-muted opacity-70">
              {userData?.user?.name
                ? userData.user.name.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate font-medium text-sm leading-none">
              {userData && userData.user ? userData.user.name : "User"}
            </p>
            <p className="truncate text-muted-foreground text-xs leading-none">
              {userData && userData.user ? userData.user.email : ""}
            </p>
          </div>
        </DropdownMenuLabel>
    
        {/* <DropdownMenuGroup className="p-0">
          <ModeToggle>
            <DropdownMenuItem>
              <div>Theme</div>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuItem>
          </ModeToggle>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-2 h-4 w-4 text-red-500 " />
          Logout
          {/* <LogOutButton /> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
