/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

// yup-extended.ts
import * as yup from "yup";
import { AnyObject, Maybe } from "yup/lib/types";

yup.addMethod<yup.StringSchema>(yup.string, "emptyAsUndefined", function () {
  return this.transform((value) => (value ? value : undefined));
});

yup.addMethod<yup.NumberSchema>(yup.number, "emptyAsUndefined", function () {
  return this.transform((value, originalValue) =>
    String(originalValue)?.trim() ? value : undefined
  );
});


declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): NumberSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    noWhitespace(): NumberSchema<TType, TContext>;
  }
}

export default yup;

