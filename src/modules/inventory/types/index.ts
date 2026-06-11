export type ProjectStatus = 'Under Construction' | 'Ready to Move' | 'New Launch';
export type UnitStatus = 'Available' | 'Held' | 'Reserved' | 'Blocked' | 'Sold';

export interface Builder {
  id: string;
  name: string;
  logo: string;
  description: string;
  established: number;
}

export interface Project {
  id: string;
  name: string;
  builderId: string;
  rera: string;
  location: string;
  status: ProjectStatus;
  image: string;
  priceRange: string;
  availableUnits: number;
  totalUnits: number;
}

export interface Unit {
  id: string;
  projectId: string;
  towerId: string;
  floor: string;
  number: string;
  facing: string;
  area: number;
  type: string;
  status: UnitStatus;
  basePrice: number;
  plc: number;
  maintenance: number;
  clubCharges: number;
  parking: number;
  commissionPercent: number;
}
