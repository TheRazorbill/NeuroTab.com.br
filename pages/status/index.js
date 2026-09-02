import useSWR from "swr";

async function fetchAPI(key) {
  const result = await fetch(key);
  const responseBody = await result.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText =
    !isLoading && data
      ? new Date(data.updated_At).toLocaleString("pt-br")
      : "Carregando...";

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation =
    !isLoading && data ? (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões Abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Conexões Máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    ) : (
      "Carregando..."
    );
  return (
    <>
      <h2>Database</h2>
      {databaseStatusInformation}
    </>
  );
}
