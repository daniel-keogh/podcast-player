import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// @ts-expect-error TS(2307): Cannot find module '@/components/Subscriptions/Sub... Remove this comment to see the full error message
import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";
// @ts-expect-error TS(2307): Cannot find module '@/services/discoverService' or... Remove this comment to see the full error message
import discoverService from "@/services/discoverService";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    discoverService.getPopular().then(setPopular);
  }, []);

  if (popular.length === 0) {
    return null;
  }

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<Box my={5}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Typography variant="h5" component="h5">
        Popular
      </Typography>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box my={1} py={4} px={2} display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {popular.map((item) => (<SubscriptionItem clickable key={(item as any)._id} id={(item as any)._id} title={(item as any).title} artwork={(item as any).artwork}/>))}
      </Box>
    </Box>);
}

export default Popular;
