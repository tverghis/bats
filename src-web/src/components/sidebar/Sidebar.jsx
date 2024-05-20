import PluginList from "./PluginList";

function Sidebar(props) {
  return (
    <div className="w-52 px-6">
      <nav>
        <div className="cursor-pointer">
          <PluginList plugins={props.plugins} />
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
