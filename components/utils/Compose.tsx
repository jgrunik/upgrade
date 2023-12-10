import { Component } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

interface ComposeProps {
  components: Array<Component<any>>;
  children: JSX.Element;
}

export default function Compose(props: ComposeProps): JSX.Element {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
