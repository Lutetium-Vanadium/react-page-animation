import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import useReload from "./useReload";

export interface PageAnimationProps {
  children: any;
  grid: RegExp[][];
  timeout: number;
  classExtension: string;
  className?: string;
  animate?: boolean;
  bias?: "vertical" | "horizontal";
}

interface Page {
  Component: React.FC<{ className: string }>;
  className: string;
  pathname: string;
}

/**
 * PageAnimation is a very basic animation wrapper that has a very specific use case.
 *
 * It allows you to have different routes within react-router places as if in a grid and provide customized transitions based
 * on the direction.
 *
 * @param {RegExp[][]} grid Which is a RegExp 2D array which is used to match against the route to determine the direction
 *
 * @param {number} timeout The time after previous component is unmounted.
 *
 * @param {string} classExtension Gives the base name for each class.
 *
 * @param {any} children What to render in each page
 *
 * @param {string} className A className to apply to the PageTransition root div
 *
 * @param {boolean} animate Whether to animate or not [Can be used as an easy toggle if there is a setting to disable animations]
 *
 * @param {"vertical"|"horizontal"} bias As currently diagnol directions arent supported, bias controls whether to check for
 *    up/down first or left/right. eg: If the page is to the top-left, if bias is "vertical", the direction `top` will be given.
 *    If the bias was "horizontal", left would be given
 *
 * There are three 'classStates' - `enter`, `done`, `leave`.
 *   `enter`- When the component, as well as the previous component, are mounted.
 *   `done`- When the previous component is unmounted.
 *   `leave`- When this component is going to be unmounted.
 *
 * There are four directions - `top`, `bottom`, `left` and `right`, as well as `same-forward` and `same-backward`
 * These all refer to the direction the next component is in where same means same position in the grid, and
 * forward means further down the url tree
 *
 * The classes are of the form `classExtension-direction-classState`
 * eg. pages-left-done
 *  `pages` The name supplied to the Transition component
 *  `left` The current component was to the left of the previous component
 *  `done` The previous component has been unmounted and backward means behind in the url tree
 */
function PageAnimation({
  children,
  grid,
  timeout,
  classExtension,
  animate = true,
  className = null,
  bias = "vertical",
}: PageAnimationProps) {
  const history = useHistory();
  // As far as I understand, useState essentially creates a new object for each render which has the value copied over.
  // However for this to work, it requires the same object so as to not completely remount the component
  // Thats why a ref is used and re-rendering components is handled manually with the custom useReload hook
  const pages = useRef<Page[]>([
    {
      Component: ({ className }) => (
        <div
          className={`${className} ${classExtension}`}
          style={{
            position: "absolute",
          }}
        >
          {React.Children.map(children, (element) => React.cloneElement(element, { location: history.location }))}
        </div>
      ),
      className: "",
      pathname: history.location.pathname,
    },
  ]);
  const reload = useReload();

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.pathname === pages.current[pages.current.length - 1].pathname || !animate) return pages.current;

      const dir = getDir(location.pathname, pages.current[pages.current.length - 1].pathname, grid, bias);

      const NewPage: React.FC<{ className: string }> = ({ className }) => (
        <div
          className={`${className} ${classExtension}`}
          style={{
            position: "absolute",
          }}
        >
          {React.Children.map(children, (element) => React.cloneElement(element, { location }))}
        </div>
      );

      setTimeout(() => {
        pages.current[1].className = `${classExtension}-done`;

        pages.current.shift();
        console.log(pages.current);
        reload();
      }, timeout);

      const className = `${classExtension}-${dir}`;

      pages.current[pages.current.length - 1].className = className + "-leave";

      pages.current.push({
        Component: NewPage,
        pathname: location.pathname,
        className: className + "-enter",
      });
      reload();
    });

    return unlisten;
  }, [animate]);

  if (!animate) {
    return children;
  }

  return (
    <div className={className}>
      {pages.current.map(({ Component, className }, index) => (
        <Component className={className} key={index} />
      ))}
    </div>
  );
}

export default PageAnimation;

const getDir = (pathname: string, prevpath: string, grid: RegExp[][], bias: "vertical" | "horizontal") => {
  let pathnameIndex: number[];
  let prevpathIndex: number[];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].test(pathname)) {
        pathnameIndex = [j, i];
      }
      if (grid[i][j].test(prevpath)) {
        prevpathIndex = [j, i];
      }
    }
  }

  if (!pathnameIndex || !prevpathIndex || pathnameIndex === prevpathIndex) {
    return "nothing";
  }

  if (bias === "vertical") {
    if (pathnameIndex[1] < prevpathIndex[1]) return "top";
    if (pathnameIndex[1] > prevpathIndex[1]) return "bottom";
    if (pathnameIndex[0] < prevpathIndex[0]) return "left";
    if (pathnameIndex[0] > prevpathIndex[0]) return "right";
  } else if (bias === "horizontal") {
    if (pathnameIndex[0] < prevpathIndex[0]) return "left";
    if (pathnameIndex[0] > prevpathIndex[0]) return "right";
    if (pathnameIndex[1] < prevpathIndex[1]) return "top";
    if (pathnameIndex[1] > prevpathIndex[1]) return "bottom";
  }

  if (pathname.split("/").length > prevpath.split("/").length) return "same-forward";
  if (pathname.split("/").length < prevpath.split("/").length) return "same-backward";

  return "same";
};
