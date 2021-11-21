import * as React from 'react';
import { TooltipProps, TooltipRef } from './tooltip.type';
declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & {
    children?: React.ReactNode;
} & React.RefAttributes<TooltipRef>>;
export { Tooltip };
