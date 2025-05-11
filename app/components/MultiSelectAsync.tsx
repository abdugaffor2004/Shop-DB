'use client';

import { CheckIcon, Combobox, Loader, ScrollArea, Textarea, useCombobox } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import classes from '../components/SelectAsync/SelectAsync.module.css';
import { Handbook } from '../types/Handbook';

interface MultiSelectAsyncProps {
  disabled?: boolean;
  placeholder?: string;
  fetchOptions?: () => void;
  fetchData?: () => void;
  options: Handbook[];
  value: Handbook[];
  className?: string;
  onChange: (value: Handbook[]) => void;
}

export const MultiSelectAsync: FC<MultiSelectAsyncProps> = ({
  className,
  disabled = false,
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

  const handleOptionSelect = (selectedLabel: string) => {
    const selectedOption = options.find(opt => opt.label === selectedLabel);
    if (!selectedOption) return;

    const newValue = value.some(opt => opt.value === selectedOption.value)
      ? value.filter(opt => opt.value !== selectedOption.value)
      : [...value, selectedOption];

    onChange(newValue);
  };

  const displayValue = value.length > 0 ? value.map(v => v.label).join(', ') : placeholder;

  return (
    <Combobox store={combobox} withinPortal={false} onOptionSubmit={handleOptionSelect}>
      <Combobox.Target>
        <Textarea
          {...rest}
          disabled={disabled}
          className={className}
          component=""
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
          <span className={value.length ? 'text-black' : 'text-gray-400'}>{displayValue}</span>
        </Textarea>
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
                  key={option.value}
                  active={value.some(v => v.value === option.value)}
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
                    {value.some(v => v.value === option.value) && (
                      <CheckIcon color="#A1ABBB" size={12} />
                    )}
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
