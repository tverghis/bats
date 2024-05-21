const HIGHLIGHT_WHEN_DISPLAY = ["PluginsTable", "PluginDetail"];

function PluginList(props) {
  return (
    <span className="flex flex-row place-content-between ">
      <h3 className={`font-semibold ${fontColor(props.subject.kind)}`}>
        Plugins
      </h3>
      <span
        className={`${fontColor(props.subject.kind, "text-rosePine-muted")}`}
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

function fontColor(kind, baseColor) {
  const isActive = HIGHLIGHT_WHEN_DISPLAY.includes(kind);

  return isActive ? "text-rosePine-foam" : baseColor || "";
}

export default PluginList;
