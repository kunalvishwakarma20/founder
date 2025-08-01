'use client';

import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/FrLogo.png";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Case Studies",
    href: "/resources/case-studies",
    description: "Learn from successful startup stories.",
  },
  {
    title: "Templates & Tools",
    href: "/resources/templates-tools",
    description: "Discover tools to enhance your business.",
  },
  {
    title: "Book Recommendations",
    href: "/resources/book-recommendations",
    description:
      "Explore curated lists and expert picks of essential business books for founders.",
  },
  {
    title: "FAQs / Knowledge Base",
    href: "/resources/faqs",
    description:
      "Get answers to common startup questions and practical tips on using FoundrGuide.",
  },
  {
    title: "Podcasts & Videos",
    href: "/resources/podcasts-videos",
    description:
      "Listen to expert interviews and watch educational content tailored for entrepreneurs.",
  },
  {
    title: "Guides & Tutorials",
    href: "/resources/guides-tutorials",
    description:
      "Step-by-step guides on startup basics, scaling strategies, and funding tips.",
  },
];

function MobileNav() {
  const [isResourcesOpen, setIsResourcesOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="md:hidden p-2"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[350px] pr-0"
      >
        <nav className="flex flex-col items-center text-center h-full pt-8">
          <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsOpen(false)}>
            <Image src={Logo} alt="FoundrGuide" className="h-6 w-6" />
            <span className="text-base font-semibold">
              Foundr<span className="text-blue-800">Guide.</span>
            </span>
          </Link>

          <div className="flex flex-col items-center space-y-4 w-full px-4">
            <Link 
              href="/" 
              className="w-full py-2 text-sm hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              href="/how-it-works" 
              className="w-full py-2 text-sm hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            
            <Link 
              href="/book-summaries" 
              className="w-full py-2 text-sm hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book Summaries
            </Link>

            {/* Resources Dropdown */}
            <div className="w-full">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="w-full py-2 text-sm hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Resources
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isResourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isResourcesOpen && (
                <div className="mt-2 py-2 px-4 bg-gray-50 rounded-md">
                  {components.map((component) => (
                    <Link
                      key={component.title}
                      href={component.href}
                      className="block py-2 text-sm hover:text-blue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {component.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className="w-full py-2 text-sm hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            {/* Auth Button for Mobile */}
            <div className="pt-4 w-full">
              <Link href="/auth/sign-up" className="block" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full whitespace-nowrap border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Navigation() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="flex gap-2">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/how-it-works" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              How It Works
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/book-summaries" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Book Summaries
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-blue-600">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className="hover:text-blue-600"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const { userId } = useAuth();
  const isAuth = !!userId;
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 py-4 items-center justify-between px-4 lg:justify-around lg:px-10 lg:gap-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image 
              src={Logo} 
              alt="FoundrGuide" 
              className="h-7 w-7 md:h-8 md:w-8" 
              priority 
            />
            <h1 className="text-base font-semibold md:text-lg whitespace-nowrap">
              Foundr<span className="text-blue-800">Guide.</span>
            </h1>
          </Link>
          
          {/* Navigation Section - Hidden on mobile */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <Navigation />
          </div>
          
          {/* Actions Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {isAuth ? (
              <>
                <UserButton afterSignOutUrl="/" />
                <Link href="/dashboard/for-you" className="hidden md:block">
                  <Button
                    variant="outline"
                    size="default"
                    className="whitespace-nowrap border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/sign-up" className="hidden md:block">
                <Button
                  variant="outline"
                  size="default"
                  className="whitespace-nowrap border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Get Started
                </Button>
              </Link>
            )}
            {/* Mobile Navigation - Only visible on mobile */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
