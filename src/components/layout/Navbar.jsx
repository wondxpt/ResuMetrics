import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PreviewIcon from "@mui/icons-material/Preview";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const paths = [
    "/",
    "/personal",
    "/experience",
    "/education",
    "/skills",
    "/certifications",
    "/preview",
  ];

  const getValue = () => {
    const index = paths.indexOf(location.pathname);
    return index === -1 ? 0 : index;
  };

  const [value, setValue] = useState(getValue());

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "primary.main",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "background.default",
            }}
          >
            ResuMetrics
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        elevation={8}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <BottomNavigationAction
            label="Templates"
            icon={<DescriptionIcon />}
          />

          <BottomNavigationAction
            label="Personal"
            icon={<PersonIcon />}
          />

          <BottomNavigationAction
            label="Experience"
            icon={<WorkIcon />}
          />

          <BottomNavigationAction
            label="Education"
            icon={<SchoolIcon />}
          />

          <BottomNavigationAction
            label="Skills"
            icon={<StarIcon />}
          />

          <BottomNavigationAction
            label="Certifications"
            icon={<WorkspacePremiumIcon />}
          />

          <BottomNavigationAction
            label="Preview"
            icon={<PreviewIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Navbar;