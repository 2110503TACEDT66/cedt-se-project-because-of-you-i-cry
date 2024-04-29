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
    maxReservations: number;
    coverpicture: string;
    picture: string[];
    description: string;
    price: number;
    rating: number;
    id: string;
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
  comments: string[];
  reservation: ReservationItem[];
  id: string;
  tagsID: string[];
  tagsName: string[];
}

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}

export interface ReservationItem {
  id: string;
  apptDate: Date;
  user: string;
  campground: string;
  createdAt: Date;
}
export interface CommentItem {
  _id: string;
  campground_id: string;
  user_id: User;
  text: string;
  user_rating: number;
}

export interface Comments {
  success: boolean;
  count: number;
  data: CommentItem[];
}

export interface User {
  _id: string;
  name: string;
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

export interface Tag {
  _id: string;
  name: string;
}
export interface TagJson {
  success: boolean;
  tags: Tag[];
}
