export interface RawData {
  fileName: string;
  encoding: string;
  data: string | Array<Array<string>>;
}

export interface Mapping {
  fileName: string;
  columns: Record<string, string>;
}

export interface Transformations {
  fileName: string;
  rules: Record<string, string>;
}
