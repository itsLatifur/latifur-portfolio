import styled from "styled-components";
import QUERIES, { Full, Heading, Paragraph } from "../../theming/styles";

export const FootCont = styled.footer`
  width: 100%;
  margin-bottom: 0px;
  ${Full} {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 100px;

    @media (${QUERIES.small}) {
      padding-top: 100px;
    }
  }

  ${Heading} {
    font-size: 25px;
    @media (${QUERIES.small}) {
      font-size: 50px;
    }
  }
`;

export const FootFinal = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (${QUERIES.small}) {
    flex-wrap: nowrap;
    padding: 0;
  }
`;

export const FinalLeft = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0;
  align-items: center;
`;

export const FinalRight = styled(FinalLeft)`
  justify-content: flex-start;
  gap: 14px; /* comfortable spacing between buttons on mobile */
  margin-top: 12px;

  ${Paragraph} {
    margin-left: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px; /* consistent space between text and icon */
    border-bottom: 1px solid transparent;
    :hover {
      opacity: 0.5;
    }
  }

  @media (${QUERIES.small}) {
    justify-content: flex-end;
    gap: 18px; /* modest spacing on larger screens */
    margin-top: 0px;
  }
`;

export const HeroIcon = styled.svg`
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-left: ${(props) => props.marginLeft || "0"};
  opacity: 0.5;

  path {
    fill: ${({ theme }) => theme.textMain};
  }
`;
