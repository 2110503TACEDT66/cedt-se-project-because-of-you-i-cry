export interface HospitalItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
  price: number | 0;
  rating: number | 0;
}

export interface HospitalJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: HospitalItem[];
}

export interface HospitalDetail {
  success: boolean;
  data: HospitalItem;
}

export interface BookingItem {
  _id: string;
  apptDate: string;
  user: string;
  campground: {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    region: string;
    postalcode: string;
    tel: string;
    url: string;
    id: string;
    price: number;
  };
  createdAt: string;
}

export interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

export interface BookingOneJson {
  success: boolean;
  data: BookingItem;
}

export interface CreateBookingItem {
  apptDate: string;
  user: string;
  campground: string;
}

/*-------------------------------------------------------*/

export interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  region: string;
  postalcode: string;
  tel: string;
  url: string;
  maxReservations: number;
  coverpicture: string;
  picture: string[];
  description: string;
  price: number;
  rating: number;
  id: string;
}

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}

export interface UserJson {
  success: boolean;
  data: {
    _id: string;
    name: string;
    tel: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
  };
}
