import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Routes from "@/utils/routes";

export type WelcomeProps = {
  className?: string;
};

function Welcome({ className }: WelcomeProps) {
  return (
    <div className={className}>
      <Typography variant="h5">There&apos;s nothing here...</Typography>
      <Box mt={4}>
        <Button color="secondary" variant="outlined" component={Link} to={Routes.discover}>
          Add some podcasts.
        </Button>
      </Box>
    </div>
  );
}

export default Welcome;
