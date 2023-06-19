import { Column } from './columns';

// A Prisma block level element
export type BlockType = 'model' | 'enum';
export type ModelBlock = {
  name: string,
  type: 'model'
  asView: boolean,
  columns: Column[];
}

export type EnumBlock = {
  name: string;
  type: 'enum'
  columns: Column<'EnumKey' | 'Comment'>[];
}

export type Block = EnumBlock | ModelBlock

export type Model = ModelBlock
export type Enum = EnumBlock

export function isEnum(block: Block): block is EnumBlock {
  return block.type == 'enum';
}

export function isModel(block: Block): block is ModelBlock {
  return block.type == 'model';
}
