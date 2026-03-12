import { useId, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { format, parseISO } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { OperationFormValues } from '@/schemas/operation-schema';

function DateTimeField() {
  const { control } = useFormContext<OperationFormValues>();
  const dateId = useId();
  const timeId = useId();
  const [open, setOpen] = useState(false);

  return (
    <FieldGroup className="flex-row">
      {/* Date */}
      <Controller
        name="date"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={dateId}>Дата</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={dateId}
                  variant="outline"
                  aria-invalid={fieldState.invalid}
                  className="w-32 justify-between font-normal"
                >
                  {field.value ? format(parseISO(field.value), 'dd.MM.yyyy') : 'Выберите дату'}
                  <ChevronDownIcon />
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
          </Field>
        )}
      />

      {/* Time */}
      <Controller
        name="time"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-24">
            <FieldLabel htmlFor={timeId}>Время</FieldLabel>
            <Input
              {...field}
              id={timeId}
              type="time"
              aria-invalid={fieldState.invalid}
              step={60}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

export default DateTimeField;
