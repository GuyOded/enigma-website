import { MathJax } from "better-react-mathjax";

export const InlineMath = ({ math }: { math: string }) => (
    <MathJax inline>{String.raw`\(${math}\)`}</MathJax>
);

export const BlockMath = ({ math }: { math: string }) => (
    <MathJax>{String.raw`\[${math}\]`}</MathJax>
);
