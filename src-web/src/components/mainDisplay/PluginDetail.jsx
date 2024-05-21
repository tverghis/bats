function PluginDetail(props) {
  console.log(props.details);
  return (
    <div>
      <span>{props.name}</span>
      <span onClick={[props.showPluginsTable]}>See all</span>
    </div>
  );
}

export default PluginDetail;
