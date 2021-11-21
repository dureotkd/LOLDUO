import { ThemeType } from '../theme';
import { DefaultProps, VariantPropsType } from '../types';
export declare const useDefaultProps: <Props extends object>(componentName: keyof NonNullable<ThemeType['components']> | null, props: Props & VariantPropsType, defaultProps: DefaultProps<Props>) => Props & Required<DefaultProps<Props>>;
