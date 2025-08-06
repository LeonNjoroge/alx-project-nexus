import {useRouter} from "next/router";

export default function Header() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Search", href: "/search" },
        { name: "Saved", href: "/saved" },
        { name: "Profile", href: "/profile" },
    ];

    const router = useRouter();



    return(
     <header>
        Header component
     </header>
 );
};