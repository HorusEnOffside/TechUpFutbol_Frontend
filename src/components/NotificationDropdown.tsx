import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Notificaciones quemadas
const notifications = [
  {
    id: 1,
    title: "¡Nuevo partido programado!",
    description: "Tu equipo jugará el sábado a las 16:00.",
    time: "hace 2h",
    read: false,
  },
  {
    id: 2,
    title: "Pago pendiente",
    description: "Recuerda completar el pago de inscripción.",
    time: "hace 1d",
    read: true,
  },
  {
    id: 3,
    title: "¡Bienvenido a TechUp Fútbol!",
    description: "Tu registro fue exitoso.",
    time: "hace 3d",
    read: true,
  },
];

export function NotificationDropdown({ iconClass = "text-[#144C9F]", bg = "bg-white", border = "border-gray-200", shadow = "shadow-lg", bellBg = "hover:bg-gray-100", bellDot = "bg-red-500", dropdownBg = "bg-white", headerBg = "bg-gradient-to-r from-[#144C9F]/90 to-[#071F4A]/90 text-white" }) {
  const [show, setShow] = useState(false);
  const notifRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="relative">
      <button
        ref={notifRef}
        className={`relative p-2 rounded-full transition-colors focus:outline-none ${bellBg}`}
        aria-label="Notificaciones"
        onClick={() => setShow((v) => !v)}
      >
        <Bell className={`w-6 h-6 ${iconClass}`} />
        {/* Notificación roja si hay no leídas */}
        {notifications.some((n) => !n.read) && (
          <span className={`absolute top-1 right-1 w-2 h-2 ${bellDot} rounded-full`}></span>
        )}
      </button>
      {/* Dropdown de notificaciones */}
      {show && (
        <div className={`absolute right-0 mt-2 w-80 max-w-xs ${dropdownBg} border ${border} rounded-xl ${shadow} z-50 animate-fade-in flex flex-col overflow-hidden`}>
          <div className={`px-4 py-3 border-b border-gray-100 ${headerBg} font-semibold text-lg`}>Notificaciones</div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100 bg-white">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`px-4 py-3 transition-colors ${notif.read ? "bg-white" : "bg-[#F0F6FF]"} hover:bg-gray-50`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 w-2 h-2 rounded-full ${notif.read ? "bg-gray-300" : "bg-red-500"}`}></span>
                  <div className="flex-1">
                    <div className="font-medium text-[#144C9F] text-sm mb-0.5">{notif.title}</div>
                    <div className="text-xs text-gray-600 mb-1">{notif.description}</div>
                    <div className="text-[11px] text-gray-400">{notif.time}</div>
                  </div>
                </div>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="px-4 py-6 text-center text-gray-400 text-sm">No tienes notificaciones</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
