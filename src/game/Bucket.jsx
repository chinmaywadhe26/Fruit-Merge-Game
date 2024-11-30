import React from "react";
import { World, Bodies } from "matter-js";
const Bucket = (world, x, y, width, height, thickness) => {
  const leftW = Bodies.rectangle(
    x - width / 2 + thickness / 2,
    y - height / 2,
    thickness,
    height,
    {
      isStatic: true,
      render: {
        fillStyle: "#28A5BA",
      },
    }
  );

  const rightW = Bodies.rectangle(
    x + width / 2 - thickness / 2,
    y - height / 2,
    thickness,
    height,
    {
      isStatic: true,
      render: {
        fillStyle: "#28A5BA",
      },
    }
  );

  const base = Bodies.rectangle(
    x ,
    y - thickness / 2,
    width,
    thickness,
    {
      isStatic: true,
      render: {
        fillStyle: "#28A5BA",
      },
    }
  )
  World.add(world, leftW);
  World.add(world, rightW);
  World.add(world, base);
  return {leftW, rightW, base};

};

export default Bucket;
