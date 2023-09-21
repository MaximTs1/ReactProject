export const RoleTypes = {
    none: 0,
    user: 1,
    business: 2,
    admin: 3,
  };
  
  export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
  };
  