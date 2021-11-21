import React from 'react';
import { StatusBarProps as RNStatusBarProps } from 'react-native';
import { VariantPropsType } from '../../types';
interface StatusBarComponent<T> extends React.FC<T> {
    currentHeight?: number;
}
declare const StatusBar: StatusBarComponent<RNStatusBarProps & VariantPropsType>;
export { StatusBar };
