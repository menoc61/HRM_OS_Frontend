import { Col, Layout, Row } from "antd";
import styles from "./Footer.module.css";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const year = new Date().getFullYear();

  return (
    <AntFooter className={styles.footer}>
      <Row>
        <Col xs={24} md={24} lg={12} className={styles.copyrightCol}>
          <p className={styles.copyrightText}>
            Powered by{" "}
            <a
              href="https://digit-tech-innov.com/"
              className="font-weight-bold btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <b color="">DIGIT-TECH-INNOV SARL</b>
            </a>©{year}
          </p>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <div className={styles.footerMenu}>
            <ul className={styles.footerList}>
              <li className="nav-item">
                <a href="/doc" className="nav-link text-muted" target="_blank">
                  Documentation
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  Licence
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
