export enum Routes {
  admin = "/admin",
  createHat = "/admin/create-hat",
  mintHat = "/admin/mint-hat",
  spaces = "/spaces",
  space = "spaces/:spaceId",
  proposalsList = "proposals-list",
  roles = "roles",
  role = "spaces/:spaceId/roles/role/:roleId",
  delegations = "delegations",
  proposal = "spaces/:spaceId/proposals-list/proposal/:proposalId",
  createProposal = "spaces/:spaceId/create-proposal",
  discourse = "/discourse",
  discoursePost = "/discourse/:topicId",
  createTopic = "/discourse/create-topic",
  coreTest = "/core-test"
}
