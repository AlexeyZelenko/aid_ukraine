// constants/volunteers.ts
import type { Volunteer } from '../stores/volunteers'

export interface ExtendedVolunteer extends Volunteer {
  specializations?: string[]
  rating?: number
  experience?: number
  website?: string
  dataSource?: 'mock' | 'firebase'
}

export const MOCK_VOLUNTEERS: ExtendedVolunteer[] = [
  {
    id: '1',
    name: 'Фонд "Сила Доброти"',
    email: 'info@heart-ukraine.org',
    phone: '+38 (044) 234-56-78',
    organization: 'Благодійний фонд "Сила Доброти"',
    type: 'fund',
    description: 'Благодійний фонд, що займається допомогою переселенцям.',
    location: 'Черкаси',
    verified: true,
    createdAt: new Date('2024-01-10'),
    website: 'https://heart-ukraine.org',
    specializations: ['фінансова допомога', 'медикаменти', 'продукти харчування'],
    rating: 5,
    experience: 20
  },
  {
    id: '2',
    name: 'Центр реабілітації "Надія"',
    email: 'info@nadia-rehab.com',
    phone: '+38 (056) 456-78-90',
    organization: 'Центр реабілітації "Надія"',
    type: 'rehabilitation',
    description: 'Спеціалізований центр реабілітації для військових та цивільних. Фізична та психологічна реабілітація.',
    location: 'Медведівка',
    verified: true,
    createdAt: new Date('2024-01-08'),
    website: 'https://nadia-rehab.com',
    specializations: ['фізична реабілітація', 'психологічна допомога', 'медична реабілітація'],
    rating: 5
  },
  {
    id: '3',
    name: 'Блага вість',
    email: 'church.st.nicholas@email.com',
    phone: '+38 (067) 111-22-33',
    organization: 'Блага Вість',
    type: 'church',
    description: 'Церква, що організовує гуманітарну допомогу, підтримку переселенців, духовну підтримку та спільні заходи для громади.',
    location: 'Черкаси',
    verified: true,
    createdAt: new Date('2024-01-03'),
    website: 'https://st-nicholas-church.ua',
    specializations: ['гуманітарна допомога', 'підтримка переселенців', 'духовна підтримка', 'соціальні заходи'],
    rating: 5
  },
  {
    id: '4',
    name: 'Ірина Сидоренко',
    email: 'irina.sydorenko@email.com',
    phone: '+38 (093) 567-89-01',
    organization: 'Психолог-волонтер',
    type: 'volunteer',
    description: 'Практикуючий психолог. Надаю безкоштовні консультації для людей, що пережили травму війни.',
    location: 'Одеса',
    verified: true,
    createdAt: new Date('2024-01-14'),
    specializations: ['психологічна підтримка', 'травма війни', 'консультації'],
    rating: 5,
    experience: 8
  },
  {
    id: '5',
    name: 'Віктор Мельник',
    email: 'viktor.melnyk@email.com',
    phone: '+38 (095) 789-01-23',
    organization: 'IT-волонтер',
    type: 'volunteer',
    description: 'IT-спеціаліст. Допомагаю з налаштуванням комп\'ютерів, навчанням цифровій грамотності.',
    location: 'Харків',
    verified: true,
    createdAt: new Date('2024-01-13'),
    specializations: ['IT-підтримка', 'цифрова грамотність', 'налаштування техніки'],
    rating: 4,
    experience: 5
  },
  {
    id: '6',
    name: 'Анна Шевченко',
    email: 'anna.shevchenko@email.com',
    phone: '+38 (096) 890-12-34',
    organization: 'Юрист-волонтер',
    type: 'volunteer',
    description: 'Юрист з досвідом роботи в сфері соціального права. Надаю безкоштовні юридичні консультації.',
    location: 'Київ',
    verified: true,
    createdAt: new Date('2024-01-09'),
    specializations: ['юридичні консультації', 'соціальне право', 'документообіг'],
    rating: 5,
    experience: 12
  }
]

export const VOLUNTEER_TYPES = [
  {
    id: 'volunteer',
    icon: 'fas fa-heart',
    bgColor: 'bg-ukraine-blue',
    textColor: 'text-white',
    titleKey: 'volunteers.types.volunteer',
    description: 'Індивідуальні волонтери, готові допомагати у різних сферах'
  },
  {
    id: 'fund',
    icon: 'fas fa-building',
    bgColor: 'bg-ukraine-yellow',
    textColor: 'text-ukraine-blue',
    titleKey: 'volunteers.types.fund',
    description: 'Благодійні фонди та організації'
  },
  {
    id: 'rehabilitation',
    icon: 'fas fa-hospital',
    bgColor: 'bg-ukraine-blue',
    textColor: 'text-white',
    titleKey: 'volunteers.types.rehabilitation',
    description: 'Центри реабілітації та медичні заклади'
  },
  {
    id: 'church',
    icon: 'fas fa-church',
    bgColor: 'bg-purple-200',
    textColor: 'text-purple-700',
    titleKey: 'volunteers.types.church',
    description: 'Релігійні громади, церкви, парафії, що допомагають людям'
  }
] as const

export const TYPE_COLORS = {
  volunteer: 'bg-blue-100 text-blue-800',
  fund: 'bg-yellow-100 text-yellow-800',
  rehabilitation: 'bg-green-100 text-green-800',
  church: 'bg-purple-100 text-purple-800'
} as const