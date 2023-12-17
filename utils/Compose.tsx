import { Component, ParentProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

type ComposeProps = ParentProps & { components: Component<any>[] };

export default function Compose(props: ComposeProps): JSX.Element {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight(
        (ComponentStack, Component) => (
          <Component>{ComponentStack}</Component>
        ),
        children
      )}
    </>
  );
}
