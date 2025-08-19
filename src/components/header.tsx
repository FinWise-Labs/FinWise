"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Bell,
  User,
  Home,
  BarChart3,
  PiggyBank,
  CreditCard,
  MessageSquare,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@auth0/nextjs-auth0/client";
import finwiselogo from "../../public/Group 39518.png";
import Image from "next/image";

export default function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(3); // This could be dynamic in a real app
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
    },
    {
      name: "Goals",
      path: "/goals",
      icon: <PiggyBank className="h-4 w-4 mr-2" />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
    },
    {
      name: "Advisor",
      path: "/advisor",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src={finwiselogo}
              alt="finwise logo"
              width={100}
              height={50}
            />
          </Link>

          {/* Desktop Navigation */}
          {user ? (
            <>
              <nav className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium flex items-center transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : "text-gray-600"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* User Menu - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/alerts">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadAlerts > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white">
                        {unreadAlerts}
                      </Badge>
                    )}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.picture ?? undefined}
                          alt={user.name || ""}
                        />
                        <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href="/profile"
                        className="flex items-center w-full"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/reports"
                        className="flex items-center w-full"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Reports</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button
                        className="flex items-center w-full"
                        onClick={() =>
                          (window.location.href = "/api/auth/logout")
                        }
                      >
                        Log out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/") ? "text-primary" : "text-gray-600"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/features") ? "text-primary" : "text-gray-600"
                  }`}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/pricing") ? "text-primary" : "text-gray-600"
                  }`}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/about") ? "text-primary" : "text-gray-600"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/faq") ? "text-primary" : "text-gray-600"
                  }`}
                >
                  FAQ
                </Link>
              </nav>

              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/api/auth/login?returnTo=/dashboard">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link href="/api/auth/login?returnTo=/dashboard">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.picture ?? undefined}
                        alt={user.name || ""}
                      />
                      <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-sm font-medium flex items-center transition-colors hover:text-primary ${
                        isActive(link.path) ? "text-primary" : "text-gray-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                      {link.name === "Alerts" && unreadAlerts > 0 && (
                        <Badge className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white">
                          {unreadAlerts}
                        </Badge>
                      )}
                    </Link>
                  ))}

                  <Link
                    href="/profile"
                    className="text-sm font-medium flex items-center transition-colors hover:text-primary text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>

                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.location.href = "/api/auth/logout";
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/") ? "text-primary" : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/features"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/features") ? "text-primary" : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/pricing"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/pricing") ? "text-primary" : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/about"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/about") ? "text-primary" : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/faq"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/faq") ? "text-primary" : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                    <Link
                      href="/api/auth/login?returnTo=/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link
                      href="/api/auth/login?returnTo=/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
