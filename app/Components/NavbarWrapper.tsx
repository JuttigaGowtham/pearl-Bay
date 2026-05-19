"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const pathname = usePathname();

    // List of routes where the Navbar should be hidden
    // Using exact matches or startsWith based on requirements.
    // Since these seem to be top-level pages, detailed checks or a simple list is fine.
    // We'll hide it if the pathname starts with these routes to cover sub-routes if any.
    const hiddenRoutes = ["/signup", "/signin", "/book-now", "/profile", "/admin"];

    const shouldHideNavbar = hiddenRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

    if (shouldHideNavbar) {
        return null;
    }

    return <Navbar />;
}
