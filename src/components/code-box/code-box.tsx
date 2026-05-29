import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export interface CodeBoxProps {
    readonly code: string;
}

export default function CodeBox({ code }: CodeBoxProps) {
    async function copy() {
        await navigator.clipboard.writeText(code);
        message.success("Copied");
    }

    return (
        <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-3">
            {/* scrollable code container */}
            <div className="flex-1 min-w-0 overflow-x-auto">
                <pre className="m-0 whitespace-nowrap">
                    <code className="font-mono text-white">{code}</code>
                </pre>
            </div>

            {/* copy button */}
            <Button
                type="text"
                icon={<CopyOutlined />}
                onClick={() => void copy()}
                className="!text-white hover:!text-white hover:!bg-zinc-700 shrink-0"
            />
        </div>
    );
}
