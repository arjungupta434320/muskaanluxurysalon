import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

const typeConfig = {
  success: {
    containerClass: 'bg-green-50 border border-green-200 text-green-800',
    Icon: CheckCircle,
  },
  info: {
    containerClass: 'bg-gold/10 border border-gold/30 text-espresso',
    Icon: Info,
  },
  error: {
    containerClass: 'bg-red-50 border border-red-200 text-red-800',
    Icon: AlertCircle,
  },
};

export default function Toast({ toasts = [], removeToast }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => {
        const config = typeConfig[toast.type] || typeConfig.info;
        const { Icon } = config;

        return (
          <div
            key={toast.id}
            className={`rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 min-w-[280px] max-w-[90vw] ${
              config.containerClass
            } ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
