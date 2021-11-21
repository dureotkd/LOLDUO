import { ThemeType } from '../../theme';
/**
 * get icon name to be used based on checked state
 *
 * @param checked
 */
export declare const getIconName: (checked?: boolean) => "radio-button-checked" | "radio-button-unchecked";
/**
 * get icon color based on state
 *
 * @param checked
 * @param disabled
 */
export declare const getIconColor: (checked: any, disabled: any, activeColor: any, inactiveColor: any, theme: ThemeType) => string;
