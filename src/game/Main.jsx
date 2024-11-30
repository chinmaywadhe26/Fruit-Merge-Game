import React, { useEffect, useRef } from "react";
import {
  World,
  Render,
  Mouse,
  MouseConstraint,
  Events,
  Engine,
  Runner,
  Bodies,
} from "matter-js";
import {
  BUCKET_HEIGHT,
  BUCKET_THICKNESS,
  BUCKET_WIDTH,
  SCALE,
} from "./constants";
import Bucket from "./Bucket";
import ChangeRadius from "./ChangeRadius";
import AddFruit from "./AddFruit";
import "./style.css";

function Main() {
  const sceneRef = useRef(null);
  const nextFruitRef = useRef(null);
  let currentFruit = Math.floor(Math.random() * 4) + 1;
  useEffect(() => {
    const engine = Engine.create();
    const world = engine.world;
    const runner = Runner.create();
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "#ffe1ae",
      },
    });
    Render.run(render);
    Runner.run(runner, engine);
    const x = window.innerWidth / 2;
    const y = window.innerHeight;

    const { leftW, rightW, base } = Bucket(
      world,
      x,
      y,
      BUCKET_WIDTH,
      BUCKET_HEIGHT,
      BUCKET_THICKNESS
    );
    nextFruitRef.current = Bodies.circle(
      window.innerWidth / 2 + BUCKET_WIDTH / 2 - 100,
      100,
      currentFruit * 10,
      {
        isStatic: true,
        render: {
          sprite: {
            texture: `./fruits/${currentFruit}.png`,
            xScale: 0.5,
            yScale: 0.5,
          },
        },
      }
    );
    World.add(world, nextFruitRef.current);
    const mouse = Mouse.create();
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);
    Events.on(mouseConstraint, "mousedown", (e) => {
      // console.log(e);
      const position = e.mouse.position;
      const isInside =
        position.x > leftW.position.x + BUCKET_THICKNESS / 2 &&
        position.x < rightW.position.x - BUCKET_THICKNESS / 2 &&
        position.y < base.position.y &&
        position.y > base.position.y - BUCKET_HEIGHT;
      if (isInside) {
        AddFruit(world, position, currentFruit, SCALE[currentFruit - 1]);
        currentFruit = Math.floor(Math.random() * 4) + 1;
        nextFruitRef.current = ChangeRadius(world, nextFruitRef.current, currentFruit);
      }
    });
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);
  return (
    <div className="game-container">
      <div className="header">
        <h2>Merge Fruit Game</h2>
        <div ref={nextFruitRef}></div>
      </div>
      <div ref={sceneRef}></div>
    </div>
  );
}

export default Main;
