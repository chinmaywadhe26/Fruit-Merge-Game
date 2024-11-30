import React from "react";
import { World, Bodies } from "matter-js";
import { BUCKET_WIDTH, BUCKET_HEIGHT, SCALE } from "./constants";

const ChangeRadius = (world, oldFruit, newRadius) => {
  const { position } = oldFruit;
  World.remove(world, oldFruit);

  const fruit = Bodies.circle(position.x, position.y, newRadius * 10, {
    isStatic: true,
    render: {
      sprite: {
        texture: `./fruits/${newRadius}.png`,
        xScale: 0.5,
        yScale: 0.5,
      },
    },
  });
  World.add(world, fruit);
  return fruit;
};

export default ChangeRadius;
