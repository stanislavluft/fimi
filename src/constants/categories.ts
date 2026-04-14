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
  { id: 'x7k2', label: 'Salary', type: 'income', icon: BriefcaseBusiness },
  { id: 'b3qw', label: 'Food', type: 'expense', icon: ShoppingBag },
  { id: 'n6ht', label: 'Transport', type: 'expense', icon: BusFront },
  { id: 'r4vz', label: 'Housing', type: 'expense', icon: House },
  { id: 'c8yd', label: 'Health', type: 'expense', icon: HeartPulse },
  { id: 'j1ls', label: 'Entertainment', type: 'expense', icon: Film },
  { id: 'g5ek', label: 'Other', type: 'expense', icon: CircleEllipsis },
] as const satisfies { id: string; label: string; type: OperationType; icon: LucideIcon }[];
