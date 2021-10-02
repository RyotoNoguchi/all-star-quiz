import { Box, Grid, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import styled from 'styled-components';

const StyledTypography = styled(Typography)`
  text-align: left;
  font-weight: 400;
  margin-left: 12px;
  font-size: 2rem;
`
const StyledMenuBookIcon = styled(MenuBookIcon)`
  font-size: 2rem;
  margin-left: 7px;
`

const MenuContainer = styled(Grid)`
  font-size: 2.5rem;
  /* background-image: linear-gradient(#a1aff8, #8590c9); */
  background-image: none;
  background-color: #fff;
  border-radius: 16px;
  margin-top: 12px;
  margin-left: 12px;
  height: 656px;
  padding: 8px;
`;

const StyledLiveHelpIcon = styled(LiveHelpIcon)`
  font-size: 3rem;
`;
const StyledPeopleAlt = styled(PeopleAlt)`
  font-size: 3rem;
`;
const StyledFormatListNumberedIcon = styled(FormatListNumberedIcon)`
  font-size: 3rem;
`;

const MenuTitle = styled(Box)`
  display: flex;
  align-items: center;
`


const AdminSidebar: React.FC = () => {
  return (
    <>
      <MenuContainer>
        <MenuTitle>
          <StyledMenuBookIcon/>
          <StyledTypography variant="h2" >Menu</StyledTypography>
        </MenuTitle>
        <List component="nav" disablePadding>
          <ListItem button style={{ padding: '10px 0' }}>
            <ListItemIcon>
              <StyledLiveHelpIcon />
            </ListItemIcon>
            Question
          </ListItem>
          <ListItem button style={{ padding: '10px 0' }}>
            <ListItemIcon>
              <StyledPeopleAlt />
            </ListItemIcon>
            User
          </ListItem>
          <ListItem button style={{ padding: '10px 0' }}>
            <ListItemIcon>
              <StyledFormatListNumberedIcon />
            </ListItemIcon>
            Ranking
          </ListItem>
        </List>
      </MenuContainer>
    </>
  );
};

export default AdminSidebar;
