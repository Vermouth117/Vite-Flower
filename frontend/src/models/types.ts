import { RefObject } from "react";

export type FlowerInfo = {
  id: number;
  name: string;
  price: string;
  pictureUrl: string;
};

export type ModalProps = {
  inputTriggerRef: RefObject<HTMLInputElement>;
  flowerInfo: FlowerInfo | undefined;
};

export type OrderFlowerInfo = {
  id: number;
  flowerId: number;
  flowerName: string;
  customerName: string;
  price: string;
  quantity: number;
  date: string;
  pictureUrl: string;
  cart: boolean;
};
