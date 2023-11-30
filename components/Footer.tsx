export { Footer };

import { Component } from "solid-js";
import "./Footer.module.css";

const Footer: Component = () => {
  return (
    <footer>
      <p
        // @ts-expect-error
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:dct="http://purl.org/dc/terms/"
      >
        <a
          rel="cc:attributionURL"
          property="dct:title"
          href="https://github.com/jgrunik/upgrade"
        >
          Upgrade
        </a>
        &nbsp;by&nbsp;
        <a
          rel="cc:attributionURL dct:creator"
          property="cc:attributionName"
          href="https://github.com/jgrunik"
        >
          Joshua Grunik
        </a>
        &nbsp;is licensed under&nbsp;
        <a
          rel="license noopener noreferrer"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>
        <br />
        <span style="display: inline-flex; height: 2ch">
          <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" />
          <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" />
          <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" />
          <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" />
        </span>
      </p>
    </footer>
  );
};
