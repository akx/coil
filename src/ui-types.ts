import { GVar } from './types';

export type GVarModifyHandler = (gvar: GVar, key: keyof GVar, value: any) => void;

export type GVarDeleteHandler = (gvar: GVar) => void;

export type GVarValueChangeHandler = (gvar: GVar, value: any) => void;
