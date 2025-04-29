import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const acceptDate = searchParams.get('ad');
  const terminationDate = searchParams.get('td');
  const position = searchParams.get('p');

  const where: Prisma.EmployeeWhereInput = {};

  if (acceptDate) {
    where.acceptDate = acceptDate;
  }

  if (terminationDate) {
    where.terminationDate = terminationDate;
  }

  if (position) {
    where.position = position;
  }

  const employees = await prisma.employee.findMany({
    where,
    select: {
      id: true,
      acceptDate: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      position: true,
      terminationDate: true,
      shop: true,
    },
  });

  return NextResponse.json(employees, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.employee.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Работник был успешно удален' }, { status: 200 });
};
