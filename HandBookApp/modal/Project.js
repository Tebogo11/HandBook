class Project {
  constructor(
    projectId,
    ownerId,
    projectName,
    projectType,
    submitted,
    projectPages
  ) {
    this.projectId = projectId;
    this.ownerId = ownerId;
    this.projectName = projectName;
    this.projectType = projectType;
    this.submitted = submitted;
    this.projectPages = projectPages;
  }
}

export default Project;
