import { useId, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { format, parseISO } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { OperationFormValues } from '@/schemas/operation-schema';

function DateTimeField() {
  const { control } = useFormContext<OperationFormValues>();
  const dateId = useId();
  const timeId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 py-3">
      <span className="text-foreground w-20 shrink-0 text-sm">Date</span>
      <div className="flex flex-1 items-center gap-2 pl-4">
        {/* Date */}
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-1 flex-col">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id={dateId}
                    variant="outline"
                    aria-invalid={fieldState.invalid}
                    className="w-full justify-center gap-1 text-sm font-normal"
                  >
                    {field.value ? format(parseISO(field.value), 'dd.MM.yyyy') : 'Select Date'}
                    <ChevronDownIcon className="size-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? parseISO(field.value) : undefined}
                    captionLayout="dropdown"
                    defaultMonth={field.value ? parseISO(field.value) : new Date()}
                    onSelect={(date) => {
                      field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        {/* Time */}
        <Controller
          name="time"
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-1 flex-col">
              <Input
                {...field}
                id={timeId}
                type="time"
                aria-invalid={fieldState.invalid}
                step={60}
                className="w-full appearance-none text-center text-sm [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default DateTimeField;
