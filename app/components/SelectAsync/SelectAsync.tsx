'use client';

import { CheckIcon, Combobox, Loader, ScrollArea, TextInput, useCombobox } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import classes from './SelectAsync.module.css';
import { Handbook } from '@/app/types/Handbook';

interface SelectAsyncProps {
  placeholder?: string;
  fetchOptions?: () => void;
  fetchData?: () => void;
  options: Handbook[];
  value: Handbook | null;
  className?: string;
  onChange: (value: Handbook | null) => void;
}

export const SelectAsync: FC<SelectAsyncProps> = ({
  className,
  placeholder,
  fetchOptions,
  fetchData,
  options,
  value,
  onChange,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const combobox = useCombobox({
    onDropdownOpen: async () => {
      setLoading(true);
      await fetchOptions?.();
      setLoading(false);
    },

    onDropdownClose: async () => {
      await fetchData?.();
    },
  });
  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={val => {
        const newValue = val === value?.label ? null : val;
        const newId = options.find(item => item.label === newValue)?.value || '';
        onChange({ value: newId, label: newValue || '' });
      }}
    >
      <Combobox.Target>
        <TextInput
          {...rest}
          className={` ${className}`}
          classNames={{ input: classes.selectInput }}
          component="button"
          type="button"
          pointer
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          rightSection={
            loading ? (
              <Loader color="#7c68ee" size={18} />
            ) : combobox.dropdownOpened ? (
              <IconChevronUp size={'18px'} />
            ) : (
              <IconChevronDown size={18} />
            )
          }
        >
          {!!value?.label ? (
            <span>{value?.label}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </TextInput>
      </Combobox.Target>

      <Combobox.Dropdown classNames={{ dropdown: classes.selectDropdown }}>
        <Combobox.Options>
          {loading ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : options.length === 0 ? (
            <Combobox.Empty>No results</Combobox.Empty>
          ) : (
            <ScrollArea.Autosize mah={220}>
              {options.map(option => (
                <Combobox.Option
                  classNames={{ option: classes.selectOption }}
                  value={option.label}
                  key={option.label}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      paddingRight: 10,
                      cursor: 'pointer',
                    }}
                  >
                    {value?.label === option.label && <CheckIcon color="#A1ABBB" size={12} />}
                    {option.label}
                  </div>
                </Combobox.Option>
              ))}
            </ScrollArea.Autosize>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
