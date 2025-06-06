const hasPermission = (userRoles, requiredRoles) => {
    if (requiredRoles.length === 0) return true;
    return userRoles.some(role => requiredRoles.includes(role));
};


export {
    hasPermission
};