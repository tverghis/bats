import { Match, Switch } from "solid-js";
import PluginsTable from "./PluginsTable";
import PluginDetail from "./PluginDetail";

function MainDisplay(props) {
  const showPluginsTable = () => {
    props.setSubject({ kind: "PluginsTable" });
  };
  const showPluginDetail = (pluginName, plugin) => {
    props.setSubject({ kind: "PluginDetail", pluginName, plugin });
  };

  return (
    <Switch fallback={<MainDisplayFallback />}>
      <Match when={props.subject.kind === "PluginsTable"}>
        <PluginsTable
          plugins={props.plugins}
          showPluginDetail={showPluginDetail}
        />
      </Match>
      <Match when={props.subject.kind === "PluginDetail"}>
        <PluginDetail
          name={props.subject.pluginName}
          details={props.plugins[props.subject.pluginName]}
          showPluginsTable={showPluginsTable}
        />
      </Match>
    </Switch>
  );
}

function MainDisplayFallback() {
  return <span>Select an item from the sidebar</span>;
}

export default MainDisplay;
