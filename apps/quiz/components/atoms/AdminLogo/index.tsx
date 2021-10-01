import React from 'react';
import styled from 'styled-components';

type asoviewLogoUrl = {
  url: string;
};

const AdminPageLogo = styled.img`
  width: 80%;
  text-align: center;
`;

const AdminLogo: React.FC<asoviewLogoUrl> = ({ 
  url 
}) => {
  return (
    <>
        <AdminPageLogo src={url} alt="ロゴ" />
    </>
  );
};

export default React.memo(AdminLogo)
