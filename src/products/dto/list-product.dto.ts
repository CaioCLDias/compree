export class ListProductDTO {
  constructor(
    readonly id: string,
    readonly name: string, 
    readonly characteristics: ListProductCharacteristicDTO[],
    readonly imagens: ListProductImageDTO[], 
  ) {}
}

export class ListProductCharacteristicDTO {
  name: string;
  description: string;
}

export class ListProductImageDTO {
  url: string;
  description: string;
}