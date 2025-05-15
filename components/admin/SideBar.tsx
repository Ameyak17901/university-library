"use client";

import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
        <h1>BookWise</h1>
        <div className="mt-8 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route === "/admin" &&
                pathName.includes(link.route) &&
                link.route.length > 1) ||
              pathName === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div className={cn("link", isSelected && "bg-primary-admin")}>
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      } object-contain`}
                    />
                  </div>
                  <p className={`${isSelected ? "text-white" : "text-dark"}`}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="user ">
          <Avatar>
            <AvatarFallback className="bg-amber-100 rounded-full p-2">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col max-md:hidden">
            <p className="text-dark-200 font-semibold">{session?.user?.name}</p>
            <p className="text-light-500 text-xs">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
