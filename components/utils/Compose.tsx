import { JSX } from "solid-js/jsx-runtime";
import { Component } from "solid-js";

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
