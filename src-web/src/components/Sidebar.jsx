import { Show } from "solid-js";

function Sidebar(props) {
  return (
    <div className="w-40 px-8">
      <nav>
        <Show when={props.plugins.length > 0} fallback={<PluginListFallback />}>
          <PluginList
            plugins={props.plugins}
            selectPlugin={props.selectPlugin}
          />
        </Show>
      </nav>
    </div>
  );
}

function PluginList(props) {
  return (
    <ul role="list" className="flex flex-col space-y-1">
      <For each={props.plugins}>
        {(plugin) => {
          return (
            <li
              onClick={[props.selectPlugin, plugin]}
              className="cursor-pointer"
            >
              {plugin}
            </li>
          );
        }}
      </For>
    </ul>
  );
}

function PluginListFallback() {
  return <p>No installed plugins</p>;
}

export default Sidebar;
