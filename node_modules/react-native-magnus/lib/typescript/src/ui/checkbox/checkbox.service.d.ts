import { ThemeType } from '../..//theme';
import { CheckboxProps } from './checkbox.type';
/**
 * get icon name based on state
 */
export declare const getIconName: (checked?: boolean, disabled?: boolean) => "indeterminate-check-box" | "check-box" | "check-box-outline-blank";
/**
 * get icon name
 *
 * @param checked
 * @param disabled
 */
export declare const getIconColor: (checked: any, disabled: any, activeColor: any, inactiveColor: any, theme: ThemeType) => string;
export declare const getIcon: (theme: ThemeType, props: CheckboxProps, checked: boolean) => {} | null | undefined;
