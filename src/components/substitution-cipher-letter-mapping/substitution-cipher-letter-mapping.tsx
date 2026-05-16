import { ABC } from "../../consts/consts";
import { LetterMapping } from "../letter-mapping/letter-mapping";

export interface SubstitutionCipherLetterMappingProps {
    readonly letterMap: Record<string, string>;
}

export const SubstitutionCipherLetterMapping = ({
    letterMap,
}: SubstitutionCipherLetterMappingProps) => {
    const from = ABC.split("");
    const to = [...from];

    for (const [a, b] of Object.entries(letterMap)) {
        const indexA = to.indexOf(a);
        const indexB = to.indexOf(b);

        if (indexA !== -1 && indexB !== -1) {
            [to[indexA], to[indexB]] = [to[indexB], to[indexA]];
        }
    }

    return (
        <LetterMapping
            from={from}
            to={to}
            enableArrows={true}
            curvedArrows={true}
            omitIdentity={true}
        />
    );
};
