export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString();
};

export const getInitials = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const getStatusClass = (status) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "IN TRANSIT":
      return "bg-blue-100 text-blue-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};