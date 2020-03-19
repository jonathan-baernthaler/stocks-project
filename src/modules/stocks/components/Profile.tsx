import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
const { Title, Paragraph } = Typography;

const Body = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 50px;
  object-fit: contain;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`;

const Name = styled.span`
  margin-right: 20px;
`;

const Price = styled.span`
  font-weight: normal;
  color: rgba(0, 0, 0, 0.65);
  font-size: 20px;
`;

const Description = styled(Paragraph)`
  font-size: 12px;
`;

type ProfileProps = {
  companyProfile: {
    companyName: string;
    description: string;
    price: number;
    changesPercentage: string;
    image: string;
  };
};

export const Profile: React.FC<ProfileProps> = ({ companyProfile }) => {
  const {
    companyName,
    price,
    changesPercentage,
    description,
    image
  } = companyProfile;

  return (
    <Body>
      <Logo src={image}></Logo>
      <Info>
        <Title style={{ marginBottom: 5, fontSize: 24 }}>
          <Name>{companyName}</Name>
          <Price>{`${price} ${changesPercentage}`}</Price>
        </Title>
        <Description>{description}</Description>
      </Info>
    </Body>
  );
};
