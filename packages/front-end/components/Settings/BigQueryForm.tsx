import { FC } from "react";
import { BigQueryConnectionParams } from "back-end/types/integrations/bigquery";

const BigQueryForm: FC<{
  params: Partial<BigQueryConnectionParams>;
  setParams: (params: { [key: string]: string }) => void;
}> = ({ params, setParams }) => {
  return (
    <div className="row">
      <div className="form-group col-md-12">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="bigQueryFileInput"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log(file);
              if (!file) {
                return;
              }

              const reader = new FileReader();
              reader.onload = function (e) {
                try {
                  const str = e.target.result;
                  console.log(str);
                  if (typeof str !== "string") {
                    return;
                  }
                  const json: {
                    project_id: string;
                    private_key: string;
                    client_email: string;
                  } = JSON.parse(str);

                  if (
                    json.project_id &&
                    json.private_key &&
                    json.client_email
                  ) {
                    setParams({
                      privateKey: json.private_key,
                      projectId: json.project_id,
                      clientEmail: json.client_email,
                    });
                  }
                } catch (e) {
                  console.error(e);
                  return;
                }
              };
              reader.readAsText(file);
            }}
          />
          <label className="custom-file-label" htmlFor="bigQueryFileInput">
            JSON Key File...
          </label>
        </div>
      </div>
      <div className="form-group col-md-12">
        {params && params.projectId ? (
          <ul>
            <li>
              <strong>Project Id:</strong> {params.projectId}
            </li>
            <li>
              <strong>Client Email:</strong> {params.clientEmail}
            </li>
            <li>
              <strong>Private Key:</strong> *****
            </li>
          </ul>
        ) : (
          <div className="alert alert-info">
            Your connection info will appear here when you select a valid JSON
            key file.
          </div>
        )}
      </div>
    </div>
  );
};

export default BigQueryForm;
