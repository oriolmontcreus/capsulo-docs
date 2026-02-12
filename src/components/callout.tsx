import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';

export type CalloutType = 'info' | 'warn' | 'warning' | 'error' | 'success';

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'type'> {
    title?: ReactNode;
    /**
     * @defaultValue info
     */
    type?: CalloutType;
    /**
     * Force an icon
     */
    icon?: ReactNode;
}

const iconClass = 'size-5 -me-0.5';

const typeStyles: Record<CalloutType, { border: string; bg: string; iconColor: string; accent: string }> = {
    info: {
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/10',
        iconColor: 'text-blue-500 fill-blue-500',
        accent: 'bg-blue-500/50',
    },
    warn: {
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        iconColor: 'text-amber-500 fill-amber-500',
        accent: 'bg-amber-500/50',
    },
    warning: {
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        iconColor: 'text-amber-500 fill-amber-500',
        accent: 'bg-amber-500/50',
    },
    error: {
        border: 'border-red-500/30',
        bg: 'bg-red-500/10',
        iconColor: 'text-red-500 fill-red-500',
        accent: 'bg-red-500/50',
    },
    success: {
        border: 'border-green-500/30',
        bg: 'bg-green-500/10',
        iconColor: 'text-green-500 fill-green-500',
        accent: 'bg-green-500/50',
    },
};

const defaultIcons: Record<CalloutType, ReactNode> = {
    info: <Info className={iconClass} />,
    warn: <TriangleAlert className={iconClass} />,
    warning: <TriangleAlert className={iconClass} />,
    error: <CircleX className={iconClass} />,
    success: <CircleCheck className={iconClass} />,
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
    ({ className, children, title, type = 'info', icon, ...props }, ref) => {
        // Normalize type aliases
        let normalizedType: CalloutType = type;
        if (type === 'warn') normalizedType = 'warning';
        
        const styles = typeStyles[normalizedType];
        const iconToRender = icon ?? defaultIcons[normalizedType];

        return (
            <div
                ref={ref}
                className={cn(
                    'flex gap-2 my-4 rounded-xl border p-3 ps-1 text-sm shadow-md',
                    styles.bg,
                    styles.border,
                    className
                )}
                {...props}
            >
                <div
                    role="none"
                    className={cn('w-0.5 rounded-sm shrink-0', styles.accent)}
                />
                <div className={cn('shrink-0', styles.iconColor)}>
                    {iconToRender}
                </div>
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                    {title && (
                        <p className={cn('font-medium !my-0', styles.iconColor)}>
                            {title}
                        </p>
                    )}
                    <div className="text-foreground/80 prose-no-margin empty:hidden">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);

Callout.displayName = 'Callout';

export default Callout;
