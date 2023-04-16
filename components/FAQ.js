import React from "react";
import styles from "../styles/sass/pages/faq.module.scss";
import Accordion from "react-bootstrap/Accordion";

function FAQ() {
  return (
    <div className={styles.faq}>
      <h2>Frequently Asked Questions</h2>
      <Accordion className={styles.Accordion}>
        <Accordion.Item eventKey="0" className={styles.AccordionItem}>
          <Accordion.Header className={styles.AccordionHeader}>
            what are NFTs
          </Accordion.Header>
          <Accordion.Body className={styles.AccordionBody}>
            Non-fungible tokens are unique cryptographic tokens. They are
            digital watermarks that can be used to establish provenance and
            ownership of many types of assets, from tweets to artwork and real
            estate. The market for NFTs is still nascent. As physical assets
            increasingly become digitized, it is expected to multiply in the
            future.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className={styles.AccordionItem}>
          <Accordion.Header className={styles.AccordionHeader}>
            where are NFts stored
          </Accordion.Header>
          <Accordion.Body className={styles.AccordionBody}>
            NFTs are stored on the blockchain. The smart contract address
            pointing to the location of the NFT (on the blockchain) is received
            after an NFT is purchased and kept in a digital wallet. The contents
            of the NFT’s smart contract is most commonly stored on the web
            through a file sharing system but can also be stored on chain.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className={styles.AccordionItem}>
          <Accordion.Header className={styles.AccordionHeader}>
            what are smart contracts
          </Accordion.Header>
          <Accordion.Body className={styles.AccordionBody}>
            Smart contracts are simply programs stored on a blockchain that run
            when predetermined conditions are met. They typically are used to
            automate the execution of an agreement so that all participants can
            be immediately certain of the outcome, without any intermediarys
            involvement or time loss.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className={styles.AccordionItem}>
          <Accordion.Header className={styles.AccordionHeader}>
            blockchain and address
          </Accordion.Header>
          <Accordion.Body className={styles.AccordionBody}>
            the octo crypto market please is a nft collection and the smart
            contract of this market place is on sepolia chain at the address
            &quot;0x44fEa756bA11ac83c234F40ADCA73e81EE2cD51B&quot;
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FAQ;
