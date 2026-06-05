import * as React from 'react';
import { cn } from '../utils/cn';

export interface StageStep {
  id: string | number;
  title: string;
  description?: string;
  status: 'complete' | 'active' | 'pending' | 'error';
}

export interface StageIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
  steps: StageStep[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'bubble' | 'dot' | 'card' | 'ribbon' | 'capsule' | 'chevron' | 'milestone';
}

export function StageIndicator({
  steps,
  orientation = 'horizontal',
  variant = 'bubble',
  className,
  ...props
}: StageIndicatorProps) {
  const isHorizontal = orientation === 'horizontal';

  // ───────── 1. GLASSMORPHIC CARD DECK VARIANT ─────────
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'w-full p-2 bg-[rgba(255,255,255,0.4)] backdrop-blur-md border border-[var(--border-subtle)] rounded-[var(--radius-md)] flex font-[family-name:var(--font-sans)] gap-2 shadow-[var(--shadow-sm)]',
          isHorizontal ? 'flex-row items-stretch' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';
          const isError = step.status === 'error';

          return (
            <div
              key={step.id}
              className={cn(
                'flex-1 flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-transparent transition-all duration-300 ease-out cursor-pointer hover:translate-y-[-1px]',
                isActive 
                  ? 'bg-white border-[var(--color-gray-900)] shadow-[var(--shadow-sm)] translate-y-[-2px] hover:translate-y-[-2px]' 
                  : 'bg-[rgba(255,255,255,0.3)] hover:bg-[var(--surface-hover)]'
              )}
            >
              <div
                className={cn(
                  'h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold border transition-colors duration-200',
                  isComplete && 'bg-[#E4F1EC] text-[var(--state-success)] border-[#A8D2BD]',
                  isActive && 'bg-[var(--color-gray-900)] text-white border-[var(--color-gray-900)] shadow-sm',
                  step.status === 'pending' && 'bg-white text-[var(--text-disabled)] border-[var(--border-default)]',
                  isError && 'bg-[#FBE5E1] text-[var(--state-error)] border-[#F1B7AE]'
                )}
              >
                {isComplete ? '✓' : isError ? '!' : ''}
              </div>

              <div className="flex flex-col min-w-0">
                <span className={cn('text-xs font-[var(--font-semibold)] truncate', isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]')}>
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[120px] leading-none mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ───────── 2. CAPSULE SLIDER VARIANT ─────────
  if (variant === 'capsule') {
    return (
      <div
        className={cn(
          'w-full p-1 bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded-full flex font-[family-name:var(--font-sans)] items-center relative overflow-hidden',
          className
        )}
        {...props}
      >
        {steps.map((step) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';

          return (
            <div
              key={step.id}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full transition-all duration-300 ease-out cursor-pointer relative z-10',
                isActive 
                  ? 'bg-white text-[var(--text-primary)] shadow-[var(--shadow-sm)] border border-[var(--border-subtle)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {isComplete && (
                <span className="text-[var(--state-success)] font-bold text-xs shrink-0">✓</span>
              )}
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gray-900)] shrink-0 animate-pulse" />
              )}
              <span className="text-xs font-[var(--font-semibold)] truncate">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // ───────── 3. INTERLOCKING CHEVRON VARIANT ─────────
  if (variant === 'chevron') {
    return (
      <div
        className={cn(
          'w-full flex font-[family-name:var(--font-sans)] items-stretch',
          isHorizontal ? 'flex-row' : 'flex-col gap-1',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';
          const isError = step.status === 'error';

          // Inline clip-path for horizontal chevrons
          const horizontalClip = isFirst
            ? 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%)'
            : isLast
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10px 50%)'
            : 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%, 10px 50%)';

          return (
            <div
              key={step.id}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all duration-200 cursor-pointer',
                isComplete && 'bg-[#E4F1EC] text-[var(--state-success)] hover:bg-[#D7EBE1]',
                isActive && 'bg-[var(--color-gray-900)] text-white shadow-sm font-bold',
                step.status === 'pending' && 'bg-[var(--surface-secondary)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]',
                isError && 'bg-[#FBE5E1] text-[var(--state-error)] hover:bg-[#F8D5CE]'
              )}
              style={{
                clipPath: isHorizontal ? horizontalClip : undefined,
                marginRight: isHorizontal && !isLast ? '-8px' : undefined,
                paddingLeft: isHorizontal && !isFirst ? '20px' : undefined,
              }}
            >
              {isComplete && <span className="font-bold text-xs shrink-0">✓</span>}
              <span className="text-xs font-[var(--font-semibold)] truncate">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // ───────── 4. CONCENTRIC PULSE DOT VARIANT ─────────
  if (variant === 'dot') {
    return (
      <div
        className={cn(
          'w-full flex relative font-[family-name:var(--font-sans)] items-start',
          isHorizontal ? 'flex-row justify-between' : 'flex-col gap-6',
          className
        )}
        {...props}
      >
        {/* Constrained Connecting Line */}
        {isHorizontal && (
          <div
            className="absolute top-3 bg-[var(--border-default)]"
            style={{
              left: '10%',
              right: '10%',
              height: '1.5px',
              zIndex: 1,
            }}
          >
            {/* Filled Progress Line */}
            <div
              className="h-full bg-[var(--state-success)] transition-all duration-500 ease-out"
              style={{
                width: `${(steps.findIndex((s) => s.status === 'active' || s.status === 'pending') / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        )}

        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';
          const isPending = step.status === 'pending';
          const isError = step.status === 'error';

          return (
            <div
              key={step.id}
              className={cn(
                'flex relative z-10 cursor-pointer',
                isHorizontal ? 'flex-col items-center text-center flex-1' : 'flex-row items-start gap-4'
              )}
            >
              {/* Dot Wrapper */}
              <div className="flex items-center justify-center h-6 w-full relative">
                <div
                  className={cn(
                    'h-6 w-6 flex items-center justify-center rounded-full shrink-0 relative transition-all duration-300',
                    isActive && 'bg-[rgba(200,16,46,0.12)] scale-110'
                  )}
                >
                  <div
                    className={cn(
                      'h-2.5 w-2.5 rounded-full transition-all duration-300',
                      isComplete && 'bg-[var(--state-success)]',
                      isActive && 'bg-[var(--color-gray-900)] ring-[2px] ring-[var(--color-gray-900)] ring-offset-1',
                      isPending && 'bg-[var(--border-default)]',
                      isError && 'bg-[var(--state-error)]'
                    )}
                  />
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-[var(--color-gray-900)] animate-[ping_1.5s_infinite] opacity-75" />
                  )}
                </div>

                {/* Vertical connecting line */}
                {!isHorizontal && !isLast && (
                  <div
                    className="absolute left-3 top-6 bottom-[-24px] w-[1.5px] -translate-x-1/2 bg-[var(--border-default)]"
                    style={{
                      backgroundColor: isComplete ? 'var(--state-success)' : undefined,
                    }}
                  />
                )}
              </div>

              {/* Labels */}
              <div className={cn('flex flex-col mt-2', isHorizontal ? 'items-center px-1' : 'items-start pt-0.5')}>
                <span className={cn('text-xs font-[var(--font-semibold)]', isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]')}>
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-none max-w-[120px] truncate">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ───────── 5. CORPORATE MILESTONE BADGES ─────────
  if (variant === 'milestone') {
    return (
      <div
        className={cn(
          'w-full flex font-[family-name:var(--font-sans)] gap-3',
          isHorizontal ? 'flex-row' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';
          const isError = step.status === 'error';

          return (
            <div
              key={step.id}
              className={cn(
                'flex-1 p-3 bg-white border rounded-[var(--radius-md)] flex flex-col gap-2 transition-all duration-300 cursor-pointer shadow-[var(--shadow-sm)] hover:translate-y-[-1px]',
                isActive 
                  ? 'border-[var(--color-gray-900)] ring-1 ring-[var(--color-gray-900)]' 
                  : 'border-[var(--border-subtle)] hover:bg-[var(--surface-hover)]'
              )}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[var(--text-muted)]">Step {index + 1}</span>
                <span
                  className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded-full font-bold',
                    isComplete && 'bg-[#E4F1EC] text-[var(--state-success)]',
                    isActive && 'bg-[rgba(28,31,36,0.06)] text-[var(--text-primary)]',
                    step.status === 'pending' && 'bg-[var(--surface-secondary)] text-[var(--text-muted)]',
                    isError && 'bg-[#FBE5E1] text-[var(--state-error)]'
                  )}
                >
                  {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-[var(--font-bold)] text-[var(--text-primary)]">{step.title}</span>
                <span className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{step.description || 'Workflow milestone'}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ───────── 6. BUBBLE VARIANT (Standard Circular Stepper, Redesigned) ─────────
  return (
    <div
      className={cn(
        'font-[family-name:var(--font-sans)] w-full flex relative items-start',
        isHorizontal ? 'flex-row justify-between' : 'flex-col gap-6',
        className
      )}
      {...props}
    >
      {/* Constrained Connecting Line */}
      {isHorizontal && (
        <div
          className="absolute top-3.5 bg-[var(--border-default)]"
          style={{
            left: '10%',
            right: '10%',
            height: '1.5px',
            zIndex: 1,
          }}
        >
          {/* Filled Progress Line */}
          <div
            className="h-full bg-[var(--state-success)] transition-all duration-500 ease-out"
            style={{
              width: `${(steps.findIndex((s) => s.status === 'active' || s.status === 'pending') / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      )}

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isComplete = step.status === 'complete';
        const isActive = step.status === 'active';
        const isPending = step.status === 'pending';
        const isError = step.status === 'error';

        return (
          <div
            key={step.id}
            className={cn(
              'flex relative z-10 cursor-pointer',
              isHorizontal ? 'flex-col items-center text-center flex-1' : 'flex-row items-start gap-4'
            )}
          >
            <div className="flex items-center justify-center h-7 w-full relative">
              {/* Step indicator bubble */}
              <div
                className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center text-xs font-[var(--font-semibold)] border transition-all duration-300 shrink-0',
                  isComplete && 'bg-[#E4F1EC] text-[var(--state-success)] border-[#A8D2BD]',
                  isActive && 'bg-[var(--color-gray-900)] text-white border-[var(--color-gray-900)] shadow-[var(--shadow-sm)] scale-105',
                  isPending && 'bg-white text-[var(--text-muted)] border-[var(--border-default)]',
                  isError && 'bg-[#FBE5E1] text-[var(--state-error)] border-[#F1B7AE]'
                )}
              >
                {isComplete ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : isError ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Vertical connecting line */}
              {!isHorizontal && !isLast && (
                <div
                  className="absolute left-3.5 top-7 bottom-[-24px] w-[1.5px] -translate-x-1/2 bg-[var(--border-default)]"
                  style={{
                    backgroundColor: isComplete ? 'var(--state-success)' : undefined,
                  }}
                />
              )}
            </div>

            {/* Metadata (Labels & details) */}
            <div
              className={cn(
                'flex flex-col mt-2',
                isHorizontal ? 'items-center px-1' : 'items-start pt-1'
              )}
            >
              <span
                className={cn(
                  'text-[14px] font-[var(--font-semibold)]',
                  isActive ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-primary)]'
                )}
              >
                {step.title}
              </span>
              {step.description && (
                <span className="text-[14px] text-[var(--text-muted)] mt-0.5 max-w-[140px] leading-tight">
                  {step.description}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

StageIndicator.displayName = 'StageIndicator';
