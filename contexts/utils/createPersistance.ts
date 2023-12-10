import { Accessor, createComputed, on } from "solid-js";

/** updates localStorage with supplied values each time they change */
export default function createPersistance<T extends string>(
  ...pairs: [string, Accessor<T | undefined>][]
) {
  pairs?.forEach(([key, value]) => _createPersistance(key, value));
}

function _createPersistance<T extends string>(
  key: string,
  value: Accessor<T | undefined>
) {
  createComputed(
    on(value, () => localStorage.setItem(key, value()!), { defer: true })
  );
}
