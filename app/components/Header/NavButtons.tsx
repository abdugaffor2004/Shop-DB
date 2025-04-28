'use client';
import { Button, Menu } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const NavButtons: FC = () => {
  const currentPathname = usePathname();

  return (
    <div className="flex justify-center gap-4">
      <Button
        color={currentPathname !== '/' ? 'white' : 'blue'}
        variant={currentPathname === '/' ? 'white' : 'subtle'}
      >
        <Link href="/">Статистика</Link>
      </Button>

      <Menu trigger="click">
        <Menu.Target>
          <Button
            color={!currentPathname.startsWith('/search') ? 'white' : 'blue'}
            variant={currentPathname.startsWith('/search') ? 'white' : 'subtle'}
          >
            Поиск
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/search/shops">
            Магазины
          </Menu.Item>
          <Menu.Item component={Link} href="/search/warehouses">
            Склады
          </Menu.Item>
          <Menu.Item component={Link} href="/search/employees">
            Сотрудники
          </Menu.Item>
          <Menu.Item component={Link} href="/search/stocks">
            Акции
          </Menu.Item>
          <Menu.Item component={Link} href="/search/suppliers">
            Поставщики
          </Menu.Item>
          <Menu.Item component={Link} href="/search/products">
            Товары
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Menu trigger="click">
        <Menu.Target>
          <Button
            color={!currentPathname.startsWith('/create') ? 'white' : 'blue'}
            variant={currentPathname.startsWith('/create') ? 'white' : 'subtle'}
          >
            Администрирование
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/create/shop">
            Добавить Магазин
          </Menu.Item>
          <Menu.Item component={Link} href="/create/warehouse">
            Добавить Склад
          </Menu.Item>
          <Menu.Item component={Link} href="/create/employee">
            Добавить Сотрудника
          </Menu.Item>
          <Menu.Item component={Link} href="/create/stock">
            Добавить Акцию
          </Menu.Item>
          <Menu.Item component={Link} href="/create/supplier">
            Добавить Поставщика
          </Menu.Item>
          <Menu.Item component={Link} href="/create/product">
            Добавить Товар
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
