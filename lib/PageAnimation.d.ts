export interface PageAnimationProps {
    children: any;
    grid: RegExp[][];
    timeout: number;
    classExtension: string;
    className?: string;
    animate?: boolean;
    bias?: "vertical" | "horizontal";
}
declare function PageAnimation({ children, grid, timeout, classExtension, animate, className, bias, }: PageAnimationProps): any;
export default PageAnimation;
