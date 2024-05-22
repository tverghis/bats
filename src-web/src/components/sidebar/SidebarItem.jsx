function SidebarItem(props) {
  const IconEl = props.icon;

  return (
    <span
      className={`flex flex-row place-content-between py-1 px-3 rounded-lg transition-colors hover:bg-rosePine-rose/10 hover:text-rosePine-rose ${props.isActive ? "bg-rosePine-rose/10 text-rosePine-rose" : ""}`}
    >
      <span className="flex flex-row space-x-2 items-end">
        <span>
          <IconEl />
        </span>
        <h3 className="font-semibold">{props.title}</h3>
      </span>
      <Show when={props.additionalInfo !== undefined}>
        <span>{props.additionalInfo}</span>
      </Show>
    </span>
  );
}

export default SidebarItem;
