export interface ISuggestion {
  optionOne: IOption[];
  optionTwo: IOption[];
  optionThree: IOption[];
}

export interface IOption {
  id: number;
  code: number;
  name: string;
  price: string;
  type: string;
  districtName: string;
  rating: string;
  reviewCount: number;
  gglat: string;
  gglon: string;
  imageUrl: string;
  url: string;
  tags: string[];
  reviews: Review[];
}

interface Review {
  reviewId: number;
  headImage: string;
  username: string;
  createTime: number;
  comment: string;
  userRating: string;
}
