import { Group, Text } from '@mantine/core';
import { IconShoppingCartFilled } from '@tabler/icons-react';
import React from 'react';
import { NavButtons } from './NavButtons';

const Header = () => {
  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#4169e2] sticky top-0 z-10">
      <Group gap="14px" align="center">
        <IconShoppingCartFilled color="white" size="2.5rem" />
        <Text c="white" fw={700} fz="1.5rem">
          ShopDB
        </Text>
      </Group>
      <NavButtons />
    </header>
  );
};

export default Header;
