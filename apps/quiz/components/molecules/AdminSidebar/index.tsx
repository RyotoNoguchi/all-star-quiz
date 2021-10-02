import { Box, Grid, List, ListItemButton, ListItemIcon, Typography, ListItemText, Collapse } from '@mui/material/';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import styled from 'styled-components';
import { useState } from 'react';

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
  font-size: 2rem;
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
  font-size: 2rem;
`;
const StyledPeopleAlt = styled(PeopleAlt)`
  font-size: 2rem;
`;
const StyledFormatListNumberedIcon = styled(FormatListNumberedIcon)`
  font-size: 2rem;
`;

const MenuTitle = styled(Box)`
  display: flex;
  align-items: center;
`


const AdminSidebar: React.FC = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <MenuContainer>
        <MenuTitle>
          <StyledMenuBookIcon/>
          <StyledTypography variant="h2" >Menu</StyledTypography>
        </MenuTitle>
        <List component="nav" disablePadding>
          <ListItemButton onClick={() => setOpen(!open)} style={{ padding: '10px 0' }}>
            <ListItemIcon>
              <StyledLiveHelpIcon />
            </ListItemIcon>
            <ListItemText primary="Question" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton style={{ padding: '10px 0' }}>
            <ListItemIcon>
              <StyledPeopleAlt />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
          <ListItemButton style={{ padding: '10px 0' }}>
            <ListItemIcon>
              <StyledFormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking" />
          </ListItemButton>
        </List>
      </MenuContainer>
    </>
  );
};

export default AdminSidebar;
