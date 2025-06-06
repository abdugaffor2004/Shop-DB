import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const city = searchParams.get('c');
  const launchedDate = searchParams.get('ld');
  const closedDate = searchParams.get('cd');
  const position = searchParams.get('p');

  const where: Prisma.ShopWhereInput = {};

  if (city) {
    where.city = city;
  }

  if (launchedDate) {
    where.launchedDate = launchedDate;
  }

  if (closedDate) {
    where.closedDate = closedDate;
  }

  if (position) {
    where.employees = {
      some: {
        position: position,
      },
    };
  }

  const shops = await prisma.shop.findMany({
    where,
    select: {
      id: true,
      address: true,
      areaValue: true,
      city: true,
      closedDate: true,
      deliveryMethods: true,
      region: true,
      name: true,
      launchedDate: true,
      products: true,
      employees: true,
      location: true,
    },
  });

  return NextResponse.json(shops, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.shop.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Магазин был успешно удален' }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();
  const closedDate = requestData.closedDate
    ? new Date(requestData.closedDate).toLocaleDateString('ru')
    : '';

  const launchedDate = requestData.launchedDate
    ? new Date(requestData.launchedDate).toLocaleDateString('ru')
    : '';

  const newShop = await prisma.shop.create({
    data: {
      name: requestData.name,
      city: requestData.city,
      launchedDate,
      closedDate,
      areaValue: requestData.areaValue,
      stocks: { connect: requestData.stocks },
      employees: { connect: requestData.employees },
      suppliers: { connect: requestData.suppliers },
      warehouses: { connect: requestData.warehouses },
      location: requestData.locationId
        ? { connect: { id: requestData.locationId } }
        : {
            create: {
              region: requestData.location.region,
              climate: requestData.location.climate,
              populationCount: requestData.location.populationCount,
            },
          },
    },
  });

  return NextResponse.json(newShop, { status: 200 });
};
