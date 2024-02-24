export type AttributeType = 'boolean' | 'string' | 'integer' | 'double' | 'date';

export type Attribute = {
  name: string;
  description: string;
  type: AttributeType
  capture?: boolean;
  archived?: boolean;
};