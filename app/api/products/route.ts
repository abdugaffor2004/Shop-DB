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

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newProduct = await prisma.product.create({
    data: {
      name: requestData.name,
      description: requestData.description,
      price: requestData.price,
      costPrice: requestData.costPrice,
      brand: requestData.brand,
      weight: requestData.weight,
      size: requestData.size,
      quantityInWarehouse: requestData.quantityInWarehouse,
      color: requestData.color,
      isActive: requestData.isActive,
      createdAt: requestData.createdAt,
      category: { connect: requestData.category },
      shops: { connect: requestData.shops },
    },
  });
  return NextResponse.json(newProduct, { status: 200 });
};