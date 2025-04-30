import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const shop = searchParams.get('s');
  const size = searchParams.get('sz');
  const lastDepositDate = searchParams.get('ld')

  const where: Prisma.WarehouseWhereInput = {};

  if (shop) {
    where.shops={
        some: {
          name: shop,
        },
      };;

  if (size) {
    where.size=parseInt(size);
  }
  if (lastDepositDate) {
    where.lastDepositDate=lastDepositDate;
  }
  }
  const warehouses = await prisma.warehouse.findMany({
    where,
    select: {
        id:true,
        name:true,
        size:true,
        count:true,
        lastDepositDate:true,
        shops:true,
        products:true
    }, 
  });

  return NextResponse.json(warehouses, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.warehouse.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Склад был успешно удален' }, { status: 200 });
};
