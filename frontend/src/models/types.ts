import { RefObject } from "react";

export type FlowerInfo = {
  id: number;
  pictureUrl: string;
  name: string;
  price: string;
};

export type ModalProps = {
  inputTriggerRef: RefObject<HTMLInputElement>;
  flowerInfo: FlowerInfo | undefined;
};

export type OrderFlowerInfo = {
  flowerId: number;
  flowerName: string;
  customerName: string;
  pictureUrl: string;
  price: string;
  quantity: number;
  date: string;
};
