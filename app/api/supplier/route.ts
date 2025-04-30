import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const city = searchParams.get('c');
  const name = searchParams.get('n');

  const where: Prisma.SupplierWhereInput = {};

  if (city) {
    where.city = city;
  }

  if (name) {
    where.name = name;
  }

  

  const suppliers = await prisma.supplier.findMany({
    where,
    select: {
        id:true,
        name:true,
        phoneNumber:true,
        email:true,
        address:true,
        city:true,
        region:true,
        country:true,
        shops:true
    }, 
  });

  return NextResponse.json(suppliers, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.supplier.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Поставщик был успешно удален' }, { status: 200 });
};
export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newSupplier = await prisma.supplier.create({
    data: {
      name: requestData.name,
      email: requestData.email,
      phoneNumber: requestData.phoneNumber,
      address: requestData.address,
      city: requestData.city,
      region: requestData.region,
      country: requestData.country,

    },
  });

  return NextResponse.json(newSupplier, { status: 200 });
};