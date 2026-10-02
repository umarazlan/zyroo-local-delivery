# Zyroo - Local Delivery & Fleet Logistics Management Platform

A modern, responsive, full-featured React application designed to streamline local logistics, regional delivery management, order tracking, and dispatch operations.

## Features

* **Mockaroo API integration**
* **Centralized API/service layer**
* **React Context state management**
* **Role-based protected routes**
* **Business/Rider/Customer permissions**
* **Simulated real-time delivery status**
* **Optimistic UI updates**
* **Advanced order search**
* **Status filtering**
* **Rider filtering**
* **Date filtering**
* **Combined filters**
* **Clear filters**
* **Notification read/unread state**
* **Active delivery tracking**
* **Google Maps delivery tracking**
---
### New Architecture
```bash
src/
├── api/
│   └── apiClient.js
├── components/
├── pages/
├── layouts/
├── services/
│   ├── orderService.js
│   ├── userService.js
│   ├── riderService.js
│   ├── deliveryService.js
│   └── notificationService.js
├── context/
│   ├── AuthContext.jsx
│   └── AppContext.jsx
├── hooks/
│   ├── useOrders.js
│   ├── useDeliveries.js
│   └── useNotifications.js
└── utils/
    ├── constants.js
    ├── helpers.js
    └── permissions.js
    
```
## 𝗔𝗣𝗜 𝗦𝗲𝘁𝘂𝗽

Mockaroo is used as the mock REST data source for:

* **Orders**
* **Notifications**
* **Deliveries**
* **Users**
* **Riders**

API URLs are configured through Vite environment variables.

---

## State Management

React Context is used for shared application state.

AuthContext manages:

* **Authenticated user**
* **User role**
* **Login/logout**

AppContext manages:

* **Orders**
* **Active delivery**
* **Notifications**
* **Loading states**
* **API errors**
* **Delivery status updates**

---

## Real-Time Updates

The application currently uses a simulated real-time mechanism.

Orders marked for simulation automatically progress through:

```bash
ASSIGNED
   ↓
ACCEPTED
   ↓
PICKED UP
   ↓
IN TRANSIT
   ↓
DELIVERED
```
The status is updated periodically without requiring a page refresh.

## Optimistic UI

The interface updates immediately for:

* **Accept delivery**
* **Update delivery status**
* **Mark notification as read**

If the API operation fails, the previous state is restored.

## Advanced Order Search & Filtering

Orders can be filtered by:

* **Order ID**
* **Customer**
* **Status**
* **Rider**
* **Date**

Multiple filters can be applied simultaneously.

A Clear Filters action resets all filters.

## Environment Variables

Create .env:
```bash
VITE_ORDERS_API_URL=
VITE_NOTIFICATIONS_API_URL=
VITE_DELIVERIES_API_URL=
VITE_USERS_API_URL=
VITE_RIDERS_API_URL=
VITE_GOOGLE_MAPS_API_KEY=
```
## Tech Stack

* **Frontend Framework**: React
* **Routing**: React Router DOM
* **Styling**: Tailwind CSS
* **Icons & Assets**: SVG iconography and custom image modules
* **Maps & Tracking**: Google Maps integration
* **Build Tool**: Vite

---

## Getting Started Locally

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/umarazlan/zyroo-local-delivery.git
   ```

2. Navigate to the project directory:
```bash
cd zyroo-local-delivery
```

3. Run the development server:
```bash 
npm run dev
```

Author

Umar Azlan

Built with React, Tailwind CSS, and modern frontend development practices.

