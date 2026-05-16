import { useMemo } from "react";
import { LetterMapping } from "../letter-mapping/letter-mapping";
import { ABC } from "../../consts/consts";

export interface ABCLetterMappingProps {
    enableArrows: boolean;
}

const abc = () => ABC.split("");
const rotatedAbc = () => {
    return [...ABC.slice(1, ABC.length).split(""), ABC.charAt(0)];
};

export const CaesarCipherLetterMapping = ({
    enableArrows,
}: ABCLetterMappingProps) => {
    const letters = useMemo(() => abc(), []);
    const rotated = useMemo(() => rotatedAbc(), []);

    return (
        <div className="flex justify-center">
            <LetterMapping
                enableArrows={enableArrows}
                from={letters}
                to={rotated}
            />
        </div>
    );
};
