import React from 'react';
import { ThemeContext, ThemeType } from '../theme';
import { DefaultProps, VariantPropsType } from '../types';
export declare function withDefaultProps<Props extends object, Defaults extends DefaultProps<Props> = {}>(WrappedComponent: React.ComponentClass<Props & Defaults>, componentName: keyof NonNullable<ThemeType['components']>, defaultProps: Defaults): {
    new (props: (Props & VariantPropsType) | Readonly<Props & VariantPropsType>): {
        context: React.ContextType<typeof ThemeContext>;
        render(): JSX.Element | (Defaults & Readonly<Props & VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>);
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props & VariantPropsType>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Props & VariantPropsType>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & VariantPropsType>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props & VariantPropsType>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & VariantPropsType>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & VariantPropsType>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Props & VariantPropsType, context: any): {
        context: React.ContextType<typeof ThemeContext>;
        render(): JSX.Element | (Defaults & Readonly<Props & VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>);
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props & VariantPropsType>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Props & VariantPropsType>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & VariantPropsType>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props & VariantPropsType>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & VariantPropsType>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & VariantPropsType>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType: React.Context<import("../theme/theme.context").ThemeContextType>;
};
