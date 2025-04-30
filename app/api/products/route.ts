import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const brand = searchParams.get('b');
  const category = searchParams.get('c');
  const shop = searchParams.get('s');


  const where: Prisma.ProductWhereInput = {};

  if (brand) {
    where.brand = (brand);
  }

  if (category) {
    where.category= {
        is: {
          name: category,
        },
      };;
  }
  if (shop) {
    where.shops={
        some: {
          name: shop,
        },
      };;
  }

  

  const products = await prisma.product.findMany({
    where,
    select: {
        id:true,
        name:true,
        description:true,
        price:true,
        costPrice:true,
        brand:true,
        weight:true,
        size:true,
        color:true,
        quantityInWarehouse:true,
        isActive:true,
        createdAt:true,
        category:true,
        shops:true
    }, 
  });

  return NextResponse.json(products, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.product.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Товар был успешно удален' }, { status: 200 });
};
