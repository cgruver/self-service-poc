function NamespacesTable({ namespaces, selectedNamespaces, onToggleNamespace }) {
  const [filters, setFilters] = React.useState({
    name: "",
    description: "",
    managedByArgo: "",
    attributes: "",
  });

  function formatValue(val) {
    if (val === null || val === undefined) return "";
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "object") {
      try {
        return JSON.stringify(val);
      } catch {
        return String(val);
      }
    }
    return String(val);
  }

  const keys = Object.keys(namespaces || {});
  const filteredKeys = keys.filter((k) => {
    const ns = namespaces[k];
    const name = formatValue(ns?.name || k);
    const managedByArgo = Boolean(ns?.need_argo || ns?.generate_argo_app);
    const desc = formatValue(ns?.description);

    const clustersText = formatValue(ns?.clusters);
    const resourcesText = formatValue(ns?.resources);
    const rbacText = formatValue(ns?.rbac);
    const statusText = formatValue(ns?.status);
    const policyText = formatValue(ns?.policy);
    const egressText = formatValue({
      egress_nameid: ns?.egress_nameid,
      allow_all_egress: ns?.allow_all_egress,
      enable_pod_based_egress_ip: ns?.enable_pod_based_egress_ip,
    });

    const attributesSearch = `${clustersText} ${statusText} ${resourcesText} ${rbacText} ${policyText} ${egressText}`;

    return (
      name.toLowerCase().includes((filters.name || "").toLowerCase()) &&
      desc.toLowerCase().includes((filters.description || "").toLowerCase()) &&
      String(managedByArgo ? "true" : "false")
        .toLowerCase()
        .includes((filters.managedByArgo || "").toLowerCase()) &&
      attributesSearch.toLowerCase().includes((filters.attributes || "").toLowerCase())
    );
  });

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Description</th>
            <th>Managed by Argo(True/False)</th>
            <th>Attributes</th>
          </tr>
          <tr>
            <th></th>
            <th>
              <input
                className="filterInput"
                value={filters.name}
                onChange={(e) => setFilters((p) => ({ ...p, name: e.target.value }))}
              />
            </th>
            <th>
              <input
                className="filterInput"
                value={filters.description}
                onChange={(e) => setFilters((p) => ({ ...p, description: e.target.value }))}
              />
            </th>
            <th>
              <input
                className="filterInput"
                value={filters.managedByArgo}
                onChange={(e) => setFilters((p) => ({ ...p, managedByArgo: e.target.value }))}
              />
            </th>
            <th>
              <input
                className="filterInput"
                value={filters.attributes}
                onChange={(e) => setFilters((p) => ({ ...p, attributes: e.target.value }))}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {keys.length === 0 ? (
            <tr>
              <td colSpan={5} className="muted">No namespaces found.</td>
            </tr>
          ) : filteredKeys.length === 0 ? (
            <tr>
              <td colSpan={5} className="muted">No matches.</td>
            </tr>
          ) : (
            filteredKeys.map((k) => {
              const ns = namespaces[k];
              const name = ns?.name || k;
              const desc = ns?.description || "";
              const managedByArgo = Boolean(ns?.need_argo || ns?.generate_argo_app);
              const clustersText = formatValue(ns?.clusters);
              const resourcesText = formatValue(ns?.resources);
              const rbacText = formatValue(ns?.rbac);
              const statusText = formatValue(ns?.status);
              const policyText = formatValue(ns?.policy);
              const egressText = formatValue({
                egress_nameid: ns?.egress_nameid,
                allow_all_egress: ns?.allow_all_egress,
                enable_pod_based_egress_ip: ns?.enable_pod_based_egress_ip,
              });

              return (
                <tr key={name}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNamespaces.has(name)}
                      onChange={(e) => onToggleNamespace(name, e.target.checked)}
                      aria-label={`Select ${name}`}
                    />
                  </td>
                  <td>{name}</td>
                  <td className="muted">{desc}</td>
                  <td>{managedByArgo ? "True" : "False"}</td>
                  <td>
                    <div className="attrGrid">
                      <div className="attrRow">
                        <div className="attrCell">
                          <div className="attrTitle">Identity</div>
                          <div className="attrValue">{clustersText}</div>
                        </div>
                        <div className="attrCell">
                          <div className="attrTitle">Status</div>
                          <div className="attrValue">{statusText}</div>
                        </div>
                        <div className="attrCell">
                          <div className="attrTitle">Resources</div>
                          <div className="attrValue">{resourcesText}</div>
                        </div>
                      </div>
                      <div className="attrRow">
                        <div className="attrCell">
                          <div className="attrTitle">RBAC</div>
                          <div className="attrValue">{rbacText}</div>
                        </div>
                        <div className="attrCell">
                          <div className="attrTitle">Policy</div>
                          <div className="attrValue">{policyText}</div>
                        </div>
                        <div className="attrCell">
                          <div className="attrTitle">Egress</div>
                          <div className="attrValue">{egressText}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
