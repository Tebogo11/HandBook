import Project from "../../modal/Project";
import { CREATE_PROJECT, SET_PROJECTS } from "../action/projectA";
const initialState = {
  availableProjects: [],
  userProjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      //Creating new Project
      const newProject = action.projectData;
      const arrayProject = [];
      arrayProject.push(newProject);
      console.log("-------[Project Action]-------------");
      console.log(newProject);
      return {
        ...state,
        availableProjects: state.availableProjects.concat(arrayProject),
        userProjects: state.userProjects.concat(arrayProject),
      };
    case SET_PROJECTS:
      return {
        availableProjects: action.projects,
        userProjects: action.userProjects,
      };
  }
  return state;
};
