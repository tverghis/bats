import { Show } from "solid-js";

function PluginDetail(props) {
  const installedVersions = Object.entries(props.details)
    .filter(([_, v]) => v)
    .map(([v, _]) => v.split(" ").pop());

  const notInstalledVersions = Object.entries(props.details)
    .filter(([_, v]) => !v)
    .map(([v, _]) => v.split(" ").pop());

  return (
    <div>
      <h2 className="font-semibold text-xl mb-8">{props.name}</h2>
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
