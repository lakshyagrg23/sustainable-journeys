declare module "qs" {
  export type ParsedQs = Record<string, unknown>;

  export function parse(
    str: string,
    options?: Record<string, unknown>
  ): ParsedQs;

  export function stringify(
    obj: unknown,
    options?: Record<string, unknown>
  ): string;

  const qs: {
    parse: typeof parse;
    stringify: typeof stringify;
  };

  export default qs;
}
