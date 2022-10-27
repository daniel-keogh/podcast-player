import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";
import discoverService from "@/services/discoverService";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    discoverService.getPopular().then(setPopular);
  }, []);

  if (popular.length === 0) {
    return null;
  }

  return (
    <Box my={5}>
      <Typography variant="h5" component="h5">
        Popular
      </Typography>

      <Box my={1} py={4} px={2} display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
        {popular.map((item) => (
          <SubscriptionItem
            clickable
            key={item._id}
            id={item._id}
            title={item.title}
            artwork={item.artwork}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Popular;
