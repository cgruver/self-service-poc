function NamespaceDetails({ namespace, namespaceName, appname, env, onUpdateNamespaceInfo }) {
  return (
    <NamespaceDetailsView
      namespace={namespace}
      namespaceName={namespaceName}
      appname={appname}
      env={env}
      onUpdateNamespaceInfo={onUpdateNamespaceInfo}
    />
  );
}

