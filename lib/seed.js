import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

const prisma = new PrismaClient();

// Реальные данные для географии
const regions = [
  {
    region: 'Московская область',
    city: 'Москва',
    country: 'Россия',
    climate: 'Умеренно-континентальный',
    populationCount: 12692466,
  },
  {
    region: 'Краснодарский край',
    city: 'Сочи',
    country: 'Россия',
    climate: 'Субтропический',
    populationCount: 5247857,
  },
  {
    region: 'Ленинградская область',
    city: 'Санкт-Петербург',
    country: 'Россия',
    climate: 'Умеренно-морской',
    populationCount: 5383940,
  },
  {
    region: 'Свердловская область',
    city: 'Екатеринбург',
    country: 'Россия',
    climate: 'Континентальный',
    populationCount: 4363954,
  },
  {
    region: 'Новосибирская область',
    city: 'Новосибирск',
    country: 'Россия',
    climate: 'Континентальный',
    populationCount: 1612833,
  },
  {
    region: 'Республика Татарстан',
    city: 'Казань',
    country: 'Россия',
    climate: 'Умеренно-континентальный',
    populationCount: 1255000,
  },
  {
    region: 'Приморский край',
    city: 'Владивосток',
    country: 'Россия',
    climate: 'Муссонный',
    populationCount: 2006060,
  },
  {
    region: 'Республика Крым',
    city: 'Симферополь',
    country: 'Россия',
    climate: 'Средиземноморский',
    populationCount: 340000,
  },
  {
    region: 'Ростовская область',
    city: 'Ростов-на-Дону',
    country: 'Россия',
    climate: 'Умеренно-континентальный',
    populationCount: 1133684,
  },
  {
    region: 'Башкортостан',
    city: 'Уфа',
    country: 'Россия',
    climate: 'Континентальный',
    populationCount: 1167775,
  },
];

// Функция для форматирования даты в формате DD.MM.YYYY
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function getRandomInInterval(max = 0, min = 0) {
  return Math.random() * (max - min) + min;
}

async function main() {
  console.log('Очистка базы данных...');

  await prisma.sell.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.client.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.deliveryMethod.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.location.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.soldDate.deleteMany();
  await prisma.refundReason.deleteMany();
  await prisma.feedBack.deleteMany();

  console.log('Заполнение базы данных...');

  // Создание локаций
  await Promise.all(
    regions.map(region => {
      return prisma.location.create({
        data: {
          region: region.region,
          climate: region.climate,
          populationCount: faker.number.int({ min: 500000, max: 15000000 }),
        },
      });
    }),
  );

  // Создание магазинов
  await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];

      const location = await prisma.location.findUnique({
        where: {
          region: randomRegion.region,
        },
      });

      if (location) {
        return prisma.shop.create({
          data: {
            name: faker.company.name(),
            address: faker.location.streetAddress(),
            city: randomRegion.city,
            region: randomRegion.region,
            launchedDate: formatDate(faker.date.past()), // Форматируем дату
            closedDate: Math.random() < 0.5 ? formatDate(faker.date.future()) : null, // Форматируем дату
            areaValue: faker.number.float({ min: 100, max: 5000 }),
            location: {
              connect: { id: location.id },
            },
          },
        });
      }
    }),
  );

  // Создание категорий
  await Promise.all(
    Array.from({ length: 25 }).map(() => {
      const name = faker.commerce.department();
      return prisma.category.create({
        data: {
          name: name,
          description: `Описание категории: ${name}`,
        },
      });
    }),
  );

  const products = await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const product = faker.commerce;

      const categories = await prisma.category.findMany();
      const random = Math.floor(Math.random() * categories.length);

      return prisma.product.create({
        data: {
          name: product.product(),
          color: faker.color.human(),
          costPrice: parseInt(faker.finance.amount({ min: 1, max: product.price() })),
          price: parseInt(product.price()),
          createdAt: formatDate(faker.date.between({ from: '2000-01-01', to: '2025-01-01' })),
          quantityInWarehouse: getRandomInInterval(1000, 1),
          brand: faker.company.name(),
          category: { connect: categories[random] },
          description: product.productName(),
          isActive: Math.random() < 0.5,
          size: getRandomInInterval(10, 0.5).toString(),
          weight: parseInt(getRandomInInterval(1000, 1)),
        },
      });
    }),
  );

  // Создание клиентов
  const clients = await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];

      const shops = await prisma.shop.findMany();

      return prisma.client.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.number('+7 (###) ###-##-##'),
          address: faker.location.streetAddress(),
          city: randomRegion.city,
          region: randomRegion.region,
          country: 'Россия',
          index: faker.location.zipCode('######'),
          registratedAt: formatDate(faker.date.past()), // Используем форматированную дату
          lastBuyDate: formatDate(faker.date.recent()), // Используем форматированную дату
          shops: {
            connect: shops.slice(Math.floor(Math.random), Math.floor(Math.random() * shops.length)),
          },
        },
      });
    }),
  );

  // --- FEEDBACK ---
  for (let i = 0; i < 50; i++) {
    const randomProduct = faker.helpers.arrayElement(products);
    const randomClient = faker.helpers.arrayElement(clients);
    await prisma.feedBack.create({
      data: {
        Rating: faker.number.int({ min: 1, max: 5 }),
        comments: faker.lorem.sentences(2),
        createdAt: formatDate(faker.date.past()), // Форматируем дату
        productId: randomProduct.id,
        clientId: randomClient.id,
      },
    });
  }

  // Suppliers Создание поставщиков
  await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const shops = await prisma.shop.findMany();

      return prisma.supplier.create({
        data: {
          name: faker.company.name(),
          phoneNumber: faker.phone.number('+7 (###) ###-##-##'),
          email: faker.internet.email(),
          address: faker.location.streetAddress(),
          city: randomRegion.city,
          region: randomRegion.region,
          country: 'Россия',
          shops: {
            connect: shops.slice(Math.floor(Math.random), Math.floor(Math.random() * shops.length)),
          },
        },
      });
    }),
  );

  // Employees Создание сотрудников
  await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const shop = await prisma.shop.findMany();
      const random = Math.floor(Math.random() * shop.length);
      return prisma.employee.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          position: faker.person.jobTitle(),
          acceptDate: formatDate(faker.date.past()), // Форматируем дату
          terminationDate: Math.random() < 0.5 ? formatDate(faker.date.past()) : null, // Форматируем дату
          email: faker.internet.email(),
          phoneNumber: faker.phone.number('+7 (###) ###-##-##'),
          shop: { connect: shop[random] },
        },
      });
    }),
  );

  // Создание акций
  await Promise.all(
    Array.from({ length: 50 }).map(() => {
      return prisma.stock.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          startDate: formatDate(faker.date.past()), // Форматируем дату
          endDate: formatDate(faker.date.future()), // Форматируем дату
          discountPercentage: faker.number.float({ min: 5, max: 30 }),
          fixedDiscount: faker.number.float({ min: 100, max: 1000 }),
        },
      });
    }),
  );

  // Создание способов доставки
  await Promise.all(
    Array.from({ length: 50 }).map(() => {
      return prisma.deliveryMethod.create({
        data: {
          title: faker.company.name(),
          price: faker.number.float({ min: 200, max: 2000 }),
          deliveryTime: faker.number.int({ min: 1, max: 10 }),
        },
      });
    }),
  );

  // Создание способов оплаты
  await Promise.all(
    Array.from({ length: 50 }).map(() => {
      return prisma.paymentMethod.create({
        data: {
          title: faker.finance.transactionType(),
          desription: faker.commerce.productDescription(),
        },
      });
    }),
  );

  // --- SOLD DATE ---
  await Promise.all(
    Array.from({ length: 50 }).map(() => {
      const randomDate = faker.date.past(); // Генерируем случайную дату в прошлом
      const formattedDate = formatDate(randomDate); // Форматируем дату

      const dayOfWeekNumber = randomDate.getDay(); // Получаем номер дня недели (0 - воскресенье, 1 - понедельник и т.д.)

      // Преобразуем число дня недели в строку на русском языке
      const dayOfWeek = [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
      ][dayOfWeekNumber];

      return prisma.soldDate.create({
        data: {
          date: formattedDate, // Форматированная дата
          day: randomDate.getDate(),
          month: randomDate.getMonth() + 1,
          year: randomDate.getFullYear(),
          quarter: faker.number.int({ min: 1, max: 4 }),
          week: faker.number.int({ min: 1, max: 52 }),
          dayOfWeek: dayOfWeek, // Название дня недели на русском языке
          isHoliday: Math.random() < 0.5,
          holidayName: faker.lorem.words(2),
        },
      });
    }),
  );

  // Создание складов
  await Promise.all(
    Array.from({ length: 50 }).map(() => {
      return prisma.warehouse.create({
        data: {
          count: faker.number.int({ min: 50, max: 500 }),
          lastDepositDate: formatDate(faker.date.recent()), // Форматируем дату
        },
      });
    }),
  );

  console.log('Заполнение завершено!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
