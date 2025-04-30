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

  const newShop = await prisma.shop.create({
    data: {
      name: requestData.name,
      address: requestData.address,
      launchedDate: requestData.launchedDate,
      closedDate: requestData.closedDate,
      areaValue: requestData.areaValue,
      locationId: requestData.locationId ?? null,
      stocks: { connect: requestData.stocks },
      employees: { connect: requestData.employees },
    },
  });

  return NextResponse.json(newShop, { status: 200 });
};
