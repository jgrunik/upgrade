import { For, JSX } from "solid-js";

type TabsProps = {
  activeTab?: number;
  tabs: Array<{
    label: JSX.Element;
    content: JSX.Element;
  }>;
};

export default function Tabs(props: TabsProps) {
  const activeTab = props.activeTab ?? 0;
  return (
    <div class="row flex-spaces tabs">
      <For each={props.tabs}>
        {(tab, i) => (
          <>
            <input
              id={`tab${i() + 1}`}
              type="radio"
              name="tabs"
              checked={i() == activeTab}
            />
            <label for={`tab${i() + 1}`}>{tab.label}</label>
          </>
        )}
      </For>
      <For each={props.tabs}>
        {(tab, i) => (
          <div id={`content${i() + 1}`} class="content">
            {tab.content}
          </div>
        )}
      </For>
    </div>
  );
}
