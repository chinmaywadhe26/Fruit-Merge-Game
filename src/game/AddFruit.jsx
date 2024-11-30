import React from "react";
import { World, Bodies } from "matter-js";
import { BUCKET_HEIGHT, SCALE } from "./constants";

const AddFruit = (world, position, currentFruit, scale) => {
  const radius = currentFruit * 10;
  const fruit = Bodies.circle(
    position.x,
    window.innerHeight - BUCKET_HEIGHT - 50,
    radius,
    {
      restitution: 0.5,
      friction: 1,
      density: 0.5,
      label: "fruit",
      render: {
        sprite: {
          texture: `./fruits/${currentFruit}.png`,
          xScale: scale,
          yScale: scale,
        },
      },
    }
  );
  World.add(world, fruit);
};

export default AddFruit;
