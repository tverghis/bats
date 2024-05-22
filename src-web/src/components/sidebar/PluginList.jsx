import { ToyBrickIcon } from "lucide-solid";
import { createEffect, createSignal, mergeProps } from "solid-js";
import SidebarItem from "./SidebarItem";

function PluginList(props) {
  const [numPlugins, setNumPlugins] = createSignal(0);
  createEffect(() => setNumPlugins(props.plugins.length).toString());

  return SidebarItem(
    mergeProps(
      {
        icon: ToyBrickIcon,
        title: "Plugins",
        additionalInfo: numPlugins,
      },
      props,
    ),
  );
}

export default PluginList;
