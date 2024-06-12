import { useSelector } from "react-redux";
import { Box,IconButton,useMediaQuery } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function HomePage() {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const gamecompleted=useSelector((state)=>state.game_completed);
    const currentLevel=useSelector((state)=>state.current_level);
    const navigate=useNavigate();
  return (
    <Box>
        <div className="Logo">
            <p> Word </p>
            <p>Cookies</p>
        </div>
        {gamecompleted?
        <Box>
            <h2>You Already completed all levels</h2>
        </Box>
        :
        <Box>
            <h1>Welcome to Game</h1>
            <h2>Level:{currentLevel}</h2>
            <button onClick={()=>navigate("/play")}> Play  <IconButton><PlayArrowIcon /></IconButton></button>
        </Box>
      
        }
          <Navbar/>
    </Box>
  )
}

export default HomePage;
