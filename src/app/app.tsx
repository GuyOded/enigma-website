import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import "./app.css";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { CaesarCipherLetterMapping } from "../components/caesar-cipher-letter-mapping/caesar-cipher-letter-mapping";
import Text from "antd/es/typography/Text";

function App() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ padding: "0 48px" }}>
                <div className="main-container">
                    <h1 className="title">BREAKING THE ENIGMA</h1>
                    <p className="subtitle">
                        Explore how Enigma works, then try to break it yourself
                    </p>
                    <Typography.Title level={2}>Introduction</Typography.Title>
                    <Typography.Paragraph>
                        The enigma machine is a pretty simple but surprisingly
                        hard to crack <i>substitution cipher</i>. A substitution
                        cipher works on the principle of jumbling up letters.
                        Most likely you&apos;ve encountered two very simple
                        substitution ciphers both of which are relevant to
                        understanding the enigma.
                    </Typography.Paragraph>
                    <Typography.Title level={2}>
                        Basic Principles
                    </Typography.Title>
                    <Typography.Paragraph>
                        The first is the{" "}
                        <Typography.Text strong={true}>
                            Caesar Cipher
                        </Typography.Text>
                        . In this cipher, each letter is mapped to its
                        consecutive letter in the order they appear in the
                        alphabet. In the English alphabet, that would mean:
                    </Typography.Paragraph>
                    <div className="pb-8">
                        <CaesarCipherLetterMapping enableArrows={true} />
                    </div>
                    <Typography.Paragraph>
                        Let&apos;s denote this mapping as{" "}
                        <InlineMath math="E_C"></InlineMath> so that{" "}
                        <InlineMath math="E_C(A)=B, E_C(B)=C" /> and so on. To
                        decrypt a message, simply apply the reverse mapping that
                        can be derived from the diagram above by reversing the
                        direction of each arrow.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        This cipher is very, very simple to break and it has a
                        lot of problems. I would like to address two of them
                        that can be easily fixed and will help us understand the
                        mechanism of the enigma machine.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The first problem is that once you know how the cipher
                        works, you can instantly decrypt any message. There is
                        no secret information needed to decode it. In other
                        words,this cipher has no <Text italic>key</Text>. A key
                        is secret information shared ahead of time between the
                        sender and receiver that allows them to encrypt and
                        decrypt messages securely. But right now, our Caesar
                        encryption scheme is too simple to even have a key. We
                        need to complicate it slightly.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Note that we can apply <InlineMath math="E_C" />{" "}
                        consecutively like this{" "}
                        <InlineMath math="E_C^2(A) = E_C(E_C(A)) = E_C(B) = C" />
                        . This gives us a new letter map where each letter is
                        mapped to it&apos;s next nearest neighbor from above.
                        Each number we choose between 1 and 25 will give us a
                        new letter map. If we apply the encryption 26 times in a
                        row for each letter, we actually map each letter to
                        itself (this is called an identity).
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        A suggestion for key could be some number,{" "}
                        <InlineMath math="n" />, that represents the number of
                        times the Caesar map was applied in order to encrypt.
                        The sender and receiver can agree upon this number
                        before sending messages. To encrypt a message the sender
                        would apply <InlineMath math="E_C^n" /> to each letter
                        and the receiver would apply the reverse map n times in
                        order to decrypt the message.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        This key doesn&apos;t add that much security as it has
                        only 25 possibilities. But this cipher can be broken
                        even without the key. Which leads us to the second
                        problem I wanted to present. The mapping of the
                        encryption is constant in the sense that each letter is
                        always mapped to the same letter. So even without
                        knowing anything about the encryption at all, an
                        attacker can take advantage of that by exploiting simple
                        linguistic patterns. For example, &apos;e&apos; is a
                        very frequent letter in english. Thus, if an attacker
                        gets hold of the encrypted message and notices that
                        &apos;x&apos; is the most frequent letter, they may
                        guess that it corresponds to &apos;e&apos; or some other
                        frequent letter. In this case, figuring out one letter
                        gives you the entire encryption map, so after each guess
                        the attacker can try and decrypt and see if the message
                        makes any sense.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        To resolve this issue, we change the encryption scheme
                        further. Each letter we encrypt, we apply the encryption
                        map one more time. For example, say we want to encrypt
                        the word &apos;HELLO&apos; and that our key is{" "}
                        <InlineMath math="n" />. We calculate the first letter
                        by: <InlineMath math="E_C^n(H)" />. For the second{" "}
                        <InlineMath math="E_C^{n+1}" />, for the third{" "}
                        <InlineMath math="E_C^{n+2}" />. We continue like that
                        until we reach a letter where we have to apply{" "}
                        <InlineMath math="E_C" /> 26 times. In this case, we
                        change our counter back to 1 and continue the process
                        from there. Our key now becomes the initial state of the
                        counting process.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        This new method, resolves the issue of the constant
                        mapping. But of course there are many other problems
                        with this encryption mechanism. The most obvious one is
                        that we still have a key that only has 25 possibilities.
                        So all that an attacker has to do to break the cipher is
                        try all the possibilities and pick the one out of the 25
                        that makes sense.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        This leads us to the second type of substitution cipher,
                        letter transpositions, or more commonly known as letter
                        swapping.
                    </Typography.Paragraph>
                </div>
            </Content>
        </Layout>
    );
}

export { App };
