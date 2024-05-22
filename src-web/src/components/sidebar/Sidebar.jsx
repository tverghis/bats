import PluginList from "./PluginList";
import ScriptList from "./ScriptList";

function Sidebar(props) {
  return (
    <div className="w-52 px-3">
      <nav>
        <ul className="flex flex-col space-y-2">
          <li
            className="cursor-pointer"
            onClick={[props.setSubject, { kind: "PluginsTable" }]}
          >
            <PluginList plugins={props.plugins} isActive={true} />
          </li>
          <li className="cursor-pointer">
            <ScriptList isActive={false} />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
