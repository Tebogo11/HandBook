import ConfigProject from "../../screens/User/ConfigProject";

export const DELETE_PROJECT = "DELETE_PROJECT";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const SET_PROJECTS = "SET_PRODUJES";

export const creatingProjects = (newproject) => {
  return {
    type: CREATE_PROJECT,
    projectData: newproject,
  };
};
