import { Table } from "antd";

const dataSource = [
    {
        key: "1",
        rotor: "I",
        wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        year: 1930,
        model: "Enigma I",
    },
    {
        key: "2",
        rotor: "II",
        wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        year: 1930,
        model: "Enigma I",
    },
    {
        key: "3",
        rotor: "III",
        wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        year: 1930,
        model: "Enigma I",
    },
    {
        key: "4",
        rotor: "Reflector B",
        wiring: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    },
];

const columns = [
    {
        title: "Rotor #",
        dataIndex: "rotor",
        key: "rotor",
    },
    {
        title: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        dataIndex: "wiring",
        key: "wiring",
        render: (text: string) => (
            <span style={{ fontFamily: "monospace", letterSpacing: "1.2px" }}>
                {text}
            </span>
        ),
    },
];

export default function RotorTable() {
    return (
        <Table dataSource={dataSource} columns={columns} pagination={false} />
    );
}
