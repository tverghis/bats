import { Show } from "solid-js";

function Sidebar(props) {
  return (
    <div className="w-52 px-8">
      <nav>
        <span className="flex flex-row place-content-between">
          <h3 className="font-semibold">Plugins</h3>
          <span className="text-rosePine-muted">
            {getPluginCount(props.plugins)}
          </span>
        </span>
        <Show when={props.plugins.length > 0} fallback={<PluginListFallback />}>
          <PluginList
            plugins={props.plugins}
            selectPlugin={props.selectPlugin}
            selectedPluginName={props.selectedPluginName}
          />
        </Show>
      </nav>
    </div>
  );
}

function PluginList(props) {
  return (
    <ul role="list" className="flex flex-col">
      <For each={props.plugins}>
        {(plugin) => {
          return (
            <li
              onClick={[props.selectPlugin, plugin]}
              className={`cursor-pointer ${plugin !== props.selectedPluginName ? "text-rosePine-subtle" : ""}`}
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

function getPluginCount(plugins) {
  const length = plugins.length;

  if (length > 99) {
    return "99+";
  }

  return length.toString();
}

export default Sidebar;
