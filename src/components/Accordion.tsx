'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = true }) => {
  const [openIds, setOpenIds] = useState<string[]>(
    items.filter((i) => i.defaultOpen).map((i) => i.id)
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-color)' }}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            style={{
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '1rem',
                color: isOpen ? 'var(--color-sage-700)' : 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              <span>{item.title}</span>
              <div
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease',
                  color: isOpen ? 'var(--color-sage-600)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChevronDownIcon size={18} />
              </div>
            </button>

            {isOpen && (
              <div
                className="animate-fade-in"
                style={{
                  paddingBottom: '18px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
