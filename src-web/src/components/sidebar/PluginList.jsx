function PluginList(props) {
  return (
    <span className="flex flex-row place-content-between group">
      <h3
        className={`font-semibold group-hover:text-rosePine-foam ${fontColor(props.subject.kind, ["PluginsTable", "PluginDetail"])}`}
      >
        Plugins
      </h3>
      <span
        className={`text-rosePine-muted group-hover:text-rosePine-foam ${fontColor(props.subject.kind, ["PluginsTable", "PluginDetail"])}`}
      >
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

function fontColor(kind, toMatch) {
  const isActive = toMatch.includes(kind);

  return isActive ? "text-rosePine-foam" : "";
}

export default PluginList;
