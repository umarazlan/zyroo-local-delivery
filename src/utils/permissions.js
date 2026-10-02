export const ROLE = {
  BUSINESS: "business",
  RIDER: "rider",
  CUSTOMER: "customer",
};

export const canCreateOrder = (role) => {
  return role === ROLE.BUSINESS;
};

export const canEditOrder = (role) => {
  return role === ROLE.BUSINESS;
};

export const canAssignRider = (role) => {
  return role === ROLE.BUSINESS;
};

export const canCancelOrder = (role) => {
  return role === ROLE.BUSINESS;
};

export const canAcceptDelivery = (role) => {
  return role === ROLE.RIDER;
};

export const canUpdateDelivery = (role) => {
  return role === ROLE.RIDER;
};

export const canViewOrders = (role) => {
  return (
    role === ROLE.BUSINESS ||
    role === ROLE.RIDER ||
    role === ROLE.CUSTOMER
  );
};

export const canTrackOrder = (role) => {
  return (
    role === ROLE.BUSINESS ||
    role === ROLE.RIDER ||
    role === ROLE.CUSTOMER
  );
};