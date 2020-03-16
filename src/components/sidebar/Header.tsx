import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(240 240 240);
  width: 100%;
`;

const UserName = styled.span`
  font-weight: bold;
  color: #1890ff;
`;

export const Header = () => {
  return (
    <Container>
      <Avatar size={64} icon={<UserOutlined />} />
      <Wrapper>
        <UserName>Jonathan Bärnthaler</UserName>
        <span>baernthaler.joanthan@gmail.com</span>
      </Wrapper>
    </Container>
  );
};
