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
        <div className="px-6">
          <PluginDetail
            name={props.subject.pluginName}
            details={props.plugins[props.subject.pluginName]}
            showPluginsTable={showPluginsTable}
          />
        </div>
      </Match>
    </Switch>
  );
}

function MainDisplayFallback() {
  return <span className="px-6">Select an item from the sidebar</span>;
}

export default MainDisplay;
