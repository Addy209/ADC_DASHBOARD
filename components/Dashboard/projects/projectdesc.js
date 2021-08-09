import React from "react";
import styles from "./projects.module.css";
import { Button, Divider } from "antd";
import CompletedProjects from "./completedprojects";
import OngoingProjects from "./ongoingprojects";
import ProjectDetails from "./projectdetails";
import UploadedDocuments from "./uploadeddocument";
import CreateProject from "./createproject";
import { gql, GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "../../../utils/constants";
import Cookies from "js-cookie";
import DocumentUpload from "./upload";

const projectQuery = gql`
  query ($id: ID!) {
    project(id: $id) {
      id
      module {
        code
        module
      }
      name
      description
      priority {
        code
        priority
      }
      devCompleteDate
      devCompleted
      testStartDate
      testCompleteDate
      testCompleted
      requestedby
      signoff
      livedate
      live
      projectDocument {
        name
        document
        uploadedAt
      }
    }
  }
`;

const SpecficProject = (props) => {
  const [edit, setEdit] = React.useState(false);
  const [values, setValues] = React.useState(null);
  const [doc, setDoc] = React.useState([]);

  React.useEffect(() => {
    if (props.id) {
      props.client.request(projectQuery, { id: props.id }).then((resp) => {
        setValues(resp.project);
        setDoc(resp.project.projectDocument);
      });
    }
  }, [props.id]);
  const refetch = (resp) => {
    setValues(resp.project);
    setDoc(resp.project.projectDocument);
    setEdit(false);
  };

  const setUpdatedDocs = (values) => {
    setDoc(values);
  };

  return (
    <div className={styles.project}>
      {values && values.live ? null : (
        <div>
          <Button onClick={() => setEdit(!edit)} type="primary">
            {edit ? "Close" : "Edit"}
          </Button>
        </div>
      )}
      {edit ? (
        <div>
          <Divider orientation="left">Edit Project</Divider>
          <CreateProject
            data={props}
            values={values}
            refetch={refetch}
            mode="update"
            {...props}
          />
        </div>
      ) : values ? (
        <div>
          <Divider orientation="left">Project Details</Divider>
          <ProjectDetails values={values} />
        </div>
      ) : null}

      {values && values.live ? null : (
        <>
          <Divider orientation="left">Upload Project Documents</Divider>
          <div className={styles.uploadform}>
            <DocumentUpload refetch={setDoc} id={props.id} {...props} />
          </div>
        </>
      )}

      <div>
        <Divider orientation="left">
          Uploaded Documents For This Project
        </Divider>
        <UploadedDocuments data={doc} />
      </div>
    </div>
  );
};

export default SpecficProject;
