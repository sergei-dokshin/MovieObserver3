import { PrismaClient } from '@prisma/client';

const events = [
  {
    name: 'DJ Practice Session',
    slug: 'dj-practice-session',
    city: 'Moskva',
    location: 'Moscow Music Hall',
    date: new Date('2030-10-12T00:00:00.000Z'),
    organizerName: 'DJ Inc.',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Присоединяйтесь к нашей захватывающей практике для диджеев на мастер-классе DJ Beats! Независимо от того, начинающий вы диджей или опытный профессионал, это мероприятие создано специально для вас. Погрузитесь в мир битов, миксов и электронных ритмов под руководством опытных диджеев и музыкальных продюсеров. Продемонстрируйте свои навыки во время сессии открытых дек. Делитесь любимыми треками, экспериментируйте с живым сведением и получайте аплодисменты и обратную связь от поддерживающей аудитории.'
  },
  {
    name: 'Harmony Festival',
    slug: 'harmony-festival',
    city: 'Moskva',
    location: 'Moscow Convention Center',
    date: new Date('2030-11-15T00:00:00.000Z'),
    organizerName: 'Music Enthusiasts LLC',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Фестиваль Harmony - это праздник всех музыкальных жанров, объединяющий музыкантов, художников и меломанов со всего мира. Насладитесь днем, наполненным живыми выступлениями, интерактивными мастер-классами и яркой атмосферой творчества и гармонии. Присоединяйтесь к нам в этом незабываемом музыкальном путешествии!'
  },
  {
    name: '3D Animation Workshop',
    slug: '3d-animation-workshop',
    city: 'Moskva',
    location: 'Moscow Convention Center',
    date: new Date('2030-12-08T00:00:00.000Z'),
    organizerName: '3D Animators Inc.',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Погрузитесь в захватывающий мир 3D-анимации на нашем эксклюзивном мастер-классе! Независимо от того, начинающий вы аниматор, студент или профессионал, это мероприятие предоставляет уникальную возможность учиться у экспертов индустрии и повысить свое мастерство в анимации.'
  },
  {
    name: 'Rock the City Concert',
    slug: 'rock-the-city-concert',
    city: 'Moskva',
    location: 'Moscow Music Hall',
    date: new Date('2030-11-18T00:00:00.000Z'),
    organizerName: 'Rock On Productions',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Приготовьтесь к мощному рок-концерту Rock the City! Насладитесь зажигательными выступлениями лучших рок-групп, энергичной музыкой и окунитесь в незабываемую ночь чистого рок-н-ролла.'
  },
  {
    name: 'Artisan Craft Fair',
    slug: 'artisan-craft-fair',
    city: 'Krasnodar',
    location: 'Krasnodar Exhibition Center',
    date: new Date('2030-12-01T00:00:00.000Z'),
    organizerName: 'Craftsmanship Guild',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Откройте для себя уникальные изделия ручной работы на Ярмарке ремесел. Встретьтесь с талантливыми мастерами, приобретите эксклюзивные вещи и поддержите местных умельцев. Присоединяйтесь к нам на день творчества и мастерства.'
  },
  {
    name: 'Jazz Fusion Night',
    slug: 'jazz-fusion-night',
    city: 'Moskva',
    location: 'Moscow Jazz Lounge',
    date: new Date('2030-11-29T00:00:00.000Z'),
    organizerName: 'Groove Masters Productions',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Насладитесь плавными мелодиями и ритмичными битами джаз-фьюжна на Jazz Fusion Night. Окунитесь в мир высококлассных джазовых выступлений, вкусных коктейлей и душевной атмосферы живого джаза.'
  },
  {
    name: 'Indie Music Showcase',
    slug: 'indie-music-showcase',
    city: 'Moskva',
    location: 'Moscow Indie Spot',
    date: new Date('2030-11-25T00:00:00.000Z'),
    organizerName: 'Indie Vibes Records',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Откройте для себя новых звезд инди-сцены на Indie Music Showcase. Насладитесь живыми выступлениями молодых талантов, поддержите независимую музыку и станьте частью яркого сообщества меломанов и артистов.'
  },
  {
    name: 'Global Food Festival',
    slug: 'global-food-festival',
    city: 'Krasnodar',
    location: 'Krasnodar Waterfront Park',
    date: new Date('2030-10-30T00:00:00.000Z'),
    organizerName: 'Foodie Ventures Inc.',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Отправьтесь в кулинарное путешествие по миру на Фестивале Global Food. Порадуйте свои вкусовые рецепторы блюдами международной кухни, кулинарными демонстрациями и дегустациями. Испытайте вкусы разных культур в одном вкусном мероприятии.'
  },
  {
    name: 'Tech Innovators Summit',
    slug: 'tech-innovators-summit',
    city: 'Krasnodar',
    location: 'Krasnodar Convention Center',
    date: new Date('2030-11-15T00:00:00.000Z'),
    organizerName: 'InnovateTech Inc.',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Саммит Tech Innovators - это место встречи визионеров, предпринимателей и энтузиастов технологий. Исследуйте последние технологические достижения, посетите выступления лидеров отрасли и примите участие в практических мастер-классах. Общайтесь с новаторами, презентуйте свои идеи и станьте частью формирования будущего технологий.'
  },
  {
    name: 'Enchanted Garden Gala',
    slug: 'enchanted-garden-gala',
    city: 'Moskva',
    location: 'Moscow Museum of Art',
    date: new Date('2030-12-02T00:00:00.000Z'),
    organizerName: 'Cultural Garden Society',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Окунитесь в мир чудес на гала-вечере Enchanted Garden, волшебном вечере искусства, музыки и фантазии. Исследуйте поразительные садовые инсталляции, насладитесь выступлениями мировых музыкантов и танцоров и попробуйте изысканные деликатесы. Оденьтесь в ваш самый элегантный наряд и погрузитесь в ночь очарования.'
  },
  {
    name: 'Comedy Extravaganza',
    slug: 'comedy-extravaganza',
    city: 'Moskva',
    location: 'Moscow Laugh Factory',
    date: new Date('2030-11-06T00:00:00.000Z'),
    organizerName: 'Laugh Productions',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Приготовьтесь к ночи смеха с лучшими комиками со всего мира. Насладитесь стендапом, импровизацией и скетчами, которые заставят вас смеяться до слез!'
  },
  {
    name: 'Science and Space Expo',
    slug: 'science-space-expo',
    city: 'Krasnodar',
    location: 'Krasnodar Science Center',
    date: new Date('2030-10-29T00:00:00.000Z'),
    organizerName: 'Cosmic Explorers Society',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Исследуйте чудеса науки и космоса на этой интерактивной выставке. Участвуйте в практических экспериментах, встречайтесь с учеными и узнавайте о тайнах вселенной.'
  },
  {
    name: 'Fashion Runway',
    slug: 'fashion-runway',
    city: 'Moskva',
    location: 'Moscow Fashion Week Venue',
    date: new Date('2030-11-12T00:00:00.000Z'),
    organizerName: 'Chic Trends Agency',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Станьте свидетелем последних тенденций на подиуме. Ведущие дизайнеры представят свои коллекции, задавая курс будущему моды.'
  },
  {
    name: 'Culinary Masterclass',
    slug: 'culinary-masterclass',
    city: 'Krasnodar',
    location: 'Krasnodar Epicurean Institute',
    date: new Date('2030-12-02T00:00:00.000Z'),
    organizerName: 'Gourmet Chefs Society',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Присоединяйтесь к известным шеф-поварам в кулинарном путешествии. Осваивайте кулинарные техники, пробуйте изысканные блюда и повышайте свое мастерство в искусстве гастрономии.'
  },
  {
    name: 'Film Buffs Symposium',
    slug: 'film-buffs-symposium',
    city: 'Moskva',
    location: 'Moscow Film Institute',
    date: new Date('2030-11-08T00:00:00.000Z'),
    organizerName: 'Cinema Society',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Собрание для киноэнтузиастов! Смотрите классические фильмы, участвуйте в обсуждениях с кинематографистами и получайте идеи из мира кино.'
  },
  {
    name: 'Literary Salon',
    slug: 'literary-salon',
    city: 'Krasnodar',
    location: 'Krasnodar & Co. Bookstore',
    date: new Date('2030-12-15T00:00:00.000Z'),
    organizerName: 'Words Society',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Отпразднуйте силу слова на этом литературном собрании. Слушайте как признанные авторы читают свои произведения, участвуйте в обсуждениях книг и окунитесь с головой в магию мира литературы.'
  },
  {
    name: 'Wellness Expo',
    slug: 'wellness-expo',
    city: 'Moskva',
    location: 'Moscow Convention Center',
    date: new Date('2030-11-30T00:00:00.000Z'),
    organizerName: 'Wellness Warriors Inc.',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Погрузитесь в мир фитнеса и благополучия. Посещайте фитнес мастер-классы, узнавайте о питании и исследуйте современные подходы к здоровью.'
  },
  {
    name: 'Digital Art Symposium',
    slug: 'digital-art-symposium',
    city: 'Krasnodar',
    location: 'Krasnodar Art Gallery',
    date: new Date('2030-11-01T00:00:00.000Z'),
    organizerName: 'Tech Creatives Collective',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Откройте для себя пересечение технологий и искусства. Опыт digital арт-инсталляций, посещайте VR мастер-классы и встречайтесь с digital художниками, расширяющими границы творчества.'
  },
  {
    name: 'Dance Fusion Festival',
    slug: 'dance-fusion-festival',
    city: 'Moskva',
    location: 'Moscow Street Dance Studio',
    date: new Date('2030-11-28T00:00:00.000Z'),
    organizerName: 'Rhythm Revolution',
    imageUrl:
      'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
    description:
      'Испытайте смешение танцевальных стилей со всего мира. Участвуйте в танцевальных мастер-классах, наблюдайте за выступлениями и танцуйте всю ночь напролет.'
  }
];

const prisma = new PrismaClient();

const main = async () => {
  console.log('Start seeding...');

  for (const event of events) {
    await prisma.event.create({
      data: event
    });
  }

  console.log('Seeding finished.');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
