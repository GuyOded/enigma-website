import { Collapse, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import "./app.css";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import { CaesarCipherLetterMapping } from "../components/caesar-cipher-letter-mapping/caesar-cipher-letter-mapping";
import Text from "antd/es/typography/Text";
import { SubstitutionCipherLetterMapping } from "../components/substitution-cipher-letter-mapping/substitution-cipher-letter-mapping";
import Link from "antd/es/typography/Link";
import { UnityLoader } from "../components/unity-loader/unity-loader";
import RotorTable from "../components/rotor-table/rotor-table";
import { CLONE_COMMAND, FURTHER_CHALLENGE_CIPHER } from "../consts/consts";
import CodeBox from "../components/code-box/code-box";
import { UNITY_ASSETS_PATH } from "../config/app-config";

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
                        swapping. In this cipher, every letter is swapped for
                        another. For example:
                    </Typography.Paragraph>
                    <div className="pb-8">
                        <SubstitutionCipherLetterMapping
                            letterMap={{ A: "L", Y: "V", Q: "M" }}
                        />
                    </div>
                    <Typography.Paragraph>
                        In order to encrypt, one would swap each letter in the
                        mapping with its mapped counterpart, in this case each
                        &apos;A&apos; with &apos;L&apos; and each &apos;L&apos;
                        with &apos;A&apos; and so on for the other pairs.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        As before, this cipher scheme is very weak because each
                        letter has a constant mapping. So given a long cipher
                        text you could guess the letter mapping simply from
                        their frequency in the text. You can try solving a
                        cipher very similar for this right here:{" "}
                        <Link href="https://api.razzlepuzzles.com/cryptogram">
                            Cryptograms
                        </Link>
                        .
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The key for this cipher is the mapping itself, which is
                        one of its strengths, since there are many possible ways
                        to construct such a mapping. Note also that decryption
                        is performed by applying the same mapping again to the
                        ciphertext, as the mapping is its own inverse.
                    </Typography.Paragraph>
                    <div className="pb-4">
                        <Collapse
                            items={[
                                {
                                    key: 1,
                                    label: "How many letter subs are there?",
                                    children: (
                                        <>
                                            <Typography.Paragraph>
                                                In our case, a letter
                                                substitution map consists of
                                                pairs of letters, where each
                                                letter can appear in at most one
                                                pair. To count the number of
                                                possible maps, we first
                                                determine how many distinct sets
                                                of non-repeating letter pairs
                                                can be formed.
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                We begin with the simplest case:
                                                a map consisting of a single
                                                pair, for example (A B). To
                                                construct such a pair, we first
                                                choose one letter out of 26
                                                possibilities, and then choose a
                                                different second letter out of
                                                the remaining 25 possibilities.
                                                Therefore, the total number of
                                                ordered pairs is 26⋅25
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                However, pairs such as (A B) and
                                                (B A) represent the same
                                                substitution map, so we have
                                                counted every map twice. To
                                                correct for this overcounting,
                                                we divide by 2, giving:
                                                <InlineMath math="\frac{26 \cdot 25}{2} = 325"></InlineMath>
                                                .
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                We now repeat the same process
                                                for maps consisting of two
                                                letter pairs. First, we choose
                                                four distinct letters, which can
                                                be done in{" "}
                                                <InlineMath math="26 \cdot 25 \cdot 24 \cdot 23" />{" "}
                                                ways.
                                            </Typography.Paragraph>

                                            <Typography.Paragraph>
                                                As before, the order of letters
                                                inside each pair does not
                                                matter, since pairs such as (A
                                                B) and (B A) represent the same
                                                substitution. Therefore, we
                                                divide by 2 for each pair,
                                                giving a factor of{" "}
                                                <InlineMath math="2^2" />.
                                            </Typography.Paragraph>

                                            <Typography.Paragraph>
                                                In addition, the order of the
                                                pairs themselves is irrelevant:
                                                (A B)(C D) represents the same
                                                map as (C D)(A B). Since there
                                                are <InlineMath math="2!" />{" "}
                                                ways to order two pairs, we
                                                divide by another factor of{" "}
                                                <InlineMath math="2" />.
                                            </Typography.Paragraph>

                                            <Typography.Paragraph>
                                                Altogether, the number of
                                                possible maps consisting of two
                                                pairs is{" "}
                                                <InlineMath math="\frac{26 \cdot 25 \cdot 24 \cdot 23}{2^2 \cdot 2!}=44850" />
                                                .
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                As you can see there are a lot
                                                more possibilities for two pairs
                                                than for a single pair. We can
                                                continue this process for three,
                                                four and so on up to 13 pairs,
                                                summing all the possibilities on
                                                the way. You can continue this
                                                process for yourself, but for
                                                matters of perspective the
                                                number of substitutions
                                                consisting of 13 pairs is:{" "}
                                                {(7905853580625).toLocaleString()}
                                                . Which is quite a bit to go
                                                through even for a modern
                                                computer.
                                            </Typography.Paragraph>
                                        </>
                                    ),
                                },
                            ]}
                        ></Collapse>
                    </div>
                    <Typography.Paragraph>
                        The military Enigma machine combines both ciphers,
                        leveraging their strengths to compensate for their
                        weaknesses.
                    </Typography.Paragraph>
                    <Typography.Title level={2}>
                        The Enigma Encryption Scheme
                    </Typography.Title>
                    <Typography.Paragraph>
                        An Enigma machine consisted of three main components: a
                        keyboard and letter display, a plugboard, and a set of
                        rotating rotors. The rotors work very similarly to the
                        Caesar cipher described above.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        To encrypt a message, the operator first configured the
                        machine by setting the initial rotor positions and the
                        plugboard connections. When a key was pressed on the
                        keyboard, an electrical signal traveled through the
                        plugboard and rotors before causing a different letter
                        to light up on the display. This illuminated letter was
                        the encrypted version of the typed character.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        After each key press, the rotors rotated, changing the
                        internal wiring of the machine. As a result, the same
                        input letter could encrypt to different output letters
                        at different points in the message. This continuous
                        change made the cipher significantly more difficult to
                        break than a simple fixed substitution cipher.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        To decrypt a message, another Enigma machine had to be
                        configured with the exact same settings used during
                        encryption. The operator would then type the ciphertext
                        into the keyboard, and the illuminated letters would
                        reproduce the original plaintext message.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        There were other components like the reflectors that
                        we&apos;ll get in a later section.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The following is a 3d simulation illustrating how the
                        three rotor enigma looks like. Try to encrypt and
                        decrypt a message.
                    </Typography.Paragraph>
                    <UnityLoader buildDataBasePath={UNITY_ASSETS_PATH} />
                    <Typography.Title level={2}>
                        The Encryption Function
                    </Typography.Title>
                    <Typography.Paragraph>
                        Now let us dive in to the encryption process more
                        thoroughly. I will first specify the encryption function
                        with letters representing each stage of the encryption.
                        We will then dive into what each letter means.
                    </Typography.Paragraph>
                    <BlockMath math="E = P^{-1}(C^{-k} R_1^{-1} C^k)(C^{-l} R_2^{-1} C^l)(C^{-m} R_3^{-1} C^m)U(C^{-m} R_3 C^m)(C^{-l} R_2 C^l)(C^{-k} R_1 C^k)P" />
                    <Typography.Paragraph>
                        The equation above means essentially means - the
                        encryption function, <InlineMath math="E" />, is
                        constructed by applying the components of the right hand
                        side in order. We&apos;ll go through each of the
                        components in order.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <InlineMath math="P" /> for plugboard is the letter swap
                        permutation determined by the plugboard connections.
                        Note that this permutation is its own inverse. So{" "}
                        <InlineMath math="P=P^{-1}" /> and{" "}
                        <InlineMath math="P^2 = I" /> where{" "}
                        <InlineMath math="I" /> is the identity meaning that for
                        each letter <InlineMath math="l" />,{" "}
                        <InlineMath math="I(l) = l" />.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Next is the rotor permutation which consists of some
                        generic permutation denoted by <InlineMath math="R_1" />{" "}
                        surrounded by two Caesar ciphers raised to the power of{" "}
                        <InlineMath math="k" /> and <InlineMath math="-k" />.
                        The <InlineMath math="k" /> represents the position of
                        the first rotor. So before a letter goes through{" "}
                        <InlineMath math="R_1" /> it first passes through{" "}
                        <InlineMath math="C^{-k}" /> which is the Caesar cipher
                        that maps A to the (26-k)-th letter. And resultant
                        letter, after passing through <InlineMath math="R_1" />{" "}
                        passes through another Caesar cipher, mapping A to the
                        k-th letter in the alphabet.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Each rotor applied a different letter permutation. Most
                        Enigma machines used three rotors, although some later
                        wartime variants used four or even five. For most of the
                        war, operators selected three rotors out of a set of
                        five available rotors each day. The order of the rotors
                        also mattered, since changing their positions changed
                        the encryption. This resulted in 60 possible rotor
                        arrangements. There are 10 ways to choose 3 rotors from
                        5, and each choice can be ordered in 6 different ways,
                        giving a total of <InlineMath math="10 \times 6 = 60" />{" "}
                        configurations.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The next component was the reflector. The reflector
                        applied another letter-swapping permutation consisting
                        of 13 letter pairs, meaning every letter was mapped to
                        exactly one other letter. Its most important role was to
                        send the electrical signal back through the machine
                        after it passed through the rotors. On the return path,
                        the signal passed through the rotors and plugboard in
                        reverse order, applying their
                        <Typography.Text strong={true}>
                            inverse permutations
                        </Typography.Text>
                        . This design allowed the Enigma machine to use the same
                        configuration for both encryption and decryption. The
                        following section explains why:
                        <Collapse
                            items={[
                                {
                                    key: 1,
                                    label: "Proof: Encrypting Twice with the Same Configuration Recovers the Original Message",
                                    children: (
                                        <>
                                            <Typography.Paragraph>
                                                All we need to show is that if{" "}
                                                <InlineMath math="\alpha" />{" "}
                                                denotes a letter in the plain
                                                text, applying{" "}
                                                <InlineMath math="E(E(\alpha)) = \alpha" />{" "}
                                                for some configuration of rotors
                                                and plugboard. This is pretty
                                                easy to show if you notice that
                                                the encryption scheme{" "}
                                                <InlineMath math="E = PR_{nkj} U R^{-1}_{nkj} P^{-1}" />
                                                where we&apos;ve denoted{" "}
                                                <InlineMath math="R_{nkj} = (C^k R_1 C^{-k})(C^l R_2 C^{-l})(C^m R_3 C^{-m})" />
                                                .
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                Now applying{" "}
                                                <InlineMath math="E" /> twice is
                                                easy:
                                                <BlockMath
                                                    math={`
                                                            \\begin{aligned}
                                                            E(E(\\alpha))
                                                            &= (P R_{nkj} U R^{-1}_{nkj} P^{-1})(P R_{nkj} U R^{-1}_{nkj} P^{-1})(\\alpha) \\\\
                                                            &= P R_{nkj} U R^{-1}_{nkj} (P^{-1} P) R_{nkj} U R^{-1}_{nkj} P^{-1}(\\alpha) \\\\
                                                            &= P R_{nkj} U (R^{-1}_{nkj} R_{nkj}) U R^{-1}_{nkj} P^{-1}(\\alpha) \\\\
                                                            &= P R_{nkj} (U U) R^{-1}_{nkj} P^{-1}(\\alpha) \\\\
                                                            &= \\alpha
                                                            \\end{aligned}
                                                        `}
                                                />
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                {" "}
                                                Where we&apos;ve used the fact
                                                that <InlineMath math="U" /> is
                                                its own inverse.
                                            </Typography.Paragraph>
                                        </>
                                    ),
                                },
                            ]}
                        ></Collapse>
                    </Typography.Paragraph>
                    <Typography.Title level={2}>
                        Encryption Process
                    </Typography.Title>
                    <Typography.Paragraph>
                        Let&apos;s encrypt a letter, step-by-step.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Let&apos;s have an enigma configured with rotors of
                        types (3 2 1) and in positions: (A A B). Let&apos;s also
                        have the plugboard configured with one swap: (L D).
                        Let&apos;s also set the reflector to be Reflector B.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        When we press the letter D on the keyboard, the first
                        thing that happens is that the rightmost rotor advances
                        by one step. Each of the five rotors has a specific
                        “notch” letter that triggers a stepping mechanism for
                        the rotor to its left. This stepping mechanism
                        determines when the next rotor should rotate. For
                        example, Rotor #1 is configured so that it triggers the
                        next rotor when it reaches the letter R. However, after
                        this key press, the rightmost rotor moves to the
                        position C, which is not its stepping trigger. As a
                        result, the middle rotor does not advance and remains in
                        its current position.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Now we pass through the plugboard.{" "}
                        <InlineMath math="P(D) = L" />. Onward to the first
                        rotor -{" "}
                        <InlineMath math="C^{-2}(R_1 (C^2(L))) = C^{-2}(R_1(N)) = C^{-2}(W) = U" />
                        . Where I have used the <InlineMath math="R_1" /> as it
                        is given in the table below:
                    </Typography.Paragraph>
                    <div className="pb-4">
                        <RotorTable />
                    </div>
                    <Typography.Paragraph>
                        Next we go through <InlineMath math="R_2" /> and{" "}
                        <InlineMath math="R_3" />. Luckily they are at position
                        &apos;A&apos; which corresponds to{" "}
                        <InlineMath math="C^0 = I" /> which maps every letter to
                        itself. <InlineMath math="R_3(R_2(U)) = R_3(P) = E" />
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Now through the reflector and all the way back:
                        <InlineMath math="R_2^{-1}(R_3^{-1}(U(E))) = R_2^{-1}(R_3^{-1}(Q) = R_2^{-1}(Y) = V" />
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Back through the first rotor:
                        <InlineMath math="C^{-2}(R_1^{-1} (C^2(V))) = C^{-2}(R_1^{-1}(X)) = C^{-2}(Q) = O" />
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        And finally <InlineMath math="P(O) = O" />
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        You can verify for yourself that for the same initial
                        configuration the output of the letter &apos;O&apos; is
                        &apos;D&apos;.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        To see that you understand everything so far, try to
                        calculate the number of enigma configurations, when:
                        <ol>
                            <li>There are three reflectors.</li>
                            <li>
                                There are 5 available rotors to choose from.
                                There are three rotor places in our Enigma.
                                (Remember that each rotor has 26 initial
                                positions)
                            </li>
                            <li>There are exactly 10 letter swaps.</li>
                        </ol>
                    </Typography.Paragraph>
                    <Typography.Title level={2}>
                        Breaking the Cipher
                    </Typography.Title>
                    In this section you&apos;ll be challenged to break the
                    enigma cipher using code. A simulation of an enigma machine
                    will be available to you as a{" "}
                    <Link href="https://rust-lang.org/">Rust</Link> crate. It is
                    very simple to use and there are examples if you need them.
                    Run the following command to clone a starter kit
                    (you&apos;re going to need git to run this project):
                    <CodeBox code={CLONE_COMMAND} />
                    <Typography.Paragraph>
                        There are instructions in the readme file, but I will
                        provide a further explanation here. In the challenge
                        you&apos;re given a plain text message and its
                        corresponding cipher message. Your job is to find the
                        enigma configuration that was used to encrypt the
                        message. This type of attack on a cipher is called a
                        known plaintext attack.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        In the war, finding this configuration would allow you
                        to decrypt all the messages that were sent during this
                        day. Another cipher, encrypted with the same key is also
                        attached in the challenge instructions. Find what it
                        says to complete the challenge!
                    </Typography.Paragraph>
                    <Typography.Title level={3}>
                        Further Challenge
                    </Typography.Title>
                    <Typography.Paragraph>
                        Another challenge is to try breaking the cipher without
                        any knowledge of the plaintext - a much more realistic
                        challenge. Read about{" "}
                        <Link href="https://en.wikipedia.org/wiki/Index_of_coincidence">
                            Index of Coincidence
                        </Link>{" "}
                        and try to decipher the following message:
                    </Typography.Paragraph>
                    <CodeBox code={FURTHER_CHALLENGE_CIPHER} />
                    <Typography.Paragraph>
                        The message was encrypted using reflector A and 10
                        letter swaps.
                    </Typography.Paragraph>
                </div>
            </Content>
        </Layout>
    );
}

export { App };
