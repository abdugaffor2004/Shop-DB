'use client';
import { Box, Center, Flex, Loader, Text } from '@mantine/core';
import { useStatistics } from './useStatistics';
import ShopCountByLocationTable from './components/ShopCountByLocationTable/ShopCountByLocationTable';
import {
  IconBuildingWarehouse,
  IconPointerDollar,
  IconShoppingBag,
  IconUserFilled,
} from '@tabler/icons-react';

export default function Home() {
  const { data: statistics, isLoading } = useStatistics();

  return (
    <main className="mx-20">
      <div className="flex gap-10  mt-10">
        {/* <Box className="w-full px-10 py-6 bg-white rounded-xl h-fit">
          <Text fw="bold" fz={18}>
            Количество магазинов по городам
          </Text>
          {isLoading ? (
            <Center h="20vh">
              <Loader color="blue" />
            </Center>
          ) : (
            <ShopCountByCityTable data={statistics?.shopCountByCity || []} />
          )}
        </Box> */}

        <Box className="w-full px-10 py-6 bg-white rounded-xl h-fit">
          <Text fw="bold" fz={18}>
            Количество магазинов по областям
          </Text>
          {isLoading ? (
            <Center h="20vh">
              <Loader color="blue" />
            </Center>
          ) : (
            <ShopCountByLocationTable data={statistics?.shopCountByLocation || []} />
          )}
        </Box>
      </div>

      <Flex mt={40} justify="space-around">
        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего магазинов
            </Text>
            <IconShoppingBag color="#008be6" size={32} />
          </Flex>

          {isLoading ? (
            <Center h="20vh">
              <Loader color="blue" />
            </Center>
          ) : (
            <Text c="blue" fw={700} fz={34}>
              {statistics?.shopsTotalCount} шт.
            </Text>
          )}
        </Box>

        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего складов
            </Text>
            <IconBuildingWarehouse color="#008be6" size={32} />
          </Flex>

          {isLoading ? (
            <Center h="20vh">
              <Loader color="blue" />
            </Center>
          ) : (
            <Text c="blue" fw={700} fz={34}>
              {statistics?.warehousesTotalCount} шт.
            </Text>
          )}
        </Box>

        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего поставщиков
            </Text>
            <IconPointerDollar color="#008be6" size={32} />
          </Flex>

          {isLoading ? (
            <Center h="20vh">
              <Loader color="blue" />
            </Center>
          ) : (
            <Text c="blue" fw={700} fz={34}>
              {statistics?.suppliersTotalCount} шт.
            </Text>
          )}
        </Box>

        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего сотрудников
            </Text>
            <IconUserFilled color="#008be6" size={32} />
          </Flex>

          {isLoading ? (
            <Center h="20vh">
              <Loader color="blue" />
            </Center>
          ) : (
            <Text c="blue" fw={700} fz={34}>
              {statistics?.employeesTotalCount} шт.
            </Text>
          )}
        </Box>
      </Flex>
    </main>
  );
}
