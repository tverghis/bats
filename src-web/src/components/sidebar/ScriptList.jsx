import { FileCode2 } from "lucide-solid";
import { mergeProps } from "solid-js";
import SidebarItem from "./SidebarItem";

function ScriptList(props) {
  return SidebarItem(
    mergeProps(
      {
        icon: FileCode2,
        title: "Scripts",
      },
      props,
    ),
  );
}

export default ScriptList;
