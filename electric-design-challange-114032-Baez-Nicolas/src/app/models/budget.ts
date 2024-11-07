export interface Budget {
  id?: string;
  date: string;
  client: string;
  modules: Module[];
}

export interface Module {
  moduleTypeId: string;
  price: number;
  slots: number;
  zone: Zone;
  quantity: number;
}

export enum Zone {
  LIVING = 'Living',
  COMEDOR = 'Comedor',
  KITCHEN = 'Cocina',
  ROOM = 'Dormitorio'
}

export interface ModuleType {
  id: number;
  name: string;
  slots: number;
  price: number;
}