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
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import { BASE_CATEGORIES } from '@/constants/categories';
import { OPERATION_TYPES } from '@/constants/operation-types';
import type { OperationFormValues } from '@/schemas/schema';

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
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id}>Категория</FieldLabel>
            <Combobox items={GROUPED_CATEGORIES} value={field.value} onValueChange={field.onChange}>
              <ComboboxInput
                id={id}
                placeholder="Выберите категорию"
                aria-invalid={fieldState.invalid}
                value={selectedCategory?.label ?? ''}
                showClear
              />
              <ComboboxContent>
                <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
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
          </Field>
        );
      }}
    />
  );
}

export default CategoryField;
