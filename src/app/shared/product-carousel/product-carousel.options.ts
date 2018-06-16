export interface ProductCarouselOptions {
  selector: string;
  duration?: number;
  easing?: string;
  perPage?: any;
  startIndex?: number;
  draggable?: boolean;
  threshold?: number;
  loop?: boolean;
  onInit?: Function;
  onChange?: Function;
}