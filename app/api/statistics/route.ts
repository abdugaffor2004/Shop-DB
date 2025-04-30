import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const shopsTotalCount = await prisma.shop.count();
  const suppliersTotalCount = await prisma.supplier.count();
  const employeesTotalCount = await prisma.employee.count();
  const warehousesTotalCount = await prisma.warehouse.count();

  const shopCountByCity = await prisma.shop.groupBy({
    by: ['city'],
    _count: {
      _all: true,
    },
  });

  const shopCountByLocation = await prisma.shop.groupBy({
    by: ['locationId'],
    _count: {
      _all: true,
    },
  });

  const shopCountBylocationIds = shopCountByLocation.map(item => item.locationId || '');

  const locations = await prisma.location.findMany({
    where: {
      id: {
        in: shopCountBylocationIds,
      },
    },
    select: {
      id: true,
      region: true,
    },
  });

  const locationsMap = new Map(locations.map(item => [item.id, item.region]));

  const formattedShopCountByLocation = shopCountByLocation.map(item => ({
    location: locationsMap.get(item.locationId || ''),
    count: item._count._all,
  }));

  const formattedShopCountByCity = shopCountByCity.map(item => ({
    city: item.city,
    count: item._count._all,
  }));

  return NextResponse.json(
    {
      shopCountByLocation: formattedShopCountByLocation,
      shopCountByCity: formattedShopCountByCity,
      shopsTotalCount,
      suppliersTotalCount,
      employeesTotalCount,
      warehousesTotalCount,
    },
    { status: 200 },
  );
};
