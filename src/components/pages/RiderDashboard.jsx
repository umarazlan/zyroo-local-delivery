import React, { useState, useEffect } from "react";
import {
  Bike,
  Clock,
  PackageCheck,
  CheckCircle2,
  Truck,
  PackageOpen,
  MapPin,
  Store,
  User,
  Check,
  Navigation,
  Inbox,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getRiderDeliveries } from "../../services/riderService";
import { ORDER_STATUS } from "../../utils/constants";
import useDeliveries from "../../hooks/useDeliveries";
import { useAuth } from "../../context/AuthContext";
import { canAcceptDelivery, canUpdateDelivery } from "../../utils/permissions";
import { useAppContext } from "../../context/AppContext";

/* Visual config per status: badge colors, icon, and the accent rail on the card */
const STATUS_STYLES = {
  [ORDER_STATUS.ASSIGNED]: {
    label: "Waiting for you",
    icon: Clock,
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    rail: "bg-amber-400",
  },
  [ORDER_STATUS.ACCEPTED]: {
    label: "Accepted",
    icon: CheckCircle2,
    badge: "bg-sky-50 text-sky-700 ring-sky-200",
    rail: "bg-sky-400",
  },
  [ORDER_STATUS.PICKED_UP]: {
    label: "Picked up",
    icon: PackageOpen,
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    rail: "bg-indigo-400",
  },
  [ORDER_STATUS.IN_TRANSIT]: {
    label: "On the way",
    icon: Truck,
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    rail: "bg-blue-500",
  },
  [ORDER_STATUS.DELIVERED]: {
    label: "Delivered",
    icon: PackageCheck,
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rail: "bg-emerald-400",
  },
};

const FALLBACK_STYLE = {
  label: "Unknown",
  icon: Clock,
  badge: "bg-gray-100 text-gray-600 ring-gray-200",
  rail: "bg-gray-300",
};

function StatCard({ icon: Icon, label, value, tone, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${
        active
          ? "border-gray-900 bg-gray-900 text-white shadow-lg shadow-gray-900/10"
          : "border-gray-100 bg-white text-gray-900 hover:border-gray-300"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-white/15 text-white" : tone
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span>
        <span className="block text-2xl font-black leading-none">{value}</span>
        <span
          className={`mt-1 block text-xs font-medium ${
            active ? "text-white/70" : "text-gray-500"
          }`}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

function ActionButton({ icon: Icon, children, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto ${className}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.4} />
      {children}
    </button>
  );
}

export default function RiderDashboard() {
  const { orders, updateDeliveryStatus, selectActiveDelivery } =
    useAppContext();
  const { role } = useAuth();
  const { updateDeliveryStatusOptimistic } = useAppContext();
  const { deliveries, setDeliveries, loading, error } = useDeliveries();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getRiderDeliveries()
      .then((data) => setDeliveries(data))
      .catch((err) => console.error(err));
  }, []);

  const pendingDeliveries = deliveries.filter(
    (d) => d.status === ORDER_STATUS.ASSIGNED,
  );
  const activeDeliveries = deliveries.filter(
    (d) =>
      d.status === ORDER_STATUS.ACCEPTED ||
      d.status === ORDER_STATUS.PICKED_UP ||
      d.status === ORDER_STATUS.IN_TRANSIT,
  );
  const completedDeliveries = deliveries.filter(
    (d) => d.status === ORDER_STATUS.DELIVERED,
  );

  const visibleDeliveries =
    filter === "pending"
      ? pendingDeliveries
      : filter === "active"
        ? activeDeliveries
        : filter === "completed"
          ? completedDeliveries
          : deliveries;

  // One helper instead of four copy-pasted handlers
  const updateStatus = (deliveryId, status) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === deliveryId ? { ...d, status } : d)),
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 p-10 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading deliveries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600">
        <AlertCircle className="h-5 w-5 shrink-0" />
        {error}
      </div>
    );
  }

  const stats = [
    {
      key: "all",
      icon: Bike,
      label: "Today's deliveries",
      value: deliveries.length,
      tone: "bg-gray-100 text-gray-700",
    },
    {
      key: "pending",
      icon: Clock,
      label: "Pending",
      value: pendingDeliveries.length,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      key: "active",
      icon: Truck,
      label: "Active",
      value: activeDeliveries.length,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      key: "completed",
      icon: PackageCheck,
      label: "Completed",
      value: completedDeliveries.length,
      tone: "bg-emerald-50 text-emerald-600",
    },
  ];

  
  return (
    <>
      {/* Stats double as filters */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard
            key={s.key}
            icon={s.icon}
            label={s.label}
            value={s.value}
            tone={s.tone}
            active={filter === s.key}
            onClick={() => setFilter(s.key)}
          />
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Bike className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Today's deliveries
            </h2>
            <p className="text-xs text-gray-500">
              Tap a number above to filter what you see.
            </p>
          </div>
        </div>

        {visibleDeliveries.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-200 py-12 text-center">
            <Inbox className="h-8 w-8 text-gray-300" />
            <p className="text-sm font-semibold text-gray-700">
              No deliveries here
            </p>
            <p className="text-xs text-gray-500">
              New assignments will show up as soon as they're sent to you.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleDeliveries.map((delivery) => {
              const style = STATUS_STYLES[delivery.status] || FALLBACK_STYLE;
              const StatusIcon = style.icon;

              return (
                <div
                  key={delivery.id}
                  className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 pl-5 transition hover:border-gray-200 hover:shadow-md hover:shadow-gray-900/5"
                >
                  {/* Status color rail */}
                  <span
                    className={`absolute inset-y-0 left-0 w-1.5 ${style.rail}`}
                  />

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    {/* Delivery information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-gray-900">
                          #{delivery.id}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${style.badge}`}
                        >
                          <StatusIcon className="h-3 w-3" strokeWidth={2.5} />
                          {style.label}
                        </span>
                      </div>

                      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                        <User className="h-3.5 w-3.5 text-gray-400" />
                        {delivery.customer}
                      </p>

                      {/* Pickup → drop-off route */}
                      <div className="mt-3 flex gap-3">
                        <div className="flex flex-col items-center pt-0.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                            <Store className="h-3.5 w-3.5" />
                          </span>
                          <span className="my-1 w-px flex-1 border-l-2 border-dotted border-gray-200" />
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <MapPin className="h-3.5 w-3.5" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-col justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-medium text-gray-400">
                              Pick up from
                            </p>
                            <p className="truncate text-sm text-gray-700">
                              {delivery.pickupAddress}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-gray-400">
                              Deliver to
                            </p>
                            <p className="truncate text-sm text-gray-700">
                              {delivery.deliveryAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action button: one per status */}
                    <div className="flex items-center sm:shrink-0">
                      {/* ASSIGNED → ACCEPTED */}
                      {delivery.status === ORDER_STATUS.ASSIGNED &&
                        canAcceptDelivery(role) && (
                          <button
                            onClick={async () => {
                              try {
                                await updateDeliveryStatusOptimistic(
                                  delivery.orderId,
                                  ORDER_STATUS.ACCEPTED,
                                  () =>
                                    updateDeliveryStatus(
                                      delivery.orderId,
                                      ORDER_STATUS.ACCEPTED,
                                    ),
                                );

                                console.log("Delivery accepted successfully");
                              } catch (error) {
                                alert(
                                  "Failed to accept delivery. Please try again.",
                                );
                              }
                            }}
                            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                          >
                            Accept
                          </button>
                        )}

                      {/* ACCEPTED → PICKED UP */}
                      {delivery.status === ORDER_STATUS.ACCEPTED &&
                        canUpdateDelivery(role) && (
                          <button
                            onClick={async () => {
                              try {
                                await updateDeliveryStatusOptimistic(
                                  delivery.orderId,
                                  ORDER_STATUS.PICKED_UP,
                                  () =>
                                    updateDeliveryStatus(
                                      delivery.orderId,
                                      ORDER_STATUS.PICKED_UP,
                                    ),
                                );
                              } catch (error) {
                                alert(
                                  "Failed to update delivery status. Please try again.",
                                );
                              }
                            }}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                          >
                            Pick Up
                          </button>
                        )}

                      {/* PICKED UP → IN TRANSIT */}
                      {delivery.status === ORDER_STATUS.PICKED_UP &&
                        canUpdateDelivery(role) && (
                          <button
                            onClick={async () => {
                              try {
                                await updateDeliveryStatusOptimistic(
                                  delivery.orderId,
                                  ORDER_STATUS.IN_TRANSIT,
                                  () =>
                                    updateDeliveryStatus(
                                      delivery.orderId,
                                      ORDER_STATUS.IN_TRANSIT,
                                    ),
                                );
                              } catch (error) {
                                alert(
                                  "Failed to update delivery status. Please try again.",
                                );
                              }
                            }}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                          >
                            Start Delivery
                          </button>
                        )}

                      {/* IN TRANSIT → DELIVERED */}
                      {delivery.status === ORDER_STATUS.IN_TRANSIT &&
                        canUpdateDelivery(role) && (
                          <button
                            onClick={async () => {
                              try {
                                await updateDeliveryStatusOptimistic(
                                  delivery.orderId,
                                  ORDER_STATUS.DELIVERED,
                                  () =>
                                    updateDeliveryStatus(
                                      delivery.orderId,
                                      ORDER_STATUS.DELIVERED,
                                    ),
                                );
                              } catch (error) {
                                alert(
                                  "Failed to update delivery status. Please try again.",
                                );
                              }
                            }}
                            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
