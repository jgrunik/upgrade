import "./Footer.module.css";

export default () => (
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
      &nbsp;is licenced under
      <a
        style="display: inline-flex; margin-left: 0.5ch;"
        rel="license noopener noreferrer"
        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        innerText="CC BY-NC-SA 4.0"
      />
      <span style="display: inline-flex; height: 1.75ch; margin-left: 0.5ch;">
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" />
      </span>
    </p>
  </footer>
);
