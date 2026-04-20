import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FieldError } from '@/components/ui/field';
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
        <div className="flex items-center gap-4 py-3">
          <label htmlFor={id} className="text-foreground w-20 shrink-0 text-sm">
            Description
          </label>
          <div className="flex flex-1 flex-col pl-4">
            <Input
              {...field}
              id={id}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Optional"
              className="placeholder:text-muted-foreground bg-transparent pl-2 text-sm shadow-none"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        </div>
      )}
    />
  );
}

export default CommentField;
