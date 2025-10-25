import React from "react";
import { FootCont, FootFinal, FinalLeft, FinalRight } from "./styles";
import { Paragraph } from "../../theming/styles";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Foot = () => {
  return (
    <FootCont>
      <FootFinal>
        <FinalLeft>
          <Paragraph>© Latifur Rahman · All rights reserved.</Paragraph>
        </FinalLeft>
        <FinalRight>
          <a
            href="mailto: itslatifur@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Paragraph>
              Email <FaEnvelope />
            </Paragraph>
          </a>
          <a
            href="https://www.linkedin.com/in/latifur/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Paragraph>
              LinkedIn <FaLinkedin />
            </Paragraph>
          </a>
          <a
            href="https://github.com/itsLatifur"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Paragraph>
              GitHub <FaGithub />
            </Paragraph>
          </a>
        </FinalRight>
      </FootFinal>
    </FootCont>
  );
};

export { Foot };
