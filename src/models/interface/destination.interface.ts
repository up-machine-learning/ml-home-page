export interface IDestination {
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
  reviews: IReview[];
}

export interface IReview {
  reviewId: number;
  headImage: string;
  username: string;
  createTime: number;
  comment: string;
  userRating: string;
  predictedSentiment: string;
}
