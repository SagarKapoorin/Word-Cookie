import { useSelector } from "react-redux";
import { Box,IconButton,useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
function Navbar() {
const navigate=useNavigate();
  return (
    <Box display="flex" gap="0px" width="450px"  marginLeft="-40px" position="fixed" top="887px">
      <div className="buttonss"> <IconButton  onClick={()=>navigate("/leaderboard")}><LeaderboardIcon /></IconButton></div>
   
    <div className="buttonss">    <IconButton onClick={()=>navigate("/compact")}><ViewCompactIcon/></IconButton></div>

    <div className="buttonss">    <IconButton onClick={()=>navigate("/")}><HomeIcon/></IconButton></div>

    <div className="buttonss">    <IconButton onClick={()=>navigate("/calender")}><CalendarMonthIcon/></IconButton></div>

    <div className="buttonss">
    <IconButton onClick={()=>navigate("/group")}><Diversity1Icon/></IconButton>
    </div>
    </Box>
  )
}

export default Navbar;
