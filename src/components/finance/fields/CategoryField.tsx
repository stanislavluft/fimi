import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from '@/components/ui/combobox';
import { FieldError } from '@/components/ui/field';

import { BASE_CATEGORIES } from '@/constants/categories';
import { OPERATION_TYPES } from '@/constants/operation-types';
import type { OperationFormValues } from '@/schemas/operation-schema';

const GROUPED_CATEGORIES = OPERATION_TYPES.map((op) => ({
  type: op.value,
  label: op.label,
  items: BASE_CATEGORIES.filter((cat) => cat.type === op.value),
}));

function CategoryField() {
  const { control } = useFormContext<OperationFormValues>();
  const id = useId();

  return (
    <Controller
      name="categoryId"
      control={control}
      render={({ field, fieldState }) => {
        const selectedCategory = BASE_CATEGORIES.find((cat) => cat.id === field.value);

        return (
          <div className="flex items-center gap-4 py-3">
            <label htmlFor={id} className="text-foreground w-20 shrink-0 text-sm">
              Category
            </label>
            <div className="flex flex-1 flex-col pl-4">
              <Combobox
                items={GROUPED_CATEGORIES}
                value={field.value}
                onValueChange={field.onChange}
              >
                <ComboboxInput
                  id={id}
                  placeholder="Select"
                  aria-invalid={fieldState.invalid}
                  value={selectedCategory?.label ?? ''}
                  showClear
                  className="text-right"
                />
                <ComboboxContent>
                  <ComboboxEmpty>Nothing found</ComboboxEmpty>
                  <ComboboxList>
                    {(group, index) => (
                      <ComboboxGroup key={group.type} items={group.items}>
                        <ComboboxLabel>{group.label}</ComboboxLabel>
                        <ComboboxCollection>
                          {(item) => (
                            <ComboboxItem key={item.id} value={item.id}>
                              {item.label}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                        {index < GROUPED_CATEGORIES.length - 1 && <ComboboxSeparator />}
                      </ComboboxGroup>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </div>
        );
      }}
    />
  );
}

export default CategoryField;
