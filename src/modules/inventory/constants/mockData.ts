import type { Project, Unit, Builder } from '../types';

export const mockBuilders: Builder[] = [
  { id: 'b1', name: 'Skyline Developers', logo: 'https://i.pravatar.cc/150?u=skyline', description: 'Leading luxury developer', established: 1995 },
  { id: 'b2', name: 'Apex Group', logo: 'https://i.pravatar.cc/150?u=apex', description: 'Premium residential builder', established: 2002 },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Skyline Residences',
    builderId: 'b1',
    rera: 'PRM/MH/RERA/1251/310',
    location: 'Downtown Boulevard',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80',
    priceRange: '$450k - $800k',
    availableUnits: 45,
    totalUnits: 120,
  },
  {
    id: 'p2',
    name: 'Apex Horizon',
    builderId: 'b2',
    rera: 'PRM/MH/RERA/654321',
    location: 'Westside Avenue',
    status: 'New Launch',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&q=80',
    priceRange: '$300k - $550k',
    availableUnits: 80,
    totalUnits: 200,
  }
];

export const mockUnits: Unit[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `u${i}`,
  projectId: 'p1',
  towerId: 't1',
  floor: Math.floor(i / 5).toString(),
  number: `40${(i % 5) + 1}`,
  facing: ['North', 'East', 'South', 'West'][i % 4],
  area: 1200 + (i * 10),
  type: i % 2 === 0 ? '2 BHK' : '3 BHK',
  status: ['Available', 'Available', 'Held', 'Sold', 'Blocked'][i % 5] as any,
  basePrice: 450000 + (i * 5000),
  plc: 15000,
  maintenance: 5000,
  clubCharges: 10000,
  parking: 20000,
  commissionPercent: 2.5,
}));
