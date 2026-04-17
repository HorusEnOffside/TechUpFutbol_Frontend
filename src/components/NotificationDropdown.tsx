import { Bell, PartyPopper, Mail, Clock, Banknote } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/AuthContext";
import NotificationService from "../services/notification.service";
import type { NotificationDTO, NotificationType } from "../services/notification.service";

// ─── Per-type style config ────────────────────────────────────────────────────

interface TypeConfig {
  icon: React.ReactNode;
  dot: string;       // tailwind bg color for the dot
  iconBg: string;    // tailwind bg for icon wrapper
  iconColor: string; // tailwind text color for icon
}

function getTypeConfig(type: NotificationType): TypeConfig {
  switch (type) {
    case 'WELCOME':
      return {
        icon: <PartyPopper className="w-4 h-4" />,
        dot: 'bg-green-400',
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-400',
      };
    case 'INVITATION':
      return {
        icon: <Mail className="w-4 h-4" />,
        dot: 'bg-blue-400',
        iconBg: 'bg-blue-500/20',
        iconColor: 'text-blue-400',
      };
    case 'MATCH_REMINDER':
      return {
        icon: <Clock className="w-4 h-4" />,
        dot: 'bg-orange-400',
        iconBg: 'bg-orange-500/20',
        iconColor: 'text-orange-400',
      };
    case 'PAYMENT_UPLOADED':
      return {
        icon: <Banknote className="w-4 h-4" />,
        dot: 'bg-purple-400',
        iconBg: 'bg-purple-500/20',
        iconColor: 'text-purple-400',
      };
  }
}

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return 'ahora';
  if (mins  < 60) return `hace ${mins}m`;
  if (hours < 24) return `hace ${hours}h`;
  return `hace ${days}d`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface NotificationDropdownProps {
  iconClass?: string;
  bellBg?: string;
  bellDot?: string;
  dropdownBg?: string;
  border?: string;
  shadow?: string;
  headerBg?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NotificationDropdown({
  iconClass  = "text-[#144C9F]",
  bellBg     = "hover:bg-gray-100",
  bellDot    = "bg-red-500",
  dropdownBg = "bg-[#071F4A]",
  border     = "border-white/10",
  shadow     = "shadow-2xl",
  headerBg   = "bg-gradient-to-r from-[#144C9F]/90 to-[#071F4A]/90 text-white",
}: NotificationDropdownProps) {
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [show,           setShow]           = useState(false);
  const [notifications,  setNotifications]  = useState<NotificationDTO[]>([]);
  const [hasUnread,      setHasUnread]      = useState(false);

  const userId = user?.id ?? null;

  // ── Poll badge every 60 s ──────────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function checkUnread() {
      try {
        const result = await NotificationService.hasUnread(userId!);
        if (!cancelled) setHasUnread(result);
      } catch {
        // silently ignore — badge stays as-is
      }
    }

    void checkUnread();
    const interval = setInterval(() => { void checkUnread(); }, 60_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [userId]);

  // ── Load full list when dropdown opens ────────────────────────────────────
  const loadNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await NotificationService.getNotifications(userId);
      setNotifications(data);
      setHasUnread(data.some((n) => !n.read));
    } catch {
      // keep previous list
    }
  }, [userId]);

  useEffect(() => {
    if (show) void loadNotifications();
  }, [show, loadNotifications]);

  // ── Close on click outside ────────────────────────────────────────────────
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    }
    if (show) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [show]);

  // ── Mark as read + navigate for INVITATION ────────────────────────────────
  async function handleClick(notif: NotificationDTO) {
    if (!notif.read) {
      try {
        await NotificationService.markAsRead(notif.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)),
        );
        const stillUnread = notifications.some((n) => n.id !== notif.id && !n.read);
        setHasUnread(stillUnread);
      } catch {
        // ignore
      }
    }

    if (notif.type === 'INVITATION') {
      setShow(false);
      navigate('/player/capitanes');
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Bell button */}
      <button
        className={`relative p-2 rounded-full transition-colors focus:outline-none ${bellBg}`}
        aria-label="Notificaciones"
        onClick={() => setShow((v) => !v)}
      >
        <Bell className={`w-6 h-6 ${iconClass}`} />
        {hasUnread && (
          <span className={`absolute top-1 right-1 w-2.5 h-2.5 ${bellDot} rounded-full ring-2 ring-black/20`} />
        )}
      </button>

      {/* Dropdown */}
      {show && (
        <div
          className={`absolute right-0 mt-2 w-80 ${dropdownBg} border ${border} rounded-2xl ${shadow} z-50 flex flex-col overflow-hidden`}
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {/* Header */}
          <div className={`px-4 py-3 ${headerBg} font-semibold text-base`}>
            Notificaciones
          </div>

          {/* List */}
          <ul className="max-h-80 overflow-y-auto divide-y divide-white/5">
            {notifications.length === 0 && (
              <li className="px-4 py-8 text-center text-white/40 text-sm">
                No tienes notificaciones
              </li>
            )}
            {notifications.map((notif) => {
              const cfg = getTypeConfig(notif.type);
              return (
                <li
                  key={notif.id}
                  onClick={() => void handleClick(notif)}
                  className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors hover:bg-white/5 ${
                    notif.read ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  {/* Type icon */}
                  <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${cfg.iconBg} ${cfg.iconColor}`}>
                    {cfg.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {!notif.read && (
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                      )}
                      <span className="text-white text-sm font-semibold truncate">
                        {notif.title}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                    <span className="text-white/30 text-[11px] mt-1 block">
                      {formatDate(notif.createdAt)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
