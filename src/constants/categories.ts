import {
  BriefcaseBusiness,
  BusFront,
  CircleEllipsis,
  Film,
  HeartPulse,
  House,
  ShoppingBag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { OperationType } from './operation-types';

export const BASE_CATEGORIES = [
  { id: 'x7k2', label: 'Зарплата', type: 'income', icon: BriefcaseBusiness },
  { id: 'b3qw', label: 'Еда', type: 'expense', icon: ShoppingBag },
  { id: 'n6ht', label: 'Транспорт', type: 'expense', icon: BusFront },
  { id: 'r4vz', label: 'Жилье', type: 'expense', icon: House },
  { id: 'c8yd', label: 'Здоровье', type: 'expense', icon: HeartPulse },
  { id: 'j1ls', label: 'Развлечения', type: 'expense', icon: Film },
  { id: 'g5ek', label: 'Другое', type: 'expense', icon: CircleEllipsis },
] as const satisfies { id: string; label: string; type: OperationType; icon: LucideIcon }[];
