"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { CONFIG } from "@/lib/config";


interface AuthGaurdOptions {
    requireAuth?: boolean;
}


export function useAuthGuard({ requireAuth = true }: AuthGaurdOptions = {}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);


    useEffect(() => {
        const userIsAuth = isAuthenticated();


        if (requireAuth && !userIsAuth) {
            router.replace(CONFIG.ROUTES.LOGIN);
        } else if (!requireAuth && userIsAuth) {
            router.replace(CONFIG.ROUTES.DASHBOARD);
        } else {
            setIsChecking(false);
        }
    }, [requireAuth, router]);


    return { isChecking };
}