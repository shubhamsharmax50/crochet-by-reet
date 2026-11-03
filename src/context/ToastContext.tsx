'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckIcon, XIcon, SparklesIcon } from '@/components/Icons';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '380px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#FFFFFF',
              color: '#231E1B',
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1px solid #E7DFD4',
              boxShadow: '0 10px 25px rgba(35, 30, 27, 0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: toast.type === 'info' ? 'var(--color-terracotta-100)' : 'var(--color-sage-100)',
                color: toast.type === 'info' ? 'var(--color-terracotta-600)' : 'var(--color-sage-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {toast.type === 'info' ? <SparklesIcon size={16} /> : <CheckIcon size={16} />}
            </div>
            <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
              style={{ color: '#8E837D', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <XIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
