import { Match, Switch } from "solid-js";
import PluginsTable from "./PluginsTable";

function MainDisplay(props) {
  return (
    <Switch fallback={<MainDisplayFallback />}>
      <Match when={props.subject.kind === "PluginsTable"}>
        <PluginsTable plugins={props.plugins} />
      </Match>
    </Switch>
  );
}

function MainDisplayFallback() {
  return <span>Select an item from the sidebar</span>;
}

export default MainDisplay;
