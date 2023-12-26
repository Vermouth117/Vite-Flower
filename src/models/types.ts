import { RefObject } from "react";

export type FlowerInfo = {
  id: number;
  picture_url: string;
  name: string;
  price: string;
};

export type ModalProps = {
  inputTriggerRef: RefObject<HTMLInputElement>;
  flowerInfo: FlowerInfo | undefined;
};
