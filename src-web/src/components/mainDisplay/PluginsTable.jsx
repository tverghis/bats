import { For } from "solid-js";

function PluginsTable(props) {
  return (
    <table className="w-full divide-y divide-rosePine-highlightMed">
      <thead>
        <tr>
          <th scope="col" className="text-left pb-4 pl-4 font-semibold">
            Name
          </th>
          <th scope="col" className="text-right pb-4 pr-4 font-semibold">
            Present In
          </th>
        </tr>
      </thead>
      <tbody className="divide-y-0 divide-rosePine-highlightMed">
        <For each={Object.keys(props.plugins).sort()}>
          {(plugin) => (
            <tr className="cursor-pointer even:bg-rosePine-surface hover:bg-rosePine-surface">
              <td className="text-left py-2 pl-4">{plugin}</td>
              <td className="text-right py-2 pr-4 text-rosePine-subtle">
                {getInstalledList(props.plugins, plugin)}
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}

function getInstalledList(plugins, pluginName) {
  const plugin = plugins[pluginName];

  const installedVersions = Object.entries(plugin)
    .filter(([_, v]) => v)
    .map(([v, _]) => v.split(" ").pop())
    .sort();

  return installedVersions.join(", ");
}

export default PluginsTable;
