import Project from "../../modal/Project";
import { CREATE_PROJECT } from "../action/projectA";
const initialState = {
  availableProjects: [],
  userProjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      const data = action.projectData;
      //Creating new Project
      const newProject = new Project(
        data.projectID,
        data.ownerID,
        data.projectName,
        data.projectType,
        data.submitted,
        []
      );
      return {
        ...state,
        availableProjects: state.availableProjects.concat(newProject),
        userProjects: state.userProducts.concat(newProduct),
      };
  }
  return state;
};
