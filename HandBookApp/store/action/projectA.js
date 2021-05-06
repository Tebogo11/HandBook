import { Alert } from "react-native";
import ConfigProject from "../../screens/User/ConfigProject";

export const DELETE_PROJECT = "DELETE_PROJECT";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const SET_PROJECTS = "SET_PRODUJES";

export const creatingProjects = (newproject) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    fetch(
      `https://handbookapp-fd587-default-rtdb.firebaseio.com/projects.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newproject),
      }
    );
    dispatch({
      type: CREATE_PROJECT,
      projectData: newproject,
    });
  };
};

export const fetchProjects = () => {
  return async (dispatch, getState) => {
    //any async code you want
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://handbookapp-fd587-default-rtdb.firebaseio.com/projects.json"
      );

      // checks for errors
      if (!response.ok) {
        throw new Error("Something want wrong ");
      }
      //Saving data in google firebase
      const resData = await response.json();
      const loadedProjects = [];

      let demo;
      for (const key in resData) {
        loadedProjects.push({
          ownerID: resData[key].ownerID,
          projectID: resData[key].projectID,
          projectName: resData[key].projectName,
          projectPages: resData[key].projectPages,
          projectType: resData[key].projectType,
          submitted: resData[key].submitted,
        });
      }

      dispatch({
        type: SET_PROJECTS,
        projects: loadedProjects,
        userProjects: loadedProjects.filter((prod) => prod.ownerID === userId),
      });
    } catch (err) {
      // send to custom analystic server
      throw err;
    }
  };
};
