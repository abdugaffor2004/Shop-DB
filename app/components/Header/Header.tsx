'use client';
import { Group, Switch, Text } from '@mantine/core';
import { IconShoppingCartFilled } from '@tabler/icons-react';
import React from 'react';
import { NavButtons } from './NavButtons';
import { useToggle } from '@mantine/hooks';

const Header = () => {
  const [value, toggle] = useToggle(['Postgresql', 'Mysql']);
  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#4169e2] sticky top-0 z-10">
      <Group gap="14px" align="center">
        <IconShoppingCartFilled color="white" size="2.5rem" />
        <Text c="white" fw={700} fz="1.5rem">
          ShopDB
        </Text>
      </Group>

      <Group>
        <Switch
          ml={50}
          size="lg"
          checked={value === 'Postgresql'}
          onChange={() => toggle()}
          onLabel={<Text p={10} fz={12}>Postgresql</Text>}
          offLabel={<Text p={10} fz={12}>MySql</Text>}
        />
        <NavButtons />
      </Group>
    </header>
  );
};

export default Header;
