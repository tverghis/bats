function PluginList(props) {
  return (
    <span className="flex flex-row place-content-between">
      <h3 className="font-semibold">Plugins</h3>
      <span className="text-rosePine-muted">
        {getPluginCount(props.plugins)}
      </span>
    </span>
  );
}

function getPluginCount(plugins) {
  const length = plugins.length;

  if (length > 99) {
    return "99+";
  }

  return length.toString();
}

export default PluginList;
