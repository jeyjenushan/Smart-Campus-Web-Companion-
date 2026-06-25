import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { registerOpen, unregisterOpen } from '@/hooks/useOpenManager';
import { useDarkMode } from '@/hooks/useDarkMode';

export function CustomSelect({ label, value, onValueChange, options }) {
  const [open, setOpen] = useState(false);
  const isDark = useDarkMode();
  const closerRef = useRef(null);

  function handleOpenChange(isOpen) {
    if (isOpen) {
      if (!closerRef.current) {
        closerRef.current = () => setOpen(false);
      }

      registerOpen(closerRef.current);
      setOpen(true);
    } else {
      if (closerRef.current) {
        unregisterOpen(closerRef.current);
      }

      setOpen(false);
    }
  }

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-xs font-semibold text-ink-muted uppercase">
          {label}
        </label>
      )}

      <Select.Root
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Select.Trigger
          className={`
            w-full
            min-h-[48px]
            px-4
            rounded-xl
            border border-surface-border
            ${isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-ink'}
            text-sm
            font-normal
            flex items-center justify-between
            transition-colors
          `}
        >
          <Select.Value placeholder="Select..." />

          <Select.Icon>
            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            modal={false}
            position="popper"
            sideOffset={6}
            avoidCollisions
            className={`
              z-[9999]
              w-[var(--radix-select-trigger-width)]
              rounded-2xl
              border
              ${isDark ? 'border-slate-700 bg-slate-800' : 'border-surface-border bg-white'}
              shadow-xl
              overflow-hidden
              transition-colors
            `}
          >
            <Select.Viewport
              className="
                max-h-[240px]
                overflow-y-auto
                overscroll-contain
                touch-pan-y
                py-1
                course-select-scroll
              "
            >
              {options
                .filter(option => option.value !== '')
                .map(option => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className={`
                      flex
                      items-center
                      min-h-[42px]
                      px-4
                      cursor-pointer
                      outline-none
                      transition-colors
                      ${isDark ? 'data-[highlighted]:bg-slate-700 data-[state=checked]:bg-slate-700 text-slate-100' : 'data-[highlighted]:bg-slate-100 data-[state=checked]:bg-slate-100 text-ink data-[highlighted]:text-ink-strong data-[state=checked]:text-ink-strong'}
                    `}
                  >
                    <Select.ItemText>
                      <span className={`text-sm font-normal leading-5 ${isDark ? 'text-slate-100' : 'text-ink'}`}>
                        {option.label}
                      </span>
                    </Select.ItemText>
                  </Select.Item>
                ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}