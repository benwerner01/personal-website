import { CodeProject, CODE_PROJECTS } from './code';

export type WorkVariant = 'code'

export const WORK_VARIANTS: WorkVariant[] = ['code'];

type WorkVariantPalette = {
  [variant: string]: string;
}

export const WORK_VARIANT_PALETTE: WorkVariantPalette = {
  code: '#0398fc',
};

export const tbdIsWorkVariant = (tbd: string): tbd is WorkVariant => (
  WORK_VARIANTS.includes(tbd as WorkVariant)
);

export type WorkItem = CodeProject

export const WORK_ITEMS: WorkItem[] = [
  ...CODE_PROJECTS,
];
