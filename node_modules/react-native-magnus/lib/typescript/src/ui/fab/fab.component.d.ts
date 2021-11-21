import * as React from 'react';
import { FabProps } from './fab.type';
declare const Fab: {
    new (props: (FabProps & import("../../types").VariantPropsType) | Readonly<FabProps & import("../../types").VariantPropsType>): {
        context: import("../../theme/theme.context").ThemeContextType;
        render(): JSX.Element | (Readonly<FabProps & import("../../types").VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>);
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<FabProps & import("../../types").VariantPropsType>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<FabProps & import("../../types").VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<FabProps & import("../../types").VariantPropsType>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<FabProps & import("../../types").VariantPropsType>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: FabProps & import("../../types").VariantPropsType, context: any): {
        context: import("../../theme/theme.context").ThemeContextType;
        render(): JSX.Element | (Readonly<FabProps & import("../../types").VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>);
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<FabProps & import("../../types").VariantPropsType>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<FabProps & import("../../types").VariantPropsType> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<FabProps & import("../../types").VariantPropsType>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<FabProps & import("../../types").VariantPropsType>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<FabProps & import("../../types").VariantPropsType>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType: React.Context<import("../../theme/theme.context").ThemeContextType>;
};
export { Fab };
