import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const locations = await prisma.location.findMany();

  return NextResponse.json(locations, { status: 200 });
};
