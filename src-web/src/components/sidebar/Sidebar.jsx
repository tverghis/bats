import PluginList from "./PluginList";

function Sidebar(props) {
  return (
    <div className="w-52 px-8">
      <nav>
        <PluginList plugins={props.plugins} />
      </nav>
    </div>
  );
}

export default Sidebar;
