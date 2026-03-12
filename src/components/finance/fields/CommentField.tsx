import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { OperationFormValues } from '@/schemas/operation-schema';

function CommentField() {
  const { control } = useFormContext<OperationFormValues>();
  const id = useId();

  return (
    <Controller
      name="comment"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className="text-muted-foreground text-sm">
            Комментарий
          </FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            id={id}
            type="text"
            placeholder="Необязательно"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default CommentField;
