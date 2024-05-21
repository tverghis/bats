import PluginList from "./PluginList";

function Sidebar(props) {
  return (
    <div className="w-52 px-6">
      <nav>
        <ul className="flex flex-col space-y-6">
          <li
            className="cursor-pointer"
            onClick={[props.setSubject, { kind: "PluginsTable" }]}
          >
            <PluginList plugins={props.plugins} subject={props.subject} />
          </li>
          <li className="cursor-pointer">
            <span>Scripts</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
