import { GROUPS } from '@/constansts/routes';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getBearerToken } from '@/lib/axios'
export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const isLoggedIn = !!getBearerToken();
    if (isLoggedIn && to.meta.group === GROUPS.GUEST) {
        return next('/');
    }
    if (!isLoggedIn && to.meta.group === GROUPS.AUTH) {
        return next('/login');
    }
    next();
}
