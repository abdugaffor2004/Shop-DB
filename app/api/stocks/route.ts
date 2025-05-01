import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const discountPercentage = searchParams.get('dp');
  const startDate = searchParams.get('sd');
  const endDate = searchParams.get('ed');


  const where: Prisma.StockWhereInput = {};

  if (discountPercentage) {
    where.discountPercentage = parseInt(discountPercentage);
  }

  if (startDate) {
    where.startDate = startDate;
  }
  if (endDate) {
    where.endDate = endDate;
  }

  

  const stocks = await prisma.stock.findMany({
    where,
    select: {
        id:true,
        title:true,
        description:true,
        startDate:true,
        endDate:true,
        discountPercentage:true,
        fixedDiscount:true,
        shops:true
    }, 
  });

  return NextResponse.json(stocks, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.stock.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Акция была успешно удалена' }, { status: 200 });
};
export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newStock = await prisma.stock.create({
    data: {
      title: requestData.title,
      description: requestData.description,
      startDate: requestData.startDate,
      endDate: requestData.endDate,
      discountPercentage: requestData.discountPercentage,
      fixedDiscount: requestData.fixedDiscount,
      shops: {connect:requestData.shops}
    },
  });

  return NextResponse.json(newStock, { status: 200 });
};
