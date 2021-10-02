import React from 'react';
import styled from 'styled-components';

type LogoURL = {
  url: string;
};

const AdminPageLogo = styled.img`
  width: 80%;
  text-align: center;
`;

const AdminLogo: React.FC<LogoURL> = ({ 
  url 
}) => {
  return (
    <>
        <AdminPageLogo src={url} alt="ロゴ" />
    </>
  );
};

export default React.memo(AdminLogo)
