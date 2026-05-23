import { Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import {
    FullscreenExitOutlined,
    FullscreenOutlined,
    PlayCircleFilled,
} from "@ant-design/icons";

interface UnitLoaderProps {
    buildDataBasePath: string;
}

export const UnityLoader = ({ buildDataBasePath }: UnitLoaderProps) => {
    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: `${buildDataBasePath}/build.loader.js`,
        dataUrl: `${buildDataBasePath}/build.data`,
        frameworkUrl: `${buildDataBasePath}/build.framework.js`,
        codeUrl: `${buildDataBasePath}/build.wasm`,
    });
    const [started, setStarted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement === containerRef.current,
            );
        };

        document.addEventListener("fullscreenchange", onFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                onFullscreenChange,
            );
        };
    }, []);

    const toggleFullscreen = async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await containerRef.current?.requestFullscreen();
        }
    };

    const loadingPercentage = Math.round(loadingProgression * 100);

    return (
        <div className="w-full h-[70vh] min-h-[500px] flex items-center justify-center p-6">
            <div
                ref={containerRef}
                className="relative w-full h-full max-w-6xl rounded-xl overflow-hidden bg-black flex items-center justify-center"
            >
                {started && isLoaded && (
                    <button
                        onClick={() => {
                            void toggleFullscreen();
                        }}
                        className="
                                absolute bottom-4 right-4 z-30
                                w-12 h-12 rounded-xl
                                bg-white/90 hover:bg-white
                                backdrop-blur-sm
                                flex items-center justify-center
                                transition-all duration-200
                                shadow-xl
                            "
                    >
                        {isFullscreen ? (
                            <FullscreenExitOutlined
                                style={{ fontSize: 22, color: "black" }}
                            />
                        ) : (
                            <FullscreenOutlined
                                style={{ fontSize: 22, color: "black" }}
                            />
                        )}
                    </button>
                )}

                {started ? (
                    <>
                        {!isLoaded && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 px-10">
                                <div className="w-full max-w-md">
                                    <Progress
                                        percent={loadingPercentage}
                                        status="active"
                                        strokeColor="#ffffff"
                                        railColor="rgba(255,255,255,0.25)"
                                    />
                                </div>
                            </div>
                        )}

                        <Unity
                            unityProvider={unityProvider}
                            className="absolute inset-0 z-0 w-full h-full"
                            style={{
                                width: "100%",
                                height: "100%",
                                pointerEvents: "auto",
                                cursor: "auto",
                            }}
                        />
                    </>
                ) : (
                    <button
                        onClick={() => {
                            setStarted(true);
                        }}
                        className="
                                    group relative w-32 h-32 rounded-full bg-white
                                    flex items-center justify-center
                                    shadow-2xl
                                    transition-all duration-300 ease-out
                                    hover:scale-110 active:scale-95
                                "
                    >
                        <PlayCircleFilled
                            style={{ fontSize: 72, lineHeight: 1 }}
                            className="
                                        relative z-10 text-black
                                        transition-transform duration-300 ease-out
                                        group-hover:scale-110
                                        "
                        />
                    </button>
                )}
            </div>
        </div>
    );
};
