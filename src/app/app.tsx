import { Col, Layout, Row, Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import "./app.css";

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
            The enigma machine is a pretty simple but surprisingly hard to crack{" "}
            <i>substitution cipher</i>. A substitution cipher works on the
            principle of jumbling up letters. Most likely you've encountered two
            very simple substitution ciphers both of which are relevant to
            understanding the enigma.
          </Typography.Paragraph>
          <Typography.Title level={2}>Basic Principles</Typography.Title>
          <Typography.Paragraph>
            The first of which is the{" "}
            <Typography.Text strong={true}>Caesar Cipher</Typography.Text>. In
            this cipher, each letter is mapped to its consecutive letter in the
            order they appear in the alphabet. In the English alphabet, that
            would mean:
            <Table>
              <Row>Plain
                <Col>
                A
                </Col>
                <Col>
                B
                </Col><Col>
                C
                </Col><Col>
                D
                </Col><Col>
                E
                </Col><Col>
                F
                </Col><Col>
                G
                </Col>
              </Row>

            </Table>
          </Typography.Paragraph>
        </div>
      </Content>
    </Layout>
  );
}

export { App };
