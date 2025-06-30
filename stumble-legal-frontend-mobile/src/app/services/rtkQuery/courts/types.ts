export type CourtsResponse = {
  data: Courts[];
  total: number;
};

export type Courts = {
  uuid: string;
  name: string;
  types: string[];
  level: string;
  location: [Nullable<number>, Nullable<number>];
  distance: number;
  visitorsQt: number;
  isCheckedIn: boolean;
};

export type CourtsRequest = {
  types?: string[] | null;
  levels?: string[] | null;
  latitude?: number;
  longitude?: number;
  search?: string | null;
};

export type VisitorsResponse = {
  data: Visitors[];
  total: number;
};

export type Visitors = {
  uuid: string;
  fullName: string;
  photoKeys: string[];
  inCourt: boolean;
  checkInDttm: string;
  scheduleStartDttm: string;
  scheduleEndDttm: string;
};
