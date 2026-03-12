import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import type { OperationFormValues } from '@/schemas/schema';

function AmountField() {
  const { control } = useFormContext<OperationFormValues>();
  const id = useId();

  return (
    <Controller
      name="amount"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className="sr-only">
            Сумма
          </FieldLabel>
          <NumericFormat
            id={id}
            aria-invalid={fieldState.invalid}
            placeholder="0.00"
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            allowNegative={false}
            value={field.value ?? ''}
            onValueChange={({ floatValue }) => field.onChange(floatValue ?? undefined)}
            onBlur={field.onBlur}
            name={field.name}
            getInputRef={field.ref}
            className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-center text-3xl font-normal tracking-normal focus:outline-none"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default AmountField;
