import { Show } from "solid-js";
import { CheckCheck } from "lucide-solid";

function PluginDetail(props) {
  const installedVersions = Object.entries(props.details)
    .filter(([_, v]) => v)
    .map(([v, _]) => v.split(" ").pop());

  const notInstalledVersions = Object.entries(props.details)
    .filter(([_, v]) => !v)
    .map(([v, _]) => v.split(" ").pop());

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="font-semibold text-xl">{props.name}</h2>
        <button className="bg-rosePine-gold/10 border-2 border-rosePine-gold/30 text-rosePine-gold px-4 py-2 rounded-lg hover:bg-rosePine-gold/30 active:bg-rosePine-gold/10 transition-colors cursor-default">
          <div className="flex flex-row items-end space-x-2">
            <CheckCheck class="h-6" />
            <span>Install everywhere</span>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-3">
        <SubDetail title="Present in">
          <VersionList versions={installedVersions} />
        </SubDetail>
        <Show when={notInstalledVersions.length > 0}>
          <SubDetail title="Not present in">
            <VersionList versions={notInstalledVersions} />
          </SubDetail>
        </Show>
      </div>
    </div>
  );
}

function VersionList(props) {
  return props.versions.sort().join();
}

function SubDetail(props) {
  return (
    <div>
      <h4 className="italic font-light text-sm text-rosePine-subtle">
        {props.title}
      </h4>
      {props.children}
    </div>
  );
}

export default PluginDetail;
