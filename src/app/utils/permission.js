import { isIncludeIn } from "../services/utils";

const hasPermission = (userRoles, requiredRoles) => {
    if (requiredRoles.length === 0) return true;
    return userRoles.some(role => requiredRoles.includes(role));
};

const checkAuthorizations = (roles, routes) => {
    return routes && routes.length !== 0 && isIncludeIn(roles, routes);
}


export {
    hasPermission,
    checkAuthorizations
};