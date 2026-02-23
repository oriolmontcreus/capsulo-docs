import { ReactNode, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
  addMonths,
  Locale,
} from 'date-fns';
import { enUS } from 'date-fns/locale'; // Import enUS locale

// Minimal mock for Drawer components
const Drawer = ({ children, open, onOpenChange }: { children: ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => {
  return <div data-open={open} onClick={() => onOpenChange(!open)}>{children}</div>;
};
const DrawerTrigger = ({ children, asChild }: { children: ReactNode, asChild?: boolean }) => {
  if (asChild) return <>{children}</>;
  return <button>{children}</button>;
};
const DrawerContent = ({ children, className }: { children: ReactNode; className?: string }) => <div className={className}>{children}</div>;
const DrawerTitle = ({ children }: { children: ReactNode }) => <h2>{children}</h2>;


const getDateLocale = (locale: string): Locale => {
  // For now, always return enUS. In a real app, this would dynamically load locales.
  return enUS;
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};


export type RangeCalendarPickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  trigger?: ReactNode;
  classNameContainerTrigger?: string;
  className?: string;
  disabled?: boolean;
  locale?: string;
  fromYear?: number;
  toYear?: number;
};

export const RangeCalendarPicker = ({
  value,
  onChange,
  trigger,
  classNameContainerTrigger,
  className,
  disabled,
  locale,
  fromYear,
  toYear,
}: RangeCalendarPickerProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<DateRange | undefined>(value);
  const [leftMonth, setLeftMonth] = useState<Date>(new Date());
  const [rightMonth, setRightMonth] = useState<Date>(addMonths(new Date(), 1)); // Initialize right month to be 1 month ahead

  // Define preset date ranges
  const today = new Date();
  const presets = {
    today: {
      from: today,
      to: today,
    },
    yesterday: {
      from: subDays(today, 1),
      to: subDays(today, 1),
    },
    last7Days: {
      from: subDays(today, 6),
      to: today,
    },
    last30Days: {
      from: subDays(today, 29),
      to: today,
    },
    monthToDate: {
      from: startOfMonth(today),
      to: today,
    },
    lastMonth: {
      from: startOfMonth(subMonths(today, 1)),
      to: endOfMonth(subMonths(today, 1)),
    },
    yearToDate: {
      from: startOfYear(today),
      to: today,
    },
    lastYear: {
      from: startOfYear(subYears(today, 1)),
      to: endOfYear(subYears(today, 1)),
    },
  };

  useEffect(() => {
    if (open) {
      setTempValue(value);
      if (value?.from) {
        setLeftMonth(value.from);
        setRightMonth(addMonths(value.from, 1)); // Ensure right month is always 1 month ahead of selected start date
      } else {
        setLeftMonth(new Date());
        setRightMonth(addMonths(new Date(), 1));
      }
    }
  }, [open, value]);

  const handleSelect = (range: DateRange | undefined) => {
    setTempValue(range);
  };

  const handlePresetSelect = (preset: DateRange) => {
    setTempValue(preset);
    setLeftMonth(preset.from || new Date());
    setRightMonth(addMonths(preset.from || new Date(), 1)); // Keep right month 1 month ahead of preset start
  };

  const handleConfirm = () => {
    onChange?.(tempValue);
    setOpen(false);
  };

  // When left month changes, ensure right month is always one month ahead
  const handleLeftMonthChange = (month: Date) => {
    setLeftMonth(month);
    setRightMonth(addMonths(month, 1));
  };

  // When right month changes, ensure left month is always one month behind
  const handleRightMonthChange = (month: Date) => {
    setRightMonth(month);
    setLeftMonth(subMonths(month, 1));
  };

  if (!isDesktop) {
    return (
      <div className={className} suppressHydrationWarning>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <div
              className={cn(
                classNameContainerTrigger,
                disabled && 'pointer-events-none opacity-50'
              )}
              onClick={() => !disabled && setOpen(true)}
            >
              {trigger}
            </div>
          </DrawerTrigger>

          <DrawerContent aria-describedby={undefined} className="gap-4 px-4 pb-4">
            {/* <VisuallyHidden>
              <DrawerTitle>Select Date Range</DrawerTitle>
            </VisuallyHidden> */}

            {/* Preset buttons for mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 pt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.today)}
                className="whitespace-nowrap"
              >
                Today
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.yesterday)}
                className="whitespace-nowrap"
              >
                Yesterday
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.last7Days)}
                className="whitespace-nowrap"
              >
                Last 7 Days
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.last30Days)}
                className="whitespace-nowrap"
              >
                Last 30 Days
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.monthToDate)}
                className="whitespace-nowrap"
              >
                Month to date
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.lastMonth)}
                className="whitespace-nowrap"
              >
                Last month
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.yearToDate)}
                className="whitespace-nowrap"
              >
                Year to date
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePresetSelect(presets.lastYear)}
                className="whitespace-nowrap"
              >
                Last year
              </Button>
            </div>

            <Calendar
              key={value?.from?.toDateString() || 'empty'}
              mode="range"
              className="w-full p-0 flex justify-center"
              selected={tempValue}
              month={leftMonth}
              onMonthChange={handleLeftMonthChange}
              onSelect={handleSelect}
              autoFocus
              locale={getDateLocale(locale || "en-US")}
              captionLayout="dropdown"
              fixedWeeks
              fromYear={fromYear || 2000}
              toYear={toYear || new Date().getFullYear() + 100}
            />
            <Button onClick={handleConfirm} className="w-full">
              Confirm
            </Button>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={(val: boolean) => !disabled && setOpen(val)}>
        <PopoverTrigger asChild>
          <div
            className={cn(classNameContainerTrigger, disabled && 'pointer-events-none opacity-50')}
          >
            {trigger}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 mr-2" align="start">
          <div className="rounded-md">
            <div className="flex">
              {/* Preset sidebar */}
              <div className="relative py-4 w-32">
                <div className="h-full border-e">
                  <div className="flex flex-col px-2">
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.today)}
                      size="sm"
                      variant="ghost"
                    >
                      Today
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.yesterday)}
                      size="sm"
                      variant="ghost"
                    >
                      Yesterday
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.last7Days)}
                      size="sm"
                      variant="ghost"
                    >
                      Last 7 Days
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.last30Days)}
                      size="sm"
                      variant="ghost"
                    >
                      Last 30 Days
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.monthToDate)}
                      size="sm"
                      variant="ghost"
                    >
                      Month to date
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.lastMonth)}
                      size="sm"
                      variant="ghost"
                    >
                      Last month
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.yearToDate)}
                      size="sm"
                      variant="ghost"
                    >
                      Year to date
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => handlePresetSelect(presets.lastYear)}
                      size="sm"
                      variant="ghost"
                    >
                      Last year
                    </Button>
                  </div>
                </div>
              </div>

              {/* Calendars - Two separate calendars for independent year/month navigation */}
              <div className="flex gap-4">
                <Calendar
                  key={`left-${value?.from?.toDateString() || 'empty'}`}
                  mode="range"
                  selected={tempValue}
                  month={leftMonth}
                  onMonthChange={handleLeftMonthChange}
                  onSelect={handleSelect}
                  autoFocus
                  locale={getDateLocale(locale || "en-US")}
                  captionLayout="dropdown"
                  numberOfMonths={1}
                  fixedWeeks
                  fromYear={fromYear || 2000}
                  toYear={toYear || new Date().getFullYear() + 100}
                />
                <Calendar
                  key={`right-${value?.to?.toDateString() || 'empty'}`}
                  mode="range"
                  selected={tempValue}
                  month={rightMonth}
                  onMonthChange={handleRightMonthChange}
                  onSelect={handleSelect}
                  locale={getDateLocale(locale || "en-US")}
                  captionLayout="dropdown"
                  numberOfMonths={1}
                  fixedWeeks
                  fromYear={fromYear || 2000}
                  toYear={toYear || new Date().getFullYear() + 100}
                />
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-border flex justify-end">
            <Button onClick={handleConfirm} size="sm" className="h-[30px] rounded-lg">
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
