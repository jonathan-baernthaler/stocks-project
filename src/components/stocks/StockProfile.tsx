import React from "react";
import { Avatar, Typography } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import styled from "styled-components";
const { Title, Paragraph } = Typography;

const Body = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
`;

const Logo = styled(Avatar)`
  margin-right: 50px;
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

type StockProfileProps = {
  companyProfile: {
    companyName: string;
    description: string;
    price: number;
    changesPercentage: string;
    image: string;
  };
};

export const StockProfile: React.FC<StockProfileProps> = ({
  companyProfile
}) => {
  const {
    companyName,
    price,
    changesPercentage,
    description,
    image
  } = companyProfile;

  return (
    <Body>
      <Logo shape="square" size={64} src={image} icon={<FileImageOutlined />} />
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
