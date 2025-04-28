import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
faker.locale = 'ru';

const prisma = new PrismaClient();

const randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

async function createLocations() {
  const locations = [];
  for (let i = 0; i < 50; i++) {
    locations.push({
      region: faker.location.state(),
      climate: randomFromArray(['Умеренный', 'Континентальный', 'Субтропический']),
      populationCount: faker.number.int({ min: 50000, max: 10000000 }),
    });
  }
  return prisma.location.createMany({ data: locations });
}

async function createCategories() {
  const categories = [];
  for (let i = 0; i < 50; i++) {
    categories.push({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    });
  }
  return prisma.category.createMany({ data: categories });
}

async function createSuppliers() {
  const suppliers = [];
  for (let i = 0; i < 50; i++) {
    suppliers.push({
      name: faker.company.name(),
      phoneNumber: faker.phone.number('+7 ### ###-##-##'),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: 'Россия',
    });
  }
  return prisma.supplier.createMany({ data: suppliers });
}

async function createEmployees() {
  const employees = [];
  for (let i = 0; i < 50; i++) {
    employees.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      position: faker.person.jobTitle(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('+7 ### ###-##-##'),
    });
  }
  return prisma.employee.createMany({ data: employees });
}

async function createStocks() {
  const stocks = [];
  for (let i = 0; i < 50; i++) {
    stocks.push({
      title: `Акция ${faker.commerce.productAdjective()}`,
      description: faker.commerce.productDescription(),
      discountPercentage: faker.number.int({ min: 5, max: 30 }),
    });
  }
  return prisma.stock.createMany({ data: stocks });
}

async function createDeliveryMethods() {
  const methods = [];
  for (let i = 0; i < 50; i++) {
    methods.push({
      title: randomFromArray(['Курьер', 'Почта', 'Самовывоз']),
      price: faker.number.float({ min: 100, max: 1500 }),
      deliveryTime: faker.number.int({ min: 1, max: 14 }),
    });
  }
  return prisma.deliveryMethod.createMany({ data: methods });
}

async function createPaymentMethods() {
  const methods = [];
  for (let i = 0; i < 50; i++) {
    methods.push({
      title: randomFromArray(['Наличные', 'Карта', 'Онлайн-кошелек']),
      desription: faker.finance.accountName(),
    });
  }
  return prisma.paymentMethod.createMany({ data: methods });
}

async function createShops() {
  const [locations, employees, stocks, deliveries, payments, suppliers] = await Promise.all([
    prisma.location.findMany(),
    prisma.employee.findMany(),
    prisma.stock.findMany(),
    prisma.deliveryMethod.findMany(),
    prisma.paymentMethod.findMany(),
    prisma.supplier.findMany(),
  ]);

  const shops = [];
  for (let i = 0; i < 50; i++) {
    shops.push({
      name: `Магазин ${faker.company.buzzAdjective()}`,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      launchedDate: faker.date.past({ years: 5 }).toISOString(),
      areaValue: faker.number.float({ min: 50, max: 1000 }),
      locationId: randomFromArray(locations).id,
      employees: { connect: [randomFromArray(employees)] },
      stocks: { connect: [randomFromArray(stocks)] },
      deliveryMethods: { connect: [randomFromArray(deliveries)] },
      paymentMeyhods: { connect: [randomFromArray(payments)] },
      suppliers: { connect: [randomFromArray(suppliers)] },
    });
  }
  return prisma.shop.createMany({ data: shops });
}

async function createProducts() {
  const [categories, shops] = await Promise.all([
    prisma.category.findMany(),
    prisma.shop.findMany(),
  ]);

  const products = [];
  for (let i = 0; i < 50; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 1000, max: 100000 }),
      costPrice: faker.commerce.price({ min: 500, max: 50000 }),
      brand: faker.company.name(),
      quantityInWarehouse: faker.number.int({ min: 10, max: 1000 }),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      categoryId: randomFromArray(categories).id,
      shops: { connect: [randomFromArray(shops)] },
    });
  }
  return prisma.product.createMany({ data: products });
}

async function createClients() {
  const shops = await prisma.shop.findMany();

  const clients = [];
  for (let i = 0; i < 50; i++) {
    clients.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('+7 ### ###-##-##'),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      registratedAt: faker.date.past({ years: 3 }).toISOString(),
      lastBuyDate: faker.date.recent({ days: 365 }).toISOString(),
      shops: { connect: [randomFromArray(shops)] },
    });
  }
  return prisma.client.createMany({ data: clients });
}

async function createSoldDates() {
  const dates = [];
  for (let i = 0; i < 50; i++) {
    const date = faker.date.between({ from: '2020-01-01', to: '2023-12-31' });
    dates.push({
      date: date.toISOString(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      quarter: Math.ceil((date.getMonth() + 1) / 3),
      week: faker.number.int({ min: 1, max: 52 }),
      dayOfWeek: faker.date.weekday(),
      isHoliday: faker.datatype.boolean(0.1),
      holidayName: randomFromArray(['Новый год', 'День Победы', 'День России']),
    });
  }
  return prisma.soldDate.createMany({ data: dates });
}

async function createSolds() {
  const [shops, dates] = await Promise.all([prisma.shop.findMany(), prisma.soldDate.findMany()]);

  const solds = [];
  for (let i = 0; i < 50; i++) {
    solds.push({
      totalPrice: faker.commerce.price({ min: 1000, max: 100000 }),
      soldCount: faker.number.int({ min: 1, max: 100 }),
      discountAmount: faker.commerce.price({ min: 100, max: 10000 }),
      costPrice: faker.commerce.price({ min: 500, max: 50000 }),
      taxAmount: faker.commerce.price({ min: 50, max: 5000 }),
      soldDateId: randomFromArray(dates).id,
      shopId: randomFromArray(shops).id,
    });
  }
  return prisma.sell.createMany({ data: solds });
}

async function createWarehouses() {
  const [products, shops] = await Promise.all([prisma.product.findMany(), prisma.shop.findMany()]);

  const warehouses = [];
  for (let i = 0; i < 50; i++) {
    warehouses.push({
      count: faker.number.int({ min: 10, max: 1000 }),
      lastDepositDate: faker.date.recent({ days: 180 }).toISOString(),
      products: { connect: [randomFromArray(products)] },
      shops: { connect: [randomFromArray(shops)] },
    });
  }
  return prisma.warehouse.createMany({ data: warehouses });
}

async function createFeedBacks() {
  const [products, clients] = await Promise.all([
    prisma.product.findMany(),
    prisma.client.findMany(),
  ]);

  const feedbacks = [];
  for (let i = 0; i < 50; i++) {
    feedbacks.push({
      Rating: faker.number.int({ min: 1, max: 5 }),
      comments: faker.lorem.sentence(),
      createdAt: faker.date.recent({ days: 365 }).toISOString(),
      productId: randomFromArray(products).id,
      clientId: randomFromArray(clients).id,
    });
  }
  return prisma.feedBack.createMany({ data: feedbacks });
}

async function createRefundReasons() {
  const products = await prisma.product.findMany();

  const reasons = [];
  for (let i = 0; i < 50; i++) {
    reasons.push({
      reasonTitle: randomFromArray([
        'Брак',
        'Не соответствует описанию',
        'Не подошел размер',
        'Проблемы с доставкой',
      ]),
      productId: randomFromArray(products).id,
    });
  }
  return prisma.refundReason.createMany({ data: reasons });
}

async function main() {
  await createLocations();
  await createCategories();
  await createSuppliers();
  await createEmployees();
  await createStocks();
  await createDeliveryMethods();
  await createPaymentMethods();
  await createShops();
  await createProducts();
  await createClients();
  await createSoldDates();
  await createSolds();
  await createWarehouses();
  await createFeedBacks();
  await createRefundReasons();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
