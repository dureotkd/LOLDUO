import * as React from 'react';
export declare const WINDOW_WIDTH: number;
export declare const WINDOW_HEIGHT: number;
export declare const isEmptyArray: (value?: any) => boolean;
export declare const isFunction: (obj: any) => obj is Function;
export declare const isObject: (obj: any) => obj is Object;
export declare const isInteger: (obj: any) => boolean;
export declare const isString: (obj: any) => obj is string;
export declare const isNaN: (obj: any) => boolean;
export declare const isEmptyChildren: (children: any) => boolean;
export declare const isPromise: (value: any) => value is PromiseLike<any>;
export declare const isInputEvent: (value: any) => value is React.SyntheticEvent<any, Event>;
/**
 * useState with callback
 *
 * @param initialState
 */
export declare const useStateCallback: (initialState: any) => any[];
export declare const isValidColor: (color: string) => boolean;
export declare const getSpecificProps: <T extends object>(obj: T, ...keys: string[]) => {};
export declare const removeSpecificProps: <T extends object>(obj: T, ...keys: string[]) => T;
