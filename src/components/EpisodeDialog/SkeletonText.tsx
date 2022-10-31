import React from "react";
import Skeleton from "@mui/material/Skeleton";

export type SkeletonTextProps = {
  numLines?: number;
  linesPerGroup?: number;
};

function SkeletonText({ numLines = 12, linesPerGroup = 4 }: SkeletonTextProps) {
  return (
    <React.Fragment>
      {Array.from(Array(numLines).keys()).map((i) =>
        i % (linesPerGroup + 1) === 0 ? <br key={i} /> : <Skeleton variant="text" key={i} />
      )}
    </React.Fragment>
  );
}

export default React.memo(SkeletonText);
