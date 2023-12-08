import { Accessor, createEffect, on } from "solid-js";

export default createPersistance;

/** updates localStorage with supplied values each time they change */
function createPersistance<T extends string>(
  ...pairs: [string, Accessor<T | undefined>][]
) {
  pairs?.forEach(([key, value]) => _createPersistance(key, value));
}

function _createPersistance<T extends string>(
  key: string,
  value: Accessor<T | undefined>
) {
  createEffect(
    on(value, () => localStorage.setItem(key, value()!), { defer: true })
  );
}
